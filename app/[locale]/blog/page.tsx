import { urlFor } from "@/sanity/lib/image"
import { postsByCategoryQuery } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/utils"
import { Post } from "@/types"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import FilterDropdown from "../../components/LabelFilter"
import { getTranslations, setRequestLocale } from "next-intl/server"

type BlogPageProps = {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{
    category?: string
  }>
}

export const revalidate = 60

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("blog")

  const awaitedParams = await searchParams
  const currentCategory = awaitedParams?.category ?? null

  const posts: Post[] = await sanityFetch<Post[]>({
    query: postsByCategoryQuery,
    params: { category: currentCategory }
  })

  const allCategories = await sanityFetch<string[]>({
    query: `array::unique(*[_type == "post"].categories[].title) | order(@)`
  })

  const categoryCounts = posts.reduce((acc, post) => {
    post.categories?.forEach(cat => {
      if (cat.title) {
        acc[cat.title] = (acc[cat.title] || 0) + 1
      }
    })
    return acc
  }, {} as Record<string, number>)

  return (
    <main className="bg-stone-100 text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <h1 className="text-5xl font-semibold mb-6">{t("title")}</h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          {t("description")}
        </p>
      </section>

      {posts.length > 0 && (
        <section className="w-4/5 mx-auto mb-6 sm:mb-8">
          <FilterDropdown
            items={allCategories}
            itemCounts={categoryCounts}
            queryParam="category"
            placeholder={t("searchCategories")}
            currentFilterLabel={t("category")}
          />
        </section>
      )}

      {posts.length === 0 && (
        <p className="w-4/5 mx-auto text-slate-500 text-lg">{t("noPosts")}</p>
      )}

      {/* POSTS */}
      <section className="w-4/5 mx-auto pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post: Post) => (
            <li key={post._id} className="group rounded-xl p-12 md:p-4 lg:p-8 xl:p-12 cursor-pointer bg-stone-200/70 duration-300 transition-colors hover:bg-stone-300/60 shadow-xl">
              <Link href={`/blog/${post.slug}`}>

                {/* COVER */}
                {post.coverImage && (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <Image
                      src={urlFor(post.coverImage).width(800).height(450).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* META */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold leading-snug">{post.title}</h2>

                  {post.author && (
                    <p className="text-sm text-slate-500">
                      {t("by")} {post.author.name}
                      {post.publishedAt && (
                        <> · {new Date(post.publishedAt).toLocaleDateString(locale)}</>
                      )}
                    </p>
                  )}

                  {post.excerpt && (
                    <p className="text-slate-600 leading-relaxed mt-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
