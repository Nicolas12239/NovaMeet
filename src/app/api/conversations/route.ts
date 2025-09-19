import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

type ConversationWithIncludes = Prisma.ConversationGetPayload<{
  include: {
    userA_rel: {
      select: {
        id: true,
        profile: {
          select: { nickname: true }
        }
      }
    },
    userB_rel: {
      select: {
        id: true,
        profile: {
          select: { nickname: true }
        }
      }
    },
    messages: {
      orderBy: { createdAt: "desc" },
      take: 1,
      select: {
        content: true,
        createdAt: true,
        sender: {
          select: {
            profile: {
              select: { nickname: true }
            }
          }
        }
      }
    }
  }
}>

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { userA: session.user.id },
          { userB: session.user.id }
        ]
      },
      include: {
        userA_rel: {
          select: {
            id: true,
            profile: {
              select: { nickname: true }
            }
          }
        },
        userB_rel: {
          select: {
            id: true,
            profile: {
              select: { nickname: true }
            }
          }
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            sender: {
              select: {
                profile: {
                  select: { nickname: true }
                }
              }
            }
          }
        }
      },
      orderBy: { lastMessageAt: "desc" }
    })

    // Format conversations for frontend
    const formattedConversations = conversations.map((conv: ConversationWithIncludes) => {
      const otherUser = conv.userA === session.user.id ? conv.userB_rel : conv.userA_rel
      const lastMessage = conv.messages[0]

      return {
        id: conv.id,
        otherUser: {
          id: otherUser.id,
          nickname: otherUser.profile?.nickname || "Unknown"
        },
        lastMessage: lastMessage ? {
          content: lastMessage.content,
          createdAt: lastMessage.createdAt,
          sender: lastMessage.sender.profile?.nickname || "Unknown"
        } : null,
        lastMessageAt: conv.lastMessageAt
      }
    })

    return NextResponse.json({ conversations: formattedConversations })
  } catch (error) {
    console.error("Conversations fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
