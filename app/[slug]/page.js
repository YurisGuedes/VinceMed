import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleBody from '@/components/blog/ArticleBody'
import ShareButtons from '@/components/blog/ShareButtons'
import ArticleCard from '@/components/blog/ArticleCard'
import { getArticleBySlug, getAllArticleSlugs, urlFor } from '@/lib/sanity'
import { SITE_URL, CONTACT, RESERVED_SLUGS } from '@/lib/constants'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  if (RESERVED_SLUGS.has(slug)) return {}

  const article = await getArticleBySlug(slug)
  if (!article) return {}

  const title = article.seoTitle || article.title
  const description = article.seoDescription || article.summary
  const imageSource = article.seoImage || article.coverImage
  const imageUrl = imageSource ? urlFor(imageSource).width(1200).height(630).auto('format').url() : undefined
  const canonicalUrl = `${SITE_URL}/${slug}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author?.name ? [article.author.name] : [],
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params

  if (RESERVED_SLUGS.has(slug)) notFound()

  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const canonicalUrl = `${SITE_URL}/${slug}`
  const seoImage = article.seoImage || article.coverImage
  const seoImageUrl = seoImage ? urlFor(seoImage).width(1200).height(630).auto('format').url() : undefined
  const coverUrl = article.coverImage
    ? urlFor(article.coverImage).width(1280).height(720).auto('format').url()
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.seoTitle || article.title,
        description: article.seoDescription || article.summary,
        url: canonicalUrl,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: article.author?.name
          ? { '@type': 'Person', name: article.author.name }
          : { '@type': 'Organization', name: 'VinceMed' },
        publisher: {
          '@type': 'Organization',
          name: 'VinceMed',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/logo/logo-white.png` },
        },
        image: seoImageUrl ? { '@type': 'ImageObject', url: seoImageUrl } : undefined,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main>
        <div className="article-header">
          <div className="wrap" style={{ maxWidth: '820px' }}>
            {/* Breadcrumb */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Início</Link>
              <span className="sep">›</span>
              <Link href="/blog">Blog</Link>
              <span className="sep">›</span>
              <span className="cur">{article.title}</span>
            </nav>

            {article.category && (
              <span className="cat-tag">{article.category.title}</span>
            )}
            <h1>{article.title}</h1>
            {article.subtitle && <p className="subtitle">{article.subtitle}</p>}

            <div className="article-meta">
              {article.author && (
                <span className="author-info">
                  {article.author.photo && (
                    <Image
                      src={urlFor(article.author.photo).width(64).height(64).auto('format').url()}
                      alt={article.author.name}
                      width={32}
                      height={32}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                  <span className="author-name">{article.author.name}</span>
                  {article.author.role && <span>· {article.author.role}</span>}
                </span>
              )}
              {article.publishedAt && (
                <>
                  <span className="sep"></span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </>
              )}
              {article.updatedAt && article.updatedAt !== article.publishedAt && (
                <>
                  <span className="sep"></span>
                  <span>Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </>
              )}
              {article.estimatedReadingTime > 0 && (
                <>
                  <span className="sep"></span>
                  <span>{article.estimatedReadingTime} min de leitura</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Imagem de capa */}
        {coverUrl && (
          <div className="wrap" style={{ maxWidth: '960px', marginBottom: '0' }}>
            <div className="article-cover">
              <Image
                src={coverUrl}
                alt={article.coverImageAlt || article.title}
                width={1280}
                height={720}
                priority
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Conteúdo */}
        <div className="wrap" style={{ maxWidth: '820px', padding: '0 36px 80px' }}>
          {article.content && <ArticleBody content={article.content} />}

          <ShareButtons title={article.title} url={canonicalUrl} />

          {/* CTA Comercial */}
          <div className="article-cta">
            <p>Quer saber mais sobre os produtos VinceMed para o seu hospital ou clínica?</p>
            <div className="actions">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Olá, li um artigo no blog da VinceMed e gostaria de saber mais sobre os produtos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                Falar no WhatsApp
              </a>
              <Link href="/#contato" className="btn btn-line on-dark">Enviar mensagem</Link>
            </div>
          </div>

          {/* Artigos relacionados */}
          {article.relatedArticles?.length > 0 && (
            <div className="related-section">
              <h2>Artigos relacionados</h2>
              <div className="article-grid">
                {article.relatedArticles.map(rel => (
                  <ArticleCard key={rel._id} article={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
