import { trendingBooks } from "@/data"
import { Metadata } from "next"
import { BookType } from "@/types"
import { BADGE_STYLES } from '@/app/utils/typeHelpers'
import Image from "next/image"
import GoBack from "./GoBack"
import Link from "next/link"
import Breadcrumbs from "@/app/components/ui/BreadCrumbs"
import Badge from "@/app/components/ui/Badge"
import BooksCard from "@/app/components/BookCard"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  const { slug } = await params
  const book = getBook(slug)

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
          url: book.coverImage,
          alt: book.title,
        }
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [book.coverImage],
    },
  }
}

function getBook(slug: string) {
  console.log({ slug });

  return trendingBooks.find(book => book.slug === slug)
}

function getRelatedBooks(book: BookType) {
  return trendingBooks
    .filter(b => book.slug !== b.slug)
    .map(b => ({
      book: b,
      score: b.labels.filter(label => book.labels.includes(label)).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.book)
}

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book: BookType | undefined = getBook(slug)

  if (!book) {
    return <div>Book not found</div>
  }

  const relatedBooks = getRelatedBooks(book)
  const primaryLabel = book.labels[0]

  return (
    <section className="w-3/4 mx-auto mt-12 mb-6">
      <GoBack />

      {/* BREADCRUMBS */}

      <Breadcrumbs primaryLabel={primaryLabel} title={book.title} />

      <div className="flex flex-col md:flex-row justify-center mx-auto">

        {/* COVER */}
        <div className="relative w-full md:w-[340px] min-h-[440px] md:h-auto aspect-2/3 overflow-hidden rounded-md shadow-2xl transition-shadow duration-300 group-hover:shadow-2xl">
          <Image
            src={book.coverImage}
            alt={slug}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority
          />

          {/* BADGES */}
          {book.badges && book.badges.length > 0 && (
            <div className="absolute top-6 left-2 flex flex-col gap-2">
              {book.badges.map((badge, index) => (
                <Badge
                  key={badge}
                  badge={badge}
                  badgeColor={BADGE_STYLES[badge] ?? "bg-slate-600"}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex flex-col mx-auto min-w-[40%]">
          {/* TITLE & AUTHOR */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-800">{book.title}</h2>
            <p className="text-slate-600">{book.author.name}</p>
          </div>
          {/* LABELS */}
          {book.labels && book.labels.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
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
          <div className="border-b border-sky-600/30 my-20" />

          {/* DESCRIPTION */}
          <p className="text-slate-700 leading-relaxed">{book.shortTagline}</p>

          {/* META */}
          <div className="mt-6 text-slate-600 space-y-1">
            {book.ageGroup && <p><strong>Age:</strong> {book.ageGroup}</p>}
            <p><strong>Published:</strong> {book.publishedYear}</p>
          </div>

          {/* PRICE */}
          {book.price && (
            <p className="text-2xl font-semibold text-slate-800 mt-6">
              €{book.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* DIVIDER 2 */}
      <div className="border-b border-sky-600/30 my-20" />

      {/* RELATED BOOKS */}

      {trendingBooks.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Related books</h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingBooks.map((rb) => (
              <BooksCard
                key={rb.id}
                book={{ ...rb }}
              />
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
