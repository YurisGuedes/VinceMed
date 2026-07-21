import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function ArticleCard({ article }) {
  const { title, slug, summary, coverImage, coverImageAlt, category, publishedAt, estimatedReadingTime } = article
  const imgUrl = coverImage ? urlFor(coverImage).width(640).height(360).auto('format').url() : null

  return (
    <Link href={`/${slug}`} className="article-card" style={{ textDecoration: 'none' }}>
      <div className="cover">
        {imgUrl ? (
          <Image src={imgUrl} alt={coverImageAlt || title} width={640} height={360} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        ) : (
          <div style={{ background: 'var(--line)', width: '100%', height: '100%' }} />
        )}
      </div>
      <div className="body">
        {category && <span className="cat">{category.title}</span>}
        <h3>{title}</h3>
        {summary && <p className="excerpt">{summary}</p>}
        <div className="footer">
          <span>{publishedAt ? formatDate(publishedAt) : ''}</span>
          <span className="read-btn">
            {estimatedReadingTime ? `${estimatedReadingTime} min de leitura` : 'Ler artigo'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
