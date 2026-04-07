import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/commerce"
import { getLocale, getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"
import { DeliveryMode } from "@prisma/client"

type ShippingAddress = {
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
}

function renderAddress(address: ShippingAddress | null | undefined) {
  if (!address) return null

  return [address.line1, address.line2, address.city, address.state, address.postal_code, address.country]
    .filter(Boolean)
    .join(", ")
}

export default async function OrdersPage() {
  const session = await auth()
  const locale = await getLocale()

  if (!session?.user?.id || !session.user.email) {
    redirect(`/${locale}/sign-in`)
  }

  await prisma.order.updateMany({
    where: {
      userId: null,
      email: session.user.email,
    },
    data: {
      userId: session.user.id,
    },
  })

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const t = await getTranslations("orders")

  return (
    <main className="mx-auto w-4/5 max-w-5xl py-14">
      <h1 className="text-4xl font-bold text-slate-900">{t("title")}</h1>
      <p className="mt-3 text-slate-500">{t("subtitle")}</p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
          {t("empty")}
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {orders.map((order) => {
            const shippingAddress = order.shippingAddress as ShippingAddress | null
            const address = renderAddress(shippingAddress)

            return (
              <section key={order.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {t("orderNumber", { id: order.id })}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {new Intl.DateTimeFormat(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <div>{t("status")}: <span className="font-medium text-slate-900">{order.status}</span></div>
                    <div>{t("fulfillment")}: <span className="font-medium text-slate-900">{order.fulfillmentStatus}</span></div>
                    <div>{t("total")}: <span className="font-medium text-slate-900">{formatPrice(order.totalAmount / 100, locale)}</span></div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {order.items.map((item) => (
                    <article key={item.id} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
                      <div>
                        <h3 className="font-medium text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-500">{item.authorName}</p>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <div>{t("quantity")}: {item.quantity}</div>
                        <div>
                          {item.deliveryMode === DeliveryMode.DIGITAL ? t("digital") : t("physical")}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {address ? (
                  <p className="mt-5 text-sm text-slate-500">
                    {t("shipTo")}: <span className="text-slate-700">{address}</span>
                  </p>
                ) : null}
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}
