import type { NextAuthConfig } from "next-auth"

// Edge-safe config — no Prisma imports here.
// Used by middleware for lightweight route protection.
export const authConfig: NextAuthConfig = {
  providers: [], // providers are declared in auth.ts; listed here as empty for edge compatibility
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const protectedPaths = ["/profile", "/wishlist", "/orders"]
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.includes(path)
      )
      if (isProtected) return isLoggedIn
      return true
    },
  },
}
