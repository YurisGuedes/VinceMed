export const SITE_URL = 'https://www.vincemed.com.br'

export const CONTACT = {
  whatsapp: '5585981907070',
  whatsappDisplay: '+55 85 98190-7070',
  email: 'contato@vincemed.com.br',
  instagram: 'https://www.instagram.com/vincemedoficial/',
  instagramHandle: '@vincemedoficial',
}

export const RESERVED_SLUGS = new Set([
  // páginas existentes do site
  'blog', 'admin', 'api', 'link', 'link-na-bio',
  // slugs de negócio
  'contato', 'contacto', 'produtos', 'produto',
  'servicos', 'serviços', 'sobre', 'quem-somos',
  'politica-de-privacidade', 'termos-de-uso',
  'sitemap', 'robots', 'login',
  // assets públicos
  'assets', 'favicon',
])
