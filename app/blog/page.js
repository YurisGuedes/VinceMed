import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeaturedArticle from '@/components/blog/FeaturedArticle'
import CategoryFilter from '@/components/blog/CategoryFilter'
import { getAllArticles, getFeaturedArticle, getAllCategories } from '@/lib/sanity'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 60

export const metadata = {
  title: 'Blog | Conteúdos Vincemed',
  description: 'Artigos sobre hemodinâmica, cardiologia intervencionista, inovação em saúde e boas práticas em procedimentos médicos.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog | Conteúdos Vincemed',
    description: 'Artigos sobre hemodinâmica, cardiologia intervencionista, inovação em saúde e boas práticas em procedimentos médicos.',
  },
}

export default async function BlogPage() {
  const [articles, featured, categories] = await Promise.all([
    getAllArticles(),
    getFeaturedArticle(),
    getAllCategories(),
  ])

  const nonFeatured = featured
    ? articles.filter(a => a.slug !== featured.slug)
    : articles

  return (
    <>
      <Header />

      <main>
        <section className="blog-intro full">
          <div className="wrap">
            <span className="eyebrow">Conteúdos Vincemed</span>
            <h1>Conhecimento que<br /><span style={{ color: 'var(--faint)' }}>transforma a prática clínica</span></h1>
            <p>
              Artigos sobre hemodinâmica, cardiologia intervencionista, inovação em dispositivos médicos
              e boas práticas para garantir segurança e excelência nos procedimentos.
            </p>
          </div>
        </section>

        <section className="blog-section full">
          <div className="wrap">

            {featured && <FeaturedArticle article={featured} />}

            {nonFeatured.length > 0 ? (
              <CategoryFilter categories={categories} articles={nonFeatured} />
            ) : !featured ? (
              <div className="blog-empty">
                <div className="icon">✍️</div>
                <h3>Em breve, novos conteúdos</h3>
                <p>A equipe VinceMed está preparando artigos sobre hemodinâmica, cardiologia e inovação em saúde.</p>
              </div>
            ) : null}

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
