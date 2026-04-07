const BRAND_COLOR = "#FFA273"
const BRAND_DARK = "#1e293b"
const BG_COLOR = "#fdf4ff"
const CARD_BG = "#ffffff"
const BORDER_COLOR = "#f3e8ff"
const MUTED = "#64748b"
const FONT = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"

function wrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:${BG_COLOR};${FONT}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG_COLOR};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="margin:0;font-size:22px;font-weight:700;color:${BRAND_DARK};letter-spacing:-0.5px;">
                Storia <span style="color:${BRAND_COLOR};">Publishing</span>
              </p>
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background-color:${CARD_BG};border-radius:16px;border:1px solid ${BORDER_COLOR};padding:40px 36px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:${MUTED};">
                Storia Publishing · storiapublishing.com
              </p>
              <p style="margin:6px 0 0;font-size:12px;color:${MUTED};">
                If you did not request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function button(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block;background-color:${BRAND_COLOR};color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:10px;margin-top:8px;">${label}</a>`
}

function divider() {
  return `<div style="border-top:1px solid ${BORDER_COLOR};margin:28px 0;"></div>`
}

// ─── Magic link ────────────────────────────────────────────────────────────────

export function magicLinkEmail(url: string, host: string) {
  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:${BRAND_DARK};">Sign in to Storia Publishing</h1>
    <p style="margin:0 0 28px;font-size:15px;color:${MUTED};line-height:1.6;">
      Click the button below to sign in to your account. This link expires in 24 hours and can only be used once.
    </p>

    <div style="text-align:center;margin-bottom:28px;">
      ${button("Sign in to your account", url)}
    </div>

    ${divider()}

    <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.6;">
      Or copy and paste this URL into your browser:<br />
      <span style="color:${BRAND_DARK};word-break:break-all;">${url}</span>
    </p>
  `
  return wrapper(content)
}

// ─── Order confirmation ────────────────────────────────────────────────────────

type OrderItem = {
  title: string
  quantity: number
  authorName?: string | null
  deliveryMode: string
  downloadUrl?: string | null
}

type OrderEmailOptions = {
  orderId: string
  customerName?: string | null
  isDigital: boolean
  items: OrderItem[]
  shippingAddress?: string | null
}

export function orderConfirmationEmail(opts: OrderEmailOptions) {
  const greeting = opts.customerName
    ? `Hi ${opts.customerName},`
    : "Hi there,"

  const headline = opts.isDigital
    ? "Your digital order is ready"
    : "We received your order"

  const subline = opts.isDigital
    ? "Your files are ready to download. You'll find the download links below."
    : "We're processing your order and will ship it soon."

  const itemsHtml = opts.items.map((item) => {
    const downloadLine = item.deliveryMode === "DIGITAL" && item.downloadUrl
      ? `<div style="margin-top:6px;">
           <a href="${item.downloadUrl}" style="color:${BRAND_COLOR};font-weight:600;font-size:13px;">
             Download your file →
           </a>
         </div>`
      : ""

    return `
      <div style="padding:16px 0;border-bottom:1px solid ${BORDER_COLOR};">
        <p style="margin:0;font-size:15px;font-weight:600;color:${BRAND_DARK};">${item.title}</p>
        ${item.authorName ? `<p style="margin:2px 0 0;font-size:13px;color:${MUTED};">${item.authorName}</p>` : ""}
        <p style="margin:4px 0 0;font-size:13px;color:${MUTED};">Qty: ${item.quantity}</p>
        ${downloadLine}
      </div>`
  }).join("")

  const shippingHtml = opts.shippingAddress
    ? `${divider()}
       <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:${BRAND_DARK};text-transform:uppercase;letter-spacing:0.5px;">Shipping address</p>
       <p style="margin:0;font-size:14px;color:${MUTED};line-height:1.7;">${opts.shippingAddress}</p>`
    : ""

  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:${BRAND_DARK};">${headline}</h1>
    <p style="margin:0 0 24px;font-size:15px;color:${MUTED};">${greeting} ${subline}</p>

    <div style="background-color:${BG_COLOR};border-radius:10px;padding:6px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;color:${MUTED};text-transform:uppercase;letter-spacing:0.5px;padding:12px 0 4px;">Order ID</p>
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:${BRAND_DARK};font-family:monospace;">${opts.orderId}</p>
    </div>

    <div>${itemsHtml}</div>

    ${shippingHtml}

    ${divider()}

    <p style="margin:0;font-size:13px;color:${MUTED};line-height:1.6;">
      Questions about your order? Reply to this email or visit
      <a href="https://storiapublishing.com/support" style="color:${BRAND_COLOR};">storiapublishing.com/support</a>
    </p>
  `
  return wrapper(content)
}
