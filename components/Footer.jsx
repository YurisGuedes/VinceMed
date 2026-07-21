import { CONTACT } from '@/lib/constants'

export default function Footer({ showPublishLink = true }) {
  return (
    <footer className="footer full">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/assets/logo/logo-white.png" alt="VinceMed" />
            <p>Soluções médicas com qualidade, confiança, tecnologia e cuidado em cada detalhe.</p>
            <div className="socials">
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7c0-1.67-.03-3.8-2.3-3.8s-2.65 1.8-2.65 3.67V24h-4z"/>
                </svg>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .7 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .3-4.5 31 31 0 0 0-.3-4.5zM9.7 15.3V8.7l5.7 3.3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5>Navegação</h5>
            <ul>
              <li><a href="/">Início</a></li>
              <li><a href="/#sobre">Sobre</a></li>
              <li><a href="/#produtos">Produtos</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/#contato">Contato</a></li>
            </ul>
          </div>

          <div>
            <h5>Produtos</h5>
            <ul>
              <li><a href="/#produtos">Fio Guia PTFE</a></li>
              <li><a href="/#produtos">Insuflador de Balão</a></li>
              <li><a href="/#produtos">Manifold Vincemed</a></li>
              <li><a href="/#produtos">Pulseira de Compressão Radial</a></li>
              <li><a href="/#produtos">Cateter IV Periférico</a></li>
              <li><a href="/#produtos">Linha de Extensão Alta Pressão</a></li>
              <li><a href="/#produtos">Torneira de 3 Vias</a></li>
              <li><a href="/#produtos">Válvula Hemostática</a></li>
            </ul>
          </div>

          <div>
            <h5>Contato</h5>
            <ul>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>{CONTACT.email}</li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="legal">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
            {showPublishLink && (
              <a href="/admin" style={{ opacity: 0.4, fontSize: '.78rem' }}>
                Área de publicação
              </a>
            )}
          </div>
          <div className="copy">
            © 2026 MEDICAL LIFE COMERCIO DE PRODUTOS HOSPITALARES LTDA · CNPJ 14.361.780/0001-00<br />
            Responsável Técnico: Monik Hayckel Gomes Silva · CRF/PI 1344
          </div>
          <a href="https://www.two7.com.br/" target="_blank" rel="noopener" className="made-by" aria-label="Design by Two7">
            <span>Design by</span>
            <img src="/assets/logo/two7-logo-rgb-04.png" alt="Two7" height="16" />
          </a>
        </div>
      </div>
    </footer>
  )
}
