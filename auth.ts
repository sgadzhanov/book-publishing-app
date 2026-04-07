import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { Resend as ResendClient } from "resend"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"
import { magicLinkEmail } from "@/lib/email-templates"
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
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const client = new ResendClient(process.env.BOOK_PUBLISHING_APP_EMAIL_API_KEY!)
        const from = process.env.AUTH_RESEND_FROM ?? "Magic Link <onboarding@resend.dev>"
        const host = new URL(url).host
        await client.emails.send({
          from,
          to: email,
          subject: `Sign in to Storia Publishing`,
          html: magicLinkEmail(url, host),
        })
      },
    }),
  ],
  callbacks: {
    // On sign-in, stamp id + role + image from the DB user into the JWT token.
    // On session update (trigger: "update"), merge in new values so image/name
    // changes are reflected in the session without requiring a sign-out.
    jwt({ token, user, trigger, session: updateData }) {
      if (user) {
        token["id"] = user.id
        token["role"] = user.role ?? "USER"
        if (user.image) token["picture"] = user.image
      }
      if (trigger === "update" && updateData) {
        if (updateData.image !== undefined) token["picture"] = updateData.image
        if (updateData.name !== undefined) token["name"] = updateData.name
      }
      return token
    },
    // Expose id + role from the token on the client-readable session object
    session({ session, token }) {
      session.user.id = (token["id"] as string) ?? ""
      session.user.role = (token["role"] as string) ?? "USER"
      if (token["picture"]) session.user.image = token["picture"] as string
      if (token["name"]) session.user.name = token["name"] as string
      return session
    },
  },
})
