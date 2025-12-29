import BooksCard from "@/app/components/BookCard"
import Badge from "@/app/components/ui/Badge"
import Breadcrumbs from "@/app/components/ui/BreadCrumbs"
import { BADGE_STYLES } from '@/app/utils/typeHelpers'
import { urlFor } from "@/sanity/lib/image"
import { relatedBooksQuery, singleBookQuery } from "@/sanity/lib/queries"
import { sanityFetch } from '@/sanity/lib/utils'
import { BookType } from "@/types"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import GoBack from "./GoBack"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {

  const { slug } = await params
  const book = await sanityFetch<BookType>({
    query: singleBookQuery,
    params: { slug },
  })

  if (!book) {
    return {
      title: "Not found"
    }
  }

  const title = `${book.title} - ${book.author.name} | Our Publishing House`

  const description = `${book.shortTagline}${book.ageGroup ? `Recommended for ${book.ageGroup.toLowerCase()} readers` : ""}`

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "book",
      images: [
        {
          url: book.coverImage.asset._ref,
          alt: book.title,
        }
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [book.coverImage.asset._ref],
    },
  }
}

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await sanityFetch<BookType>({
    query: singleBookQuery,
    params: { slug },
  })

  if (!book) {
    return <div>Book not found</div>
  }

  const relatedBooks = await sanityFetch<BookType[]>({
    query: relatedBooksQuery,
    params: { currentSlug: slug },
  })

  const bookLabels = book.labels ?? []
  const primaryLabel = bookLabels.length > 0 ? bookLabels[0] : "General"

  const price = book.price ?? "Contact for price"

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mt-12 mb-6">
      <GoBack />

      {/* BREADCRUMBS */}
      <Breadcrumbs primaryLabel={primaryLabel} title={book.title} />

      <div className="flex flex-col md:flex-row md:items-center justify-center gap-8 lg:gap-20">
        {/* COVER */}
        <div className="relative w-full md:w-[380px] shrink-0 overflow-hidden rounded-lg shadow-2xl transition-shadow duration-300 group-hover:shadow-2xl">
          <div className="aspect-2/3 relative w-full">
            <Image
              src={book.coverImage ? urlFor(book.coverImage).url() : "/placeholder.jpg"}
              alt={book.title || "Book Cover"}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority
            />
          </div>
          {/* BADGES */}
          {book.badges && book.badges.length > 0 && (
            <div className="absolute top-6 left-2 flex flex-col gap-2">
              {book.badges.map((badge, index) => (
                <Badge
                  key={`${badge}-${index}`}
                  badge={badge}
                  badgeColor={BADGE_STYLES[badge] ?? "bg-slate-600"}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex-1 flex flex-col w-full">
          {/* TITLE & AUTHOR */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">{book.title}</h2>
            <p className="text-xl mt-2 text-slate-600">{book.author.name}</p>
          </div>
          {/* LABELS */}
          {book.labels && book.labels.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4 md:justify-start">
              {book.labels.map((label: string) => (
                <Link
                  key={label}
                  href={`/books?label=${encodeURIComponent(label)}`}
                  className="font-semibold text-sm px-3 py-2 rounded-full bg-red-100 text-neutral-700 transition-all hover:bg-red-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* DIVIDER 1 */}
          <div className="border-b border-slate-200 my-10 md:my-16" />

          {/* DESCRIPTION */}
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed italic">
              {book.shortTagline || "No description available."}
            </p>
          </div>

          {/* META & PRICE */}
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="text-slate-600 space-y-2">
              {book.ageGroup && (
                <p className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Age Group:</span> {book.ageGroup}
                </p>
              )}
              <p className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Published:</span> {book.publishedYear}
              </p>
            </div>

            {book.price && (
              <div className="px-6 py-4 rounded-xl border border-slate-100 text-center">
                <span className="block text-sm text-slate-500 uppercase font-bold tracking-widest">Price</span>
                <p className={`${typeof price === "number" ? "text-2xl" : "text-md"} font-bold text-slate-900`}>
                  {typeof price === "number" ? '€' + price.toFixed(2) : price}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* DIVIDER 2 */}
      {relatedBooks.length > 0 && (
        <div className="border-b border-slate-200 my-20" />
      )}

      {/* RELATED BOOKS */}
      {relatedBooks.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Related books</h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBooks.map((rb) => (
              <BooksCard
                key={rb.shortTagline}
                book={{ ...rb }}
              />
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
