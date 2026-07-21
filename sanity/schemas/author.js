import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'role', title: 'Cargo', type: 'string' }),
    defineField({ name: 'photo', title: 'Fotografia', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Breve descrição', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
