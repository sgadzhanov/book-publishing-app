import { searchQuery } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/utils"
import { SearchResult } from "@/types"
import Link from "next/link"
import { BookOpen, FileText, Search } from "lucide-react"

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const sanitizedQ = params?.q?.trim()

  const results = sanitizedQ
    ? await sanityFetch<SearchResult[]>({
      query: searchQuery,
      params: { q: `*${sanitizedQ}*` },
    })
    : []

  const books = results.filter((item) => item._type === "book")
  const posts = results.filter((item) => item._type === "post")

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800">
          Search
        </h1>

        {/* Search Input on Page */}
        <form action="/search" method="get" className="relative">
          <button
            type="submit"
            className="absolute left-6 top-1/2 -translate-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <input
            type="search"
            name="q"
            defaultValue={sanitizedQ}
            placeholder="Search books and blog posts..."
            className="w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent"
            autoFocus
          />
        </form>
      </div>

      {/* Empty State - No Query */}
      {!sanitizedQ && (
        <div className="text-center py-16">
          <Search className="mx-auto mb-4 text-slate-300" size={48} />
          <p className="text-slate-600 text-lg">Enter a search term to find books and blog posts.</p>
        </div>
      )}

      {/* Results */}
      {sanitizedQ && (
        <>
          <div className="mb-6">
            <p className="text-slate-600">
              Found <span className="font-semibold text-slate-800">{results.length}</span> result{results.length !== 1 ? 's' : ""} for {" "}
              <span className="font-semibold text-slate-800">"{sanitizedQ}"</span>
            </p>
          </div>

          {/* Empty State - No Results */}
          {results.length === 0 && (
            <div className="text-center py-16 border border-slate-200 rounded-lg bg-slate-50">
              <p className="text-slate-600 text-lg mb-2">No results found.</p>
              <p className="te-slate-500 text-sm">Try using different keywords or check your spelling.</p>
            </div>
          )}

          {/* Books Section */}
          {books.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
                <BookOpen
                  size={20}
                  className="text-indigo-600"
                />
                Books
                <span className="text-sm font-normal text-slate-500">({books.length})</span>
              </h2>
              <div className="space-y-3">
                {books.map((book) => (
                  <Link
                    key={`${book._type}-${book.slug}`}
                    href={`/books/${book.slug}`}
                    className="block group p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-100 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-slate-800 group-hover:text-indigo-800 transition-colors">
                        {book.title}
                      </h3>
                      <span className="shrink-0 px-2 py-1 text-xs font-medium bg-indigo-300 text-indigo-800 rounded">
                        Book
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Blog Posts Section */}
          {posts.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-amber-600" />
                Blog Posts
                <span className="text-sm font-normal text-slate-500">({posts.length})</span>
              </h2>
              <div className="space-y-3">
                {posts.map((post) => (
                  <Link
                    key={`${post._type}-${post.slug}`}
                    href={`/blog/${post.slug}`}
                    className="block group p-4 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                        {post.title}
                      </h3>
                      <span className="shrink-0 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                        Post
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}
