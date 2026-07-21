'use client'
import { useEffect } from 'react'

export default function Header({ transparent = false }) {
  useEffect(() => {
    const nav = document.getElementById('nav')
    const mm = document.getElementById('mmenu')
    if (!nav) return

    function navState() {
      const scrolled = window.scrollY > 60
      nav.classList.toggle('scrolled', scrolled)
      nav.classList.toggle('over', transparent && !scrolled)
      nav.classList.toggle('at-top', window.scrollY < 10)
    }
    navState()
    window.addEventListener('scroll', navState, { passive: true })

    const hamb = document.getElementById('hamb')
    const mclose = document.getElementById('mclose')
    const openMenu = () => mm?.classList.add('open')
    const closeMenu = () => mm?.classList.remove('open')
    hamb?.addEventListener('click', openMenu)
    mclose?.addEventListener('click', closeMenu)
    mm?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu))

    return () => {
      window.removeEventListener('scroll', navState)
      hamb?.removeEventListener('click', openMenu)
      mclose?.removeEventListener('click', closeMenu)
    }
  }, [transparent])

  return (
    <>
      <nav className={`nav${transparent ? ' over' : ' scrolled'}`} id="nav">
        <div className="nav-inner">
          <div className="nav-links">
            <a href="/">Início</a>
            <a href="/#sobre">Sobre</a>
            <a href="/#produtos">Produtos</a>
            <a href="/blog">Blog</a>
          </div>
          <a href="/" className="brand-center">
            <img className="mc" src="/assets/logo/mark.png" alt="VinceMed" />
            <img className="mw" src="/assets/logo/mark-white.png" alt="VinceMed" />
            <span className="brand-word"><span className="b1">Vince</span><span className="b2">Med</span></span>
          </a>
          <div className="nav-right">
            <a href="/#contato" className="btn btn-line">Contato</a>
            <button className="hamb" id="hamb" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mmenu" id="mmenu">
        <button className="close" id="mclose" aria-label="Fechar">&times;</button>
        <a href="/">Início</a>
        <a href="/#sobre">Sobre</a>
        <a href="/#produtos">Produtos</a>
        <a href="/blog">Blog</a>
        <a href="/#contato">Contato</a>
      </div>
    </>
  )
}
