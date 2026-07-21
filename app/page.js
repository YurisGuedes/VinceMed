import HomeClient from '@/components/HomeClient'

export const metadata = {
  title: 'VinceMed — Saúde para toda vida',
  description: 'VinceMed — importação e distribuição de produtos médicos para hemodinâmica e cardiologia intervencionista. Qualidade, procedência e atendimento em todo o Brasil.',
  openGraph: {
    title: 'VinceMed — Saúde para toda vida',
    description: 'Produtos médicos para hemodinâmica com qualidade e procedência. Atendemos todo o Brasil.',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomeClient />
}
