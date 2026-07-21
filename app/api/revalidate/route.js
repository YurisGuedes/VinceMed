import { revalidatePath } from 'next/cache'
import { createHmac } from 'crypto'

export async function POST(request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET
  if (!secret) return Response.json({ error: 'Webhook não configurado.' }, { status: 500 })

  const signature = request.headers.get('sanity-webhook-signature') || ''
  const body = await request.text()

  // Verificar assinatura HMAC do Sanity
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  if (signature !== `sha256=${expected}`)
    return Response.json({ error: 'Assinatura inválida.' }, { status: 401 })

  let payload
  try { payload = JSON.parse(body) } catch { return Response.json({ error: 'JSON inválido.' }, { status: 400 }) }

  const slug = payload?.result?.slug?.current || payload?.slug?.current

  // Revalidar páginas afetadas
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')
  if (slug) revalidatePath(`/${slug}`)

  return Response.json({ revalidated: true, slug: slug || 'blog' })
}
