import { groq } from "next-sanity"

const authorFields = groq`
  author->{name, bio, "image": image.asset->url}
`

export const allBooksQuery = groq`
  *[_type == "book"] {
    title,
    "slug": slug.current,
    coverImage,
    price,
    shortTagline,
    ${authorFields},
    labels,
    badges
  }
`

export const singleBookQuery = groq`*[_type == "book" && slug.current == $slug][0]{
    title,
    price,
    shortTagline,
    publishedYear,
    labels,
    badges,
    coverImage,
    ${authorFields}
  }
`

export const relatedBooksQuery = groq`
  *[_type == "book" && slug.current != $currentSlug] | order(_createdAt desc) [0...3] {
    title,
    "slug": slug.current,
    coverImage,
    price,
    shortTagline,
    labels,
    author->{name}
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories,
    coverImage,
    author->{
      name,
      "slug": slug.current
    }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    publishedAt,
    "slug": slug.current,
    categories[]{ title },
    coverImage,
    content,
    author->{
      name,
      "slug": slug.current
    },
  }
`
