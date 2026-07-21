'use client'
import { useState } from 'react'

export default function CategoryFilter({ categories, articles, children }) {
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
      {children(filtered)}
    </>
  )
}
