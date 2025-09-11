import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const sendMessageSchema = z.object({
  conversationId: z.string().optional(),
  recipientId: z.string(),
  content: z.string().min(1).max(1000),
  mediaUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = sendMessageSchema.parse(body)

    let conversationId = validatedData.conversationId

    // If no conversation ID provided, find or create conversation
    if (!conversationId) {
      const existingConversation = await prisma.conversation.findFirst({
        where: {
          OR: [
            { userA: session.user.id, userB: validatedData.recipientId },
            { userA: validatedData.recipientId, userB: session.user.id }
          ]
        }
      })

      if (existingConversation) {
        conversationId = existingConversation.id
      } else {
        // Create new conversation
        const newConversation = await prisma.conversation.create({
          data: {
            userA: session.user.id,
            userB: validatedData.recipientId
          }
        })
        conversationId = newConversation.id
      }
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: session.user.id,
        content: validatedData.content,
        mediaUrl: validatedData.mediaUrl,
      },
    })

    // Update conversation last message time
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() }
    })

    return NextResponse.json({ message, conversationId })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Message send error:", error)
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
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      return NextResponse.json({ error: "Conversation ID required" }, { status: 400 })
    }

    // Verify user is part of the conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { userA: true, userB: true }
    })

    if (!conversation || (conversation.userA !== session.user.id && conversation.userB !== session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            profile: {
              select: { nickname: true }
            }
          }
        }
      },
      orderBy: { createdAt: "asc" }
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Messages fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
