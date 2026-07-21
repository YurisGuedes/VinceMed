import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: true, // CDN público para artigos publicados — nunca expõe rascunhos
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}

// ─── Queries GROQ ──────────────────────────────────────────────────────────────

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  summary,
  coverImage,
  coverImageAlt,
  "category": category->{ _id, title, "slug": slug.current },
  "author": author->{ name, role, photo, bio },
  publishedAt,
  updatedAt,
  featured,
  seoTitle,
  seoDescription,
  seoImage,
  "estimatedReadingTime": round(length(pt::text(content)) / 1500)
`

export async function getAllArticles() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  return sanityClient.fetch(
    `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))]
     | order(publishedAt desc) { ${articleFields} }`
  )
}

export async function getFeaturedArticle() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  return sanityClient.fetch(
    `*[_type == "article" && featured == true && defined(slug.current) && !(_id in path("drafts.**"))]
     | order(publishedAt desc)[0] { ${articleFields} }`
  )
}

export async function getArticleBySlug(slug) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      ${articleFields},
      content,
      "relatedArticles": select(
        count(relatedArticles) > 0 =>
          relatedArticles[]->{ ${articleFields} },
        *[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))
          && category._ref == ^.category._ref && slug.current != $slug]
          | order(publishedAt desc)[0..2] { ${articleFields} }
      )
    }`,
    { slug }
  )
}

export async function getAllArticleSlugs() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  return sanityClient.fetch(
    `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`
  )
}

export async function getAllCategories() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current }`
  )
}
