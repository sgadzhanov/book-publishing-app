export function getBaseUrl(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost ?? request.headers.get("host")

  if (host) {
    return `${forwardedProto ?? "https"}://${host}`
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
}
