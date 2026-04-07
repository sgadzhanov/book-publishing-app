import { Resend } from "resend"
import { DeliveryMode, FulfillmentStatus, OrderStatus, Prisma } from "@prisma/client"
import { prisma as db } from "@/lib/prisma"

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

  const itemsMarkup = order.items
    .map((item: (typeof order.items)[number]) => {
      const downloadLine =
        item.deliveryMode === DeliveryMode.DIGITAL && item.downloadUrl
          ? `<div style="margin-top:6px;"><a href="${item.downloadUrl}" style="color:#4f46e5;">Download your file</a></div>`
          : ""

      return `
        <li style="margin-bottom:12px;">
          <strong>${item.title}</strong> x ${item.quantity}<br />
          ${item.authorName ?? "Unknown author"}<br />
          ${downloadLine}
        </li>
      `
    })
    .join("")

  const shippingMarkup =
    existing.deliveryMode === DeliveryMode.PHYSICAL && details?.shippingAddress
      ? `
        <h3 style="margin:20px 0 8px;">Shipping address</h3>
        <p style="margin:0;">${formatAddress(details.shippingAddress)}</p>
      `
      : ""

  await resend.emails.send({
    from: SENDER_EMAIL,
    to: email,
    subject:
      existing.deliveryMode === DeliveryMode.DIGITAL
        ? `Your digital order ${order.id} is ready`
        : `We received your order ${order.id}`,
    html: `
      <div style="font-family:sans-serif;max-width:620px;margin:0 auto;color:#1e293b;">
        <h2 style="color:#4f46e5;">Order confirmation</h2>
        <p>Thanks for your purchase${order.customerName ? `, ${order.customerName}` : ""}.</p>
        <p>Order ID: <strong>${order.id}</strong></p>
        <ul style="padding-left:18px;">${itemsMarkup}</ul>
        ${shippingMarkup}
      </div>
    `,
  })

  return order
}
