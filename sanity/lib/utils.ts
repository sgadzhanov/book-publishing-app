import { client } from "./sanity.client"

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: { query: string; params?: Record<string, unknown> }) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate: 3600 },
  })
}
