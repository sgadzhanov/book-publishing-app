import { Resend } from "resend"
import { DeliveryMode, FulfillmentStatus, OrderStatus, Prisma } from "@prisma/client"
import { prisma as db } from "@/lib/prisma"
import { orderConfirmationEmail } from "@/lib/email-templates"

const EMAIL_API_KEY = process.env.BOOK_PUBLISHING_APP_EMAIL_API_KEY?.trim()
const SENDER_EMAIL = process.env.RESEND_ORDERS_FROM ?? "Orders <onboarding@resend.dev>"

type ShippingAddress = {
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
}

function getResend() {
  return EMAIL_API_KEY ? new Resend(EMAIL_API_KEY) : null
}

function formatAddress(address: ShippingAddress) {
  return [
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(", "),
    [address.postal_code, address.country].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join("<br />")
}

function getOrderTransition(deliveryMode: DeliveryMode) {
  if (deliveryMode === DeliveryMode.DIGITAL) {
    return {
      status: OrderStatus.FULFILLED,
      fulfillmentStatus: FulfillmentStatus.FULFILLED,
    }
  }

  return {
    status: OrderStatus.PAID,
    fulfillmentStatus: FulfillmentStatus.PROCESSING,
  }
}

export async function fulfillOrder(orderId: string, details?: {
  stripeCheckoutSessionId?: string | null
  stripePaymentIntentId?: string | null
  email?: string | null
  customerName?: string | null
  shippingAddress?: ShippingAddress | null
}) {
  const existing = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true, user: true },
  })

  if (!existing) {
    throw new Error(`Order ${orderId} not found.`)
  }

  const email = details?.email ?? existing.email
  const matchedUser = existing.userId
    ? existing.user
    : email
      ? await db.user.findUnique({ where: { email } })
      : null

  const transition = getOrderTransition(existing.deliveryMode)

  await db.order.update({
    where: { id: orderId },
    data: {
      email,
      customerName: details?.customerName ?? existing.customerName,
      stripeCheckoutSessionId: details?.stripeCheckoutSessionId ?? existing.stripeCheckoutSessionId,
      stripePaymentIntentId: details?.stripePaymentIntentId ?? existing.stripePaymentIntentId,
      userId: existing.userId ?? matchedUser?.id ?? null,
      status: transition.status,
      fulfillmentStatus: transition.fulfillmentStatus,
      ...(details?.shippingAddress !== undefined
        ? { shippingAddress: details.shippingAddress ?? Prisma.JsonNull }
        : {}),
    },
  })

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  })

  if (!order) {
    throw new Error(`Order ${orderId} disappeared after fulfillment.`)
  }

  const resend = getResend()
  if (!resend || !email) {
    return order
  }

  const isDigital = existing.deliveryMode === DeliveryMode.DIGITAL

  const shippingFormatted =
    !isDigital && details?.shippingAddress
      ? formatAddress(details.shippingAddress)
      : null

  await resend.emails.send({
    from: SENDER_EMAIL,
    to: email,
    subject: isDigital
      ? `Your digital order is ready — ${order.id}`
      : `We received your order — ${order.id}`,
    html: orderConfirmationEmail({
      orderId: order.id,
      customerName: order.customerName,
      isDigital,
      items: order.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        authorName: item.authorName,
        deliveryMode: item.deliveryMode,
        downloadUrl: item.downloadUrl,
      })),
      shippingAddress: shippingFormatted,
    }),
  })

  return order
}
