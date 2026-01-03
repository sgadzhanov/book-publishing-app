import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/utils"
import { postBySlugQuery } from "@/sanity/lib/queries"
import { Post } from "@/types"
import { urlFor } from "@/sanity/lib/image"
import Breadcrumbs from "@/app/components/ui/BreadCrumbs"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "next-sanity"
import { portableTextComponent } from "@/app/components/PortableText"
import { getReadingTime } from "@/app/utils/readingTime"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const awaitedParams = await params
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug: awaitedParams.slug },
  })

  if (!post) return { title: "Post not found" }

  const title = `${post.title} | Our Publishing House`
  const description = post.excerpt ?? ""

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage
        ? [
          {
            url: ogImage,
            alt: post.title,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function PostDetails({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug: awaitedParams.slug },
  })


  if (!post) {
    return (
      <div className="w-4/5 mx-auto py-24">Post not found</div>
    )
  }

  const readingTime = getReadingTime(post.content)

  const jsonLd = {
    "@context": "https//schema.org",
    "@type": "Article",
    headling: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    datePublished: post.publishedAt,
    image: post.coverImage
      ? urlFor(post.coverImage).width(1200).url()
      : undefined,
  }

  const primaryCategory = "Some Category"

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="bg-slate-50 text-slate-800">
        <section className="w-4/5 mx-auto py-16 max-w-3xl">

          {/* BREADCRUMBS */}
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              ...(primaryCategory
                ? [
                  {
                    label: primaryCategory,
                    href: `/blog?category=${encodeURIComponent(primaryCategory)}`,
                  },
                ]
                : []),
              { label: post.title },
            ]}
          />

          {/* TITLE */}
          <h1 className="text-4xl font-semibold mb-4">
            {post.title}
          </h1>

          {/* META */}
          <p className="text-sm text-slate-500 mb-8">
            {post.author?.name}
            {post.publishedAt && (
              <> · {new Date(post.publishedAt).toLocaleDateString()}</>
            )}
            {" · "}
            {readingTime} min read
          </p>

          {/* COVER */}
          {post.coverImage && (
            <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.coverImage).width(1200).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* CATEGORIES */}
          {post?.categories && post.categories?.length > 0 && (
            <div className="flex gap-3 mb-12">
              {post.categories?.map((cat: any) => (
                <Link
                  key={cat.title}
                  href={`/blog?category=${encodeURIComponent(cat.title)}`}
                  className="text-sm px-3 py-1 rounded-full border hover:bg-slate-100"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          {/* CONTENT */}
          <article className="prose prose-slate max-w-none">
            <PortableText
              value={post.content}
              components={portableTextComponent}
            />
          </article>
        </section>
      </main>
    </>
  )
}
