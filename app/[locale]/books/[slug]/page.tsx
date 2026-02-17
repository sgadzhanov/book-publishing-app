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
      title: "Book Not Found | Our Publishing House",
      description: "The book you're looking for could not be found.",
    }
  }

  const title = `${book.title} by ${book.author.name} | Our Publishing House`

  const description = book.shortTagline
    ? `${book.shortTagline}${book.ageGroup ? `. Perfect for ${book.ageGroup.toLowerCase()} readers.` : ''}`
    : `Discover ${book.title} by ${book.author.name}. Available now.`

  const imageUrl = urlFor(book.coverImage).width(1200).height(630).url()

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "book",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Cover of ${book.title} by ${book.author.name}`,
        }
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">📚</p>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Book Not Found</h1>
        <p className="text-slate-600 mb-8">Sorry, we couldn't find the book you're looking for.</p>
        <Link
          href="/books"
          className="inline-block px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Browse All Books
        </Link>
      </div>
    )
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
      <Breadcrumbs
        items={[
          { label: "Books", href: "/books" },
          {
            label: primaryLabel,
            href: `/books?labels=${encodeURIComponent(primaryLabel)}`
          },
          { label: book.title },
        ]}
      />

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
              sizes="(max-width: 768px) 100vw, 380px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
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
                  href={`/books?labels=${encodeURIComponent(label)}`}
                  className="text-sm px-3 py-2 rounded-full bg-indigo-100 text-indigo-800 transition-all hover:bg-indigo-200"
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
            <div className="space-y-3">
              {book.ageGroup && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Age Group</p>
                    <p className="text-slate-800 font-medium">{book.ageGroup}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Published</p>
                  <p className="text-slate-800 font-medium">{book.publishedYear}</p>
                </div>
              </div>
            </div>

            {price && (
              <div className="px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-sm text-slate-500 uppercase font-semibold tracking-wide mb-1">Price</span>
                <p
                  className="text-3xl font-bold text-slate-900"
                // className={`${typeof price === "number" ? "text-2xl" : "text-md"} font-bold text-slate-900`}
                >
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
