import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export default function FeaturedArticle({ article }) {
  const { title, slug, summary, coverImage, coverImageAlt, category, publishedAt, estimatedReadingTime } = article
  const imgUrl = coverImage ? urlFor(coverImage).width(900).height(506).auto('format').url() : null

  return (
    <div className="featured-article fade">
      <div className="cover">
        {imgUrl && (
          <Image src={imgUrl} alt={coverImageAlt || title} width={900} height={506} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        )}
      </div>
      <div className="info">
        {category && <span className="eyebrow">{category.title}</span>}
        <h2>{title}</h2>
        {summary && <p>{summary}</p>}
        <div className="meta">
          {publishedAt && <span>{new Date(publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>}
          {estimatedReadingTime && <><span className="dot"></span><span>{estimatedReadingTime} min de leitura</span></>}
        </div>
        <Link href={`/${slug}`} className="btn btn-dark">
          Ler artigo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>
    </div>
  )
}
