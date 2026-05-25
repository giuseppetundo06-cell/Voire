'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [corsiOpen, setCorsiOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (corsiOpen && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [corsiOpen])

  const corsi = [
    { label: 'Architettura', href: '/corsi/architettura', desc: '300 CFU · 5 anni', colore: '#1B4332', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=60' },
    { label: 'Automotive Design', href: '/corsi/automotive-design', desc: '180 CFU · 3 anni', colore: '#8B3A3A', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=60' },
    { label: 'Gioielleria', href: '/corsi/gioielleria', desc: '180 CFU · 3 anni', colore: '#C9A227', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&q=60' },
  ]

  const links = [
    { label: 'Chi siamo', href: '/chi-siamo' },
    { label: 'Docenti', href: '/docenti' },
    { label: 'Ammissioni', href: '/ammissioni/test-ingresso' },
    { label: 'Arena', href: '/arena' },
    { label: 'Mindspace', href: '/mindspace' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-24 flex items-center justify-between px-6 md:px-20 transition-all duration-500 ${scrolled ? 'bg-noir/95 backdrop-blur-sm border-b border-smoke' : 'bg-transparent'}`}>

       <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
  <img src="/logo.png" alt="Voire" className="w-auto object-contain" style={{ width: '120px', height: 'auto' }} />
  <span className="font-display text-2xl text-ivory tracking-[0.2em] font-light">
    VOIRE
  </span>
</Link>

        <nav className="hidden md:flex items-center gap-8">
          {/* Corsi dropdown */}
          <div className="relative"
            onMouseEnter={() => setCorsiOpen(true)}
            onMouseLeave={() => setTimeout(() => setCorsiOpen(false), 1400)}>
            <button className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300 tracking-widest uppercase flex items-center gap-1">
              Corsi
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform duration-300"
                style={{ transform: corsiOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {corsiOpen && (
              <div ref={dropdownRef} className="absolute top-8 left-1/2 -translate-x-1/2 w-[520px] border shadow-2xl overflow-hidden"
                style={{ background: 'rgba(8,8,12,0.98)', borderColor: 'rgba(201,162,39,0.15)', backdropFilter: 'blur(20px)' }}>
                <div className="p-2">
                  {corsi.map((c, i) => (
                    <Link key={i} href={c.href}
                      className="flex items-center gap-5 p-4 group transition-all duration-200 hover:bg-white/3"
                      onClick={() => setCorsiOpen(false)}>
                      <div className="w-16 h-12 overflow-hidden shrink-0"
                        style={{ border: `1px solid ${c.colore}30` }}>
                        <img src={c.img} alt={c.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ filter: 'brightness(0.6) saturate(0.7)' }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-ivory text-base group-hover:text-gold transition-colors duration-200"
                          style={{ letterSpacing: '-0.01em' }}>
                          {c.label}
                        </div>
                        <div className="font-body text-silver/40 text-xs mt-0.5">{c.desc}</div>
                      </div>
                      <div className="h-px w-6 transition-all duration-300 group-hover:w-10"
                        style={{ background: c.colore }} />
                    </Link>
                  ))}
                </div>
                <div className="border-t px-6 py-4 flex justify-between items-center"
                  style={{ borderColor: 'rgba(201,162,39,0.08)' }}>
                  <Link href="/corsi"
                    className="font-body text-silver/50 text-xs uppercase tracking-widest hover:text-gold transition-colors duration-200"
                    onClick={() => setCorsiOpen(false)}>
                    Tutti i corsi →
                  </Link>
                  <Link href="/portfolio-studenti"
                    className="font-body text-silver/50 text-xs uppercase tracking-widest hover:text-gold transition-colors duration-200"
                    onClick={() => setCorsiOpen(false)}>
                    Portfolio studenti →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {links.map((item) => (
            <Link key={item.label} href={item.href}
              className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300 tracking-widest uppercase">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/area-studente"
            className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300">
            Area Studente
          </Link>
          <Link href="/candidati"
            className="font-body text-xs tracking-widest uppercase bg-gold text-noir px-6 py-3 hover:bg-goldLight transition-colors duration-300">
            Candidati
          </Link>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-noir flex flex-col items-center justify-center gap-6">
          <Link href="/corsi" className="font-display text-3xl text-ivory hover:text-gold transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            Corsi
          </Link>
          {links.map((item) => (
            <Link key={item.label} href={item.href}
              className="font-display text-3xl text-ivory hover:text-gold transition-colors duration-300"
              onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/area-studente"
            className="font-display text-3xl text-ivory hover:text-gold transition-colors duration-300"
            onClick={() => setMenuOpen(false)}>
            Area Studente
          </Link>
          <Link href="/candidati"
            className="font-body text-xs tracking-widest uppercase bg-gold text-noir px-8 py-4 mt-4 hover:bg-goldLight transition-colors duration-300"
            onClick={() => setMenuOpen(false)}>
            Candidati
          </Link>
        </div>
      )}
    </>
  )
}