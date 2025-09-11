import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const reportSchema = z.object({
  targetType: z.enum(["USER", "PHOTO", "MESSAGE"]),
  targetId: z.string(),
  reason: z.string().min(10).max(500),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = reportSchema.parse(body)

    // Check if user is reporting themselves
    if (validatedData.targetType === "USER" && validatedData.targetId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot report yourself" },
        { status: 400 }
      )
    }

    // Check if report already exists
    const existingReport = await prisma.report.findFirst({
      where: {
        reporterId: session.user.id,
        targetType: validatedData.targetType,
        targetId: validatedData.targetId,
        status: { in: ["OPEN", "IN_REVIEW"] }
      }
    })

    if (existingReport) {
      return NextResponse.json(
        { error: "You have already reported this content" },
        { status: 400 }
      )
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        reporterId: session.user.id,
        targetType: validatedData.targetType,
        targetId: validatedData.targetId,
        reason: validatedData.reason,
      },
    })

    // Log the moderation action
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        eventType: "REPORT_CREATED",
        metadata: {
          reportId: report.id,
          targetType: validatedData.targetType,
          targetId: validatedData.targetId,
          reason: validatedData.reason
        }
      }
    })

    return NextResponse.json({
      report,
      message: "Report submitted successfully"
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Report creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only moderators and admins can view reports
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || !["MOD", "ADMIN"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "OPEN"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    const reports = await prisma.report.findMany({
      where: { status: status as any },
      include: {
        reporter: {
          select: {
            id: true,
            profile: { select: { nickname: true } }
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset
    })

    const total = await prisma.report.count({
      where: { status: status as any }
    })

    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Reports fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
