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

export const postsByCategoryQuery = groq`
  *[
    _type == "post"
    && (!defined($category) || count(categories[@.title == $category]) > 0)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories[]{ title },
    coverImage,
    author->{
      name,
      "slug": slug.current
    }
  }  
`

export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    bio,
    image
  }
`

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    bio,
    image
  }
`

export const postsByAuthorQuery = groq`
  *[_type == "post" && author->slug.current == $slug]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
`

export const booksByAuthorQuery = groq`
  *[_type == "book" && author->slug.current == $slug] {
    _id,
    title,
    "slug": slug.current,
    coverImage
  }
`

export const searchQuery = groq`
  *[
    (
      _type == "book" &&
      (
        title match $q ||
        shortTagline match $q
      )
    ) ||
    (
      _type == "post" &&
      (
        title match $q ||
        excerpt match $q
      )
    )
  ] {
    _type,
    title,
    "slug": slug.current
  }
`
