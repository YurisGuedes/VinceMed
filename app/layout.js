import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hanken',
})

export const viewport = {
  themeColor: '#0E1C28',
}

export const metadata = {
  metadataBase: new URL('https://www.vincemed.com.br'),
  title: { default: 'VinceMed — Saúde para toda vida', template: '%s | VinceMed' },
  description: 'VinceMed — importação e distribuição de produtos médicos para hemodinâmica e cardiologia intervencionista. Qualidade, procedência e atendimento em todo o Brasil.',
  openGraph: {
    siteName: 'VinceMed',
    locale: 'pt_BR',
    type: 'website',
  },
  icons: { icon: '/assets/favicon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={hanken.className}>
      <body>{children}</body>
    </html>
  )
}
