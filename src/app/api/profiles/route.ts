import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Prisma } from "@prisma/client"

const createProfileSchema = z.object({
  nickname: z.string().min(3).max(50),
  bio: z.string().max(500).optional(),
  gender: z.string().optional(),
  interests: z.array(z.string()).optional(),
  city: z.string().optional(),
  visibility: z.object({
    photos: z.boolean().optional(),
    onlineStatus: z.boolean().optional(),
    lastSeen: z.boolean().optional(),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createProfileSchema.parse(body)

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    })

    if (existingProfile) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 400 })
    }

    // Check if nickname is unique
    const existingNickname = await prisma.profile.findUnique({
      where: { nickname: validatedData.nickname }
    })

    if (existingNickname) {
      return NextResponse.json({ error: "Nickname already taken" }, { status: 400 })
    }

    const profile = await prisma.profile.create({
      data: {
        userId: session.user.id,
        nickname: validatedData.nickname,
        bio: validatedData.bio,
        gender: validatedData.gender,
        city: validatedData.city,
        interests: validatedData.interests ? JSON.parse(JSON.stringify(validatedData.interests)) : null,
        visibility: validatedData.visibility ? JSON.parse(JSON.stringify(validatedData.visibility)) : null,
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Profile creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const gender = searchParams.get("gender")
    const city = searchParams.get("city")
    const minAge = searchParams.get("minAge")
    const maxAge = searchParams.get("maxAge")

    const skip = (page - 1) * limit

    const userWhere: Prisma.UserWhereInput = {
      status: "ACTIVE",
      kycStatus: "VERIFIED", // Only show verified users
    }

    if (minAge || maxAge) {
      const birthYearFilter: { lte?: number, gte?: number } = {}
      if (minAge) {
        birthYearFilter.lte = new Date().getFullYear() - parseInt(minAge)
      }
      if (maxAge) {
        birthYearFilter.gte = new Date().getFullYear() - parseInt(maxAge)
      }
      userWhere.birthYear = birthYearFilter
    }

    const where: Prisma.ProfileWhereInput = {
      user: userWhere,
    }

    if (gender) where.gender = gender
    if (city) where.city = city

    const profiles = await prisma.profile.findMany({
      where,
      include: {
        user: {
          select: {
            birthYear: true,
            premiumUntil: true,
            photos: {
              where: { status: "APPROVED" },
              take: 1,
              select: { url: true }
            }
          }
        }
      },
      skip,
      take: limit,
      orderBy: { user: { createdAt: "desc" } }
    })

    const total = await prisma.profile.count({ where })

    return NextResponse.json({
      profiles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
