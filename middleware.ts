import NextAuth from "next-auth"
import createIntlMiddleware from "next-intl/middleware"
import { authConfig } from "./auth.config"
import { routing } from "./i18n/routing"

const { auth } = NextAuth(authConfig)
const intlMiddleware = createIntlMiddleware(routing)

export default auth((req) => {
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api routes (auth callbacks must stay open)
    // - /studio (Sanity CMS)
    // - /_next, /_vercel (Next.js internals)
    // - Static files with extensions (favicon.ico, images, etc.)
    "/((?!api|studio|_next|_vercel|.*\\..*).*)",
  ],
}
