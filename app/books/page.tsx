import { BookType } from "@/types"
import Link from "next/link"
import { sanityFetch } from '@/sanity/lib/utils'
import { allBooksQuery } from "@/sanity/lib/queries"
import BookCard from "../components/BookCard"


export const revalidate = 60

const PAGE_SIZE = 8

function sortBooks(books: BookType[], sort?: string) {
  switch (sort) {
    case "newest":
      return [...books].sort((a, b) => b.publishedYear - a.publishedYear)
    case "price-asc":
      return [...books].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    case "price-desc":
      return [...books].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    case "title":
      return [...books].sort((a, b) => a.title.localeCompare(b.title))
    default:
      return books
  }
}

type BooksPageProps = {
  searchParams: Promise<{
    labels?: string
    sort?: string
    page?: string
  }>
}

export default async function BooksPage(props: BooksPageProps) {
  const searchParams = await props.searchParams
  
  const sort = searchParams.sort
  const page = Number(searchParams.page) || 1

  const books: BookType[] = await sanityFetch<BookType[]>({ query: allBooksQuery })

  const allLabels = Array.from(
    new Set(books.flatMap(book => book.labels))
  ).sort()

  // Sort
  const sortedBooks = sortBooks(books, sort)

  // Pagination
  const totalPages = Math.ceil(sortedBooks.length / PAGE_SIZE)
  const paginatedBooks = sortedBooks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <main className="bg-white text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <h1 className="text-5xl font-semibold mb-6">
          Our Books
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Explore our curated collection of books for readers of all ages —
          from imaginative children’s stories to thoughtful fiction and
          non-fiction.
        </p>
      </section>

      {/* FILTERS */}
      <section className="w-4/5 mx-auto mb-8 flex flex-wrap gap-3">
        <Link
          href="/books"
          className="px-4 py-2 rounded-full border text-sm hover:bg-slate-100"
        >
          All
        </Link>

        {allLabels.map(label => (
          <Link
            key={label}
            href={`/books?labels=${encodeURIComponent(label)}`}
            className="px-4 py-2 rounded-full border text-sm hover:bg-slate-100"
          >
            {label}
          </Link>
        ))}
      </section>

      {/* SORT */}
      <section className="w-4/5 mx-auto mb-12">
        <div className="flex gap-4 text-sm">
          {[
            ["newest", "Newest"],
            ["price-asc", "Price ↑"],
            ["price-desc", "Price ↓"],
            ["title", "Title"],
          ].map(([key, label]) => (
            <Link
              key={key}
              href={`/books?sort=${key}`}
              className="text-slate-600 hover:text-slate-900"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="w-4/5 mx-auto pb-16">
        {paginatedBooks.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {paginatedBooks.map(book => (
              <BookCard key={book.shortTagline} book={book} />
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-lg">
            No books found for this selection.
          </p>
        )}
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <section className="w-4/5 mx-auto flex gap-3 pb-24">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/books?page=${i + 1}`}
              className={`
                px-3 py-1 rounded border
                ${page === i + 1 ? "bg-violet-600 text-white" : ""}
              `}
            >
              {i + 1}
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
