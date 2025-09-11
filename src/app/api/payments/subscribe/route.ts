import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const subscribeSchema = z.object({
  plan: z.enum(["STANDARD", "PREMIUM"]),
  paymentMethod: z.string(), // PayGate payment method reference
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = subscribeSchema.parse(body)

    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ["ACTIVE", "PAST_DUE"] }
      }
    })

    if (existingSubscription) {
      return NextResponse.json(
        { error: "User already has an active subscription" },
        { status: 400 }
      )
    }

    // Calculate subscription end date (1 month from now)
    const renewsAt = new Date()
    renewsAt.setMonth(renewsAt.getMonth() + 1)

    // Create subscription record
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        plan: validatedData.plan,
        status: "ACTIVE",
        renewsAt,
        provider: "PAYGATE",
        providerRef: validatedData.paymentMethod,
      },
    })

    // Update user's premium status
    await prisma.user.update({
      where: { id: session.user.id },
      data: { premiumUntil: renewsAt }
    })

    return NextResponse.json({
      subscription,
      message: "Subscription created successfully"
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Subscription creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
