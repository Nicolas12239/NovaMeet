import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            birthYear: true,
            premiumUntil: true,
            photos: {
              where: { status: "APPROVED" },
              select: { url: true, status: true }
            }
          }
        }
      }
    })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Check if the profile belongs to the current user or if it's visible
    if (profile.userId !== session.user.id) {
      // Additional visibility checks could be added here based on privacy settings
      // For now, all profiles are visible to authenticated users
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
