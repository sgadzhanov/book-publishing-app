import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"
import type { DefaultSession, NextAuthConfig } from "next-auth"

// Type augmentation — adds `id` and `role` to the session user object
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    role?: string
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  debug: process.env.NODE_ENV === "development",
  // Cast needed: @auth/prisma-adapter and next-auth@beta ship separate @auth/core copies
  adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
  // JWT strategy: middleware can verify sessions without a DB call.
  // The Prisma adapter still writes User + Account rows on sign-in.
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      apiKey: process.env.BOOK_PUBLISHING_APP_EMAIL_API_KEY,
      from: process.env.AUTH_RESEND_FROM ?? "Magic Link <onboarding@resend.dev>",
    }),
  ],
  callbacks: {
    // On sign-in, stamp id + role from the DB user into the JWT token
    jwt({ token, user }) {
      if (user) {
        token["id"] = user.id
        token["role"] = user.role ?? "USER"
      }
      return token
    },
    // Expose id + role from the token on the client-readable session object
    session({ session, token }) {
      session.user.id = (token["id"] as string) ?? ""
      session.user.role = (token["role"] as string) ?? "USER"
      return session
    },
  },
})
