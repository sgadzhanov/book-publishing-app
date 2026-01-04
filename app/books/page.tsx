import { BookType } from "@/types"
import Link from "next/link"
import { sanityFetch } from '@/sanity/lib/utils'
import { allBooksQuery } from "@/sanity/lib/queries"
import BookCard from "../components/BookCard"
import FilterDropdown from "../components/LabelFilter"
import SortLinkChip from "../components/SortLinkChip"

export const revalidate = 60

const PAGE_SIZE = 12

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

function filterBooksByLabel(books: BookType[], label?: string) {
  if (!label) return books

  return books.filter(book => book.labels.includes(label))
}

type BooksPageProps = {
  searchParams: Promise<{
    labels?: string
    sort?: string
    page?: string
  }>
}

export default async function BooksPage(props: BooksPageProps) {
  const { sort: searchParamsSort, page: searchParamsPage, labels: currentLabel } = await props.searchParams

  const sort = searchParamsSort
  const page = Number(searchParamsPage) || 1

  const books: BookType[] = await sanityFetch<BookType[]>({ query: allBooksQuery })

  const fetchedLabels = await sanityFetch<string[]>({ query: `array::unique(*[_type == "book"].labels[])` })

  const labelCounts = books.reduce((acc, book) => {
    book.labels?.forEach(label => {
      acc[label] = (acc[label] || 0) + 1
    })

    return acc
  }, {} as Record<string, number>)

  // Sort
  const sortedBooks = sortBooks(books, sort)
  const filteredBooks = filterBooksByLabel(sortedBooks, currentLabel)

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE)
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <main className="bg-white text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto pt-16 sm:py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">
            Our Books
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore our curated collection of books for readers of all ages —
            from imaginative children’s stories to thoughtful fiction and
            non-fiction.
          </p>
        </div>
      </section>

      <div id="books-filters" className="pt-6" />

      {/* FILTERS */}
      <section className="w-4/5 mx-auto sm:mb-12">
        <FilterDropdown
          items={fetchedLabels}
          itemCounts={labelCounts}
          queryParam="labels"
          placeholder="Search labels..."
          currentFilterLabel="Filtered by:"
        />
      </section>

      {/* SORT */}
      <section className="w-4/5 mx-auto mb-12">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-slate-500 font-medium">Sort by:</span>
          {[
            ["newest", "Newest"],
            ["price-asc", "Price ↑"],
            ["price-desc", "Price ↓"],
            ["title", "Title"],
          ].map(([key, label]) => (
            <SortLinkChip
              key={key}
              to={key}
              sort={sort}
              label={label}
            />
          ))}
        </div>
      </section>

      {/* Active Results Count */}
      {filteredBooks.length > 0 && (
        <div className="w-4/5 mx-auto mb-6 text-sm text-slate-600">
          Showing {paginatedBooks.length} of {filteredBooks.length} books
          {currentLabel && <span>in <strong>{currentLabel}</strong></span>}
        </div>
      )}

      {/* GRID */}
      <section className="w-4/5 mx-auto pb-16">
        {paginatedBooks.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {paginatedBooks.map(book => (
              <BookCard key={`${book.title}-${book.slug}-${book.shortTagline}`} book={book} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-4">📚</p>
            <p className="text-slate-600 text-lg font-medium mb-2">No books found</p>
            <p className="text-slate-500">Try adjusting your filters or browse all books</p>
            {currentLabel && (
              <Link
                href="/books"
                className="inline-block mt-4 text-violet-600 hover:text-violet-700 underline"
              >
                Clear filters
              </Link>
            )}
          </div>
        )}
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <section className="w-4/5 mx-auto flex flex-wrap gap-3 pb-24 justify-center">
          {/* Previous Button */}
          {page > 1 && (
            <Link
              href={`/books?page=${page - 1}${sort ? `&sort=${sort}` : ""}${currentLabel ? `&labels=${currentLabel}` : ""}#books-filters`}
              className="px-4 py-2 rounded border hover:bg-slate-100 flex items-center gap-1"
            >
              ← Previous
            </Link>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/books?page=${i + 1}${sort ? `&sort=${sort}` : ''}${currentLabel ? `&labels=${currentLabel}` : ''}#books-filters`}
              className={`
                px-4 py-2 rounded border transition-colors ${page === i + 1 ? "bg-violet-400 text-white border-violet-500" : "hover:bg-slate-100"}
              `}
            >
              {i + 1}
            </Link>
          ))}

          {/* Next Button */}
          {page < totalPages && (
            <Link
              href={`/books?page=${page + 1}${sort ? `&sort=${sort}` : ""}${currentLabel ? `&labels=${currentLabel}` : ""}#books-filters`}
              className="px-4 py-2 rounded border hover:bg-slate-100 flex items-center gap-1"
            >
              Next →
            </Link>
          )}
        </section>
      )}
    </main>
  )
}
