import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { name, image } = body as { name?: string; image?: string }

  // Validate name if provided
  if (name !== undefined) {
    const trimmed = name.trim()
    if (trimmed.length < 2 || trimmed.length > 100) {
      return NextResponse.json({ error: "Name must be between 2 and 100 characters." }, { status: 400 })
    }
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name: name.trim() }),
      ...(image !== undefined && { image }),
    },
    select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
  })

  return NextResponse.json(updated)
}
