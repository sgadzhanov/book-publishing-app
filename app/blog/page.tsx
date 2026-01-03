import { urlFor } from "@/sanity/lib/image"
import { postsByCategoryQuery } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/utils"
import { Post } from "@/types"
import Image from "next/image"
import Link from "next/link"

type BlogPageProps = {
  searchParams?: Promise<{
    category?: string
  }>
}

export const revalidate = 60

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentCategory = params?.category ?? null

  const posts: Post[] = await sanityFetch<Post[]>({ query: postsByCategoryQuery, params: { category: currentCategory } })

  return (
    <main className="bg-stone-100 text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <h1 className="text-5xl font-semibold mb-6">Blog</h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Thoughts, stories, and behind-the-scenes insights from our authors,
          editors, and publishing team.
        </p>
      </section>

      {/* CATEGORY FILTER */}
      {posts.length > 0 && (
        <section className=" w-4/5 mx-auto mb-12 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full border text-sm ${!currentCategory ? "bg-violet-600 text-white" : "hover:bg-slate-100"}`}
          >
            All
          </Link>

          {Array.from(
            new Set(posts.flatMap(p => p.categories?.map(c => c.title) ?? []))
          ).map(cat => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full border text-sm ${currentCategory === cat ? "bg-violet-400 text-white" : "hover:bg-slate-100"}`}
            >
              {cat}
            </Link>
          ))}
        </section>
      )}

      {posts.length === 0 && (
        <p className="text-slate-500 text-lg">No posts found in this category.</p>
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
                      By {post.author.name}
                      {post.publishedAt && (
                        <> · {new Date(post.publishedAt).toLocaleDateString()}</>
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
