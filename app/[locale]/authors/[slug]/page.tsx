import { urlFor } from "@/sanity/lib/image"
import { authorBySlugQuery, booksByAuthorQuery, postsByAuthorQuery } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/utils"
import { Author, BookType, Post } from "@/types"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

export const revalidate = 60

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations("authors")

  const author = await sanityFetch<Author>({
    query: authorBySlugQuery,
    params: { slug },
  })

  if (!author) {
    return (
      <div className="w-4/5 mx-auto py-24 text-center">
        <p className="text-slate-600 text-lg">{t("notFound")}</p>
      </div>
    )
  }

  const [posts, books] = await Promise.all([
    sanityFetch<Post[]>({
      query: postsByAuthorQuery,
      params: { slug },
    }),
    sanityFetch<BookType[]>({
      query: booksByAuthorQuery,
      params: { slug },
    }),
  ])

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Author Header */}
      <div className="mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          {author.image && (
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-slate-100">
              <Image
                src={urlFor(author.image).width(300).url()}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-slate-900">
              {author.name}
            </h1>
            {author.bio && (
              <p className="text-slate-600 text-lg leading-relaxed">{author.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Books Section */}
      {books.length > 0 && (
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-3">
            {t("booksSection")}
            <span className="ml-2 text-base font-normal text-slate-500">({books.length})</span>
          </h2>
          <div className="grid gap-3 sm:gap-4">
            {books.map((book: BookType) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="group p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-indigo-50 transition-all duration-200"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-500 transition-colors">
                  {book.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-3">
            {t("blogSection")}
            <span className="ml-2 text-base font-normal text-slate-500">({posts.length})</span>
          </h2>
          <div className="grid gap-3 sm:gap-4">
            {posts.map((post: Post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {books.length === 0 && posts.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>{t("emptyState")}</p>
        </div>
      )}
    </main>
  )
}
