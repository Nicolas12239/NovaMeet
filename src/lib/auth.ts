import { NextAuthOptions } from "next-auth"
import Adapter from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    role: string
    status: string
  }
  interface Session {
    user: {
      id: string
      email: string
      role: string
      status: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    status: string
  }
}

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "tel" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { phone: credentials.phone }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.status = user.status
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.sub!
          session.user.role = token.role as string
          session.user.status = token.status as string
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
}
