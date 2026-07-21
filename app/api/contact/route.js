import { Resend } from 'resend'

const CONFIG = {
  fromAddress: 'VinceMed <onboarding@resend.dev>',
  toAddress: 'contato@vincemed.com.br',
  companyName: 'VinceMed',
}

function esc(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  let body
  try { body = await request.json() } catch { return Response.json({ error: 'Corpo inválido.' }, { status: 400 }) }

  const { nome, empresa, email, telefone, assunto, mensagem } = body ?? {}
  if (!nome?.trim() || !email?.trim() || !mensagem?.trim())
    return Response.json({ error: 'Nome, e-mail e mensagem são obrigatórios.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: 'E-mail inválido.' }, { status: 400 })

  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const row = (label, value) =>
    `<tr><td style="padding:11px 0;border-bottom:1px solid #E3E6E3;font-weight:600;width:130px;vertical-align:top;color:#15222E">${label}</td><td style="padding:11px 0;border-bottom:1px solid #E3E6E3;color:#15222E;line-height:1.6">${value}</td></tr>`

  const companyHtml = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;background:#f2f3f1;margin:0;padding:0"><table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0"><tr><td align="center"><table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden"><tr><td style="background:#15222E;padding:24px 36px"><span style="color:#fff;font-size:18px;font-weight:700">${esc(CONFIG.companyName)}</span><span style="color:#1788C8"> · </span><span style="color:rgba(255,255,255,.6);font-size:13px">Novo contacto recebido</span></td></tr><tr><td style="padding:28px 36px"><p style="margin:0 0 20px;font-size:13px;color:#6A7682">Recebido em ${now}</p><table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${row('Nome', esc(nome))}${empresa?.trim() ? row('Empresa', esc(empresa)) : ''}${row('E-mail', `<a href="mailto:${esc(email)}" style="color:#1788C8">${esc(email)}</a>`)}${telefone?.trim() ? row('Telefone', esc(telefone)) : ''}${assunto?.trim() ? row('Assunto', esc(assunto)) : ''}<tr><td style="padding:11px 0;font-weight:600;vertical-align:top;color:#15222E">Mensagem</td><td style="padding:11px 0;color:#15222E;line-height:1.6">${esc(mensagem).replace(/\n/g, '<br>')}</td></tr></table></td></tr></table></td></tr></table></body></html>`

  const firstName = esc(nome.trim().split(' ')[0])
  const clientHtml = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;background:#f2f3f1;margin:0;padding:0"><table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0"><tr><td align="center"><table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden"><tr><td style="background:#15222E;padding:24px 36px"><span style="color:#fff;font-size:18px;font-weight:700">${esc(CONFIG.companyName)}</span></td></tr><tr><td style="padding:40px 36px"><p style="margin:0 0 20px;font-size:17px;font-weight:600;color:#15222E">Olá, ${firstName}.</p><p style="margin:0 0 16px;font-size:15px;color:#6A7682;line-height:1.7">Recebemos a sua mensagem com sucesso.</p><p style="margin:0 0 16px;font-size:15px;color:#6A7682;line-height:1.7">A nossa equipa irá analisar o seu pedido e responder o mais rapidamente possível.</p><p style="margin:0 0 36px;font-size:15px;color:#6A7682;line-height:1.7">Obrigado pelo seu contacto.</p><p style="margin:0;font-size:14px;color:#AEB6BC">Equipa ${esc(CONFIG.companyName)}</p></td></tr><tr><td style="background:#F2F3F1;padding:18px 36px"><p style="margin:0;font-size:12px;color:#AEB6BC">Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem.</p></td></tr></table></td></tr></table></body></html>`

  try {
    await resend.emails.send({ from: CONFIG.fromAddress, to: CONFIG.toAddress, replyTo: email, subject: 'Novo contacto recebido pelo website', html: companyHtml })
    await resend.emails.send({ from: CONFIG.fromAddress, to: email, subject: `Recebemos a sua mensagem — ${CONFIG.companyName}`, html: clientHtml })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact API]', err?.message ?? err)
    return Response.json({ error: 'Erro ao enviar e-mail. Tente novamente.' }, { status: 500 })
  }
}
