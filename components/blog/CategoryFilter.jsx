'use client'
import { useState } from 'react'
import ArticleCard from './ArticleCard'

export default function CategoryFilter({ categories, articles }) {
  const [active, setActive] = useState(null)

  const filtered = active
    ? articles.filter(a => a.category?.slug === active)
    : articles

  return (
    <>
      {categories.length > 0 && (
        <div className="cat-filter">
          <button className={`cat-btn${!active ? ' on' : ''}`} onClick={() => setActive(null)}>
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              className={`cat-btn${active === cat.slug ? ' on' : ''}`}
              onClick={() => setActive(active === cat.slug ? null : cat.slug)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}
      {filtered.length > 0 ? (
        <div className="article-grid">
          {filtered.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <div className="icon">🔍</div>
          <h3>Nenhum artigo nesta categoria</h3>
          <p>Tente outra categoria ou veja todos os artigos.</p>
        </div>
      )}
    </>
  )
}
