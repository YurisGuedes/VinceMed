import { defineType, defineField } from 'sanity'
import { RESERVED_SLUGS } from '../../lib/constants.js'

export default defineType({
  name: 'article',
  title: 'Artigo',
  type: 'document',
  groups: [
    { name: 'content', title: 'Conteúdo', default: true },
    { name: 'seo', title: 'SEO e Redes Sociais' },
    { name: 'settings', title: 'Configurações' },
  ],
  fields: [
    // ── Conteúdo ─────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required().error('O título é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL do artigo)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
      },
      validation: Rule =>
        Rule.required()
          .custom(async (value, ctx) => {
            if (!value?.current) return 'O slug é obrigatório.'
            if (RESERVED_SLUGS.has(value.current))
              return `"${value.current}" é uma rota reservada do site e não pode ser usada como slug.`
            if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(value.current))
              return 'O slug deve conter apenas letras minúsculas, números e hífens, sem começar ou terminar com hífen.'
            // Verificar duplicados
            const client = ctx.getClient({ apiVersion: '2025-01-01' })
            const id = ctx.document?._id?.replace(/^drafts\./, '')
            const existing = await client.fetch(
              `*[_type == "article" && slug.current == $slug && !(_id in [$id, "drafts." + $id])][0]._id`,
              { slug: value.current, id }
            )
            return existing ? 'Já existe um artigo com este slug.' : true
          })
          .error(),
    }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string', group: 'content' }),
    defineField({
      name: 'summary',
      title: 'Resumo',
      description: 'Exibido nos cards do blog e como meta description quando não preenchida separadamente.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: Rule => Rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Texto alternativo da imagem de capa',
      description: 'Descreva a imagem para acessibilidade e SEO.',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Parágrafo', value: 'normal' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Título H3', value: 'h3' },
            { title: 'Título H4', value: 'h4' },
            { title: 'Citação', value: 'blockquote' },
          ],
          lists: [
            { title: 'Lista com marcadores', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL', validation: Rule => Rule.uri({ allowRelative: true }) },
                  { name: 'blank', type: 'boolean', title: 'Abrir em nova aba', initialValue: true },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo', validation: Rule => Rule.required() },
            { name: 'caption', type: 'string', title: 'Legenda' },
          ],
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      group: 'content',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Data de atualização',
      type: 'datetime',
      group: 'content',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Artigos relacionados',
      description: 'Selecione até 3 artigos. Se não selecionados, serão exibidos artigos da mesma categoria.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      group: 'content',
      validation: Rule => Rule.max(3),
    }),
    // ── SEO ──────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      description: 'Recomendado: até 60 caracteres. Se vazio, usa o título do artigo.',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição SEO',
      description: 'Recomendado: entre 140 e 160 caracteres. Se vazia, usa o resumo.',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Palavra-chave principal',
      description: 'Orientação editorial — não aparece publicamente.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Imagem para redes sociais',
      description: 'Se não preenchida, usa a imagem de capa. Ideal: 1200×630 px.',
      type: 'image',
      group: 'seo',
    }),
    // ── Configurações ─────────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Artigo em destaque',
      description: 'Exibe este artigo no topo da página do blog.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('pt-BR') : 'Rascunho',
        media,
      }
    },
  },
  orderings: [
    { title: 'Mais recentes', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Mais antigos', name: 'publishedAtAsc', by: [{ field: 'publishedAt', direction: 'asc' }] },
  ],
})
