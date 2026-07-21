import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const components = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1200).auto('format').url()
      return (
        <figure>
          <Image src={src} alt={value.alt || ''} width={1200} height={675} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
}

export default function ArticleBody({ content }) {
  return (
    <div className="prose">
      <PortableText value={content} components={components} />
    </div>
  )
}
