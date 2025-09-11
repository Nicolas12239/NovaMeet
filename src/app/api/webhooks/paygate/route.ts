import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PayGate webhook events
const PAYMENT_SUCCEEDED = "payment.succeeded"
const PAYMENT_FAILED = "payment.failed"
const SUBSCRIPTION_CANCELED = "subscription.canceled"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    console.log("PayGate webhook received:", event, data)

    switch (event) {
      case PAYMENT_SUCCEEDED:
        await handlePaymentSucceeded(data)
        break

      case PAYMENT_FAILED:
        await handlePaymentFailed(data)
        break

      case SUBSCRIPTION_CANCELED:
        await handleSubscriptionCanceled(data)
        break

      default:
        console.log("Unknown webhook event:", event)
        return NextResponse.json({ error: "Unknown event" }, { status: 400 })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handlePaymentSucceeded(data: any) {
  const { subscriptionId, userId, amount, currency } = data

  // Find subscription by PayGate reference
  const subscription = await prisma.subscription.findFirst({
    where: { providerRef: subscriptionId }
  })

  if (!subscription) {
    console.error("Subscription not found for PayGate ID:", subscriptionId)
    return
  }

  // Update subscription status
  const renewsAt = new Date()
  renewsAt.setMonth(renewsAt.getMonth() + 1)

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "ACTIVE",
      renewsAt
    }
  })

  // Update user's premium status
  await prisma.user.update({
    where: { id: subscription.userId },
    data: { premiumUntil: renewsAt }
  })

  console.log("Payment succeeded for user:", subscription.userId)
}

async function handlePaymentFailed(data: any) {
  const { subscriptionId, reason } = data

  const subscription = await prisma.subscription.findFirst({
    where: { providerRef: subscriptionId }
  })

  if (!subscription) {
    console.error("Subscription not found for PayGate ID:", subscriptionId)
    return
  }

  // Update subscription status to past due
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: "PAST_DUE" }
  })

  console.log("Payment failed for user:", subscription.userId, "Reason:", reason)
}

async function handleSubscriptionCanceled(data: any) {
  const { subscriptionId } = data

  const subscription = await prisma.subscription.findFirst({
    where: { providerRef: subscriptionId }
  })

  if (!subscription) {
    console.error("Subscription not found for PayGate ID:", subscriptionId)
    return
  }

  // Cancel subscription
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: "CANCELED" }
  })

  // Remove premium status
  await prisma.user.update({
    where: { id: subscription.userId },
    data: { premiumUntil: null }
  })

  console.log("Subscription canceled for user:", subscription.userId)
}
