import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './schemas/index.js'

export default defineConfig({
  name: 'vincemed',
  title: 'Vincemed | Gestão de Conteúdos',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: { types: schemas },
})
