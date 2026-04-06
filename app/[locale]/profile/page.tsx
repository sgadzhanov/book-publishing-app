import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { getLocale } from "next-intl/server"
import ProfileClient from "@/app/components/profile/ProfileClient"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    const locale = await getLocale()
    redirect(`/${locale}/sign-in`)
  }

  // Fetch fresh user data from DB (avoids stale JWT image)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      accounts: {
        select: { provider: true },
      },
    },
  })

  if (!user) {
    const locale = await getLocale()
    redirect(`/${locale}/sign-in`)
  }

  const providers = user.accounts.map((a) => a.provider)
  const isGoogleUser = providers.includes("google")

  return (
    <ProfileClient
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      }}
      isGoogleUser={isGoogleUser}
    />
  )
}
