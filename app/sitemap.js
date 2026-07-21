import { getAllArticles } from '@/lib/sanity'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export default async function sitemap() {
  const articles = await getAllArticles()

  const articleUrls = articles
    .filter(a => a.slug && a.publishedAt)
    .map(a => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: a._updatedAt || a.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...articleUrls,
  ]
}
