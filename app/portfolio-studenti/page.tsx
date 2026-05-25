'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'

gsap.registerPlugin(ScrollTrigger)

const progetti = [
  { titolo: 'Torre Helix', studente: 'Sofia M.', corso: 'Architettura', anno: 2025, img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', colore: '#1B4332' },
  { titolo: 'Concept EV 2035', studente: 'Marco F.', corso: 'Automotive Design', anno: 2025, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', colore: '#8B3A3A' },
  { titolo: 'Collezione Aurora', studente: 'Chiara R.', corso: 'Gioielleria', anno: 2025, img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80', colore: '#C9A227' },
  { titolo: 'Museo del Silenzio', studente: 'Luca B.', corso: 'Architettura', anno: 2024, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', colore: '#1B4332' },
  { titolo: 'Supercar Alpine', studente: 'Anna V.', corso: 'Automotive Design', anno: 2024, img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80', colore: '#8B3A3A' },
  { titolo: 'Anello Eternità', studente: 'Pietro G.', corso: 'Gioielleria', anno: 2024, img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', colore: '#C9A227' },
  { titolo: 'Biblioteca Sospesa', studente: 'Elena C.', corso: 'Architettura', anno: 2024, img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', colore: '#1B4332' },
  { titolo: 'Urban Mobility Pod', studente: 'Davide L.', corso: 'Automotive Design', anno: 2025, img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80', colore: '#8B3A3A' },
]

const filtri = ['Tutti', 'Architettura', 'Automotive Design', 'Gioielleria']

export default function PortfolioPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [filter, setFilter] = useState('Tutti')
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, clipPath: 'inset(20% 20% 20% 20%)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power4.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%' } }
      )
    })
  }, [])

  const filtered = progetti.filter(p => filter === 'Tutti' || p.corso === filter)

  return (
    <main className="min-h-screen" style={{ background: '#050508' }}>
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative pt-48 pb-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div ref={titleRef} className="max-w-7xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Portfolio Studenti
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="font-display text-ivory"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
              Il talento non si racconta.
              <br />
              <span className="text-gold italic">Si mostra.</span>
            </h1>
            <p className="font-body text-silver/60 text-lg leading-relaxed max-w-md mb-2">
              I progetti dei nostri studenti parlano da soli. Ogni lavoro nasce da un brief reale, con feedback di docenti e aziende partner.
            </p>
          </div>
        </div>
      </div>

      {/* Filtri */}
      <div className="px-6 md:px-20 pb-0 border-b" style={{ borderColor: 'rgba(44,44,46,0.4)' }}>
        <div className="max-w-7xl mx-auto flex">
          {filtri.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-8 py-5 font-body uppercase transition-all duration-300"
              style={{
                fontSize: '0.65rem', letterSpacing: '0.2em',
                color: filter === f ? '#C9A227' : 'rgba(142,142,147,0.5)',
                borderBottom: filter === f ? '2px solid #C9A227' : '2px solid transparent',
                background: 'transparent',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Griglia masonry-style */}
      <div className="py-16 px-6 md:px-20" style={{ background: '#050508' }}>
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((p, i) => (
            <div
              key={`${p.titolo}-${i}`}
              ref={el => { if (el) cardsRef.current[i] = el }}
              className="relative overflow-hidden break-inside-avoid cursor-pointer group"
              style={{ opacity: 0 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={p.img} alt={p.titolo}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: hovered === i ? 'brightness(0.35) saturate(0.5)' : 'brightness(0.6) saturate(0.7)',
                  transition: 'transform 0.7s ease, filter 0.5s ease',
                  aspectRatio: i % 3 === 0 ? '4/5' : i % 3 === 1 ? '1/1' : '4/3',
                }} />

              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: p.colore }} />

              {/* Overlay hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500"
                style={{ opacity: hovered === i ? 1 : 0 }}>
                <div className="mb-2">
                  <span className="font-body uppercase text-xs" style={{ color: p.colore, letterSpacing: '0.2em' }}>
                    {p.corso} · {p.anno}
                  </span>
                </div>
                <h3 className="font-display text-ivory text-2xl mb-1" style={{ letterSpacing: '-0.01em' }}>
                  {p.titolo}
                </h3>
                <p className="font-body text-silver/60 text-sm">{p.studente}</p>
              </div>

              {/* Info sempre visibile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-500"
                style={{ opacity: hovered === i ? 0 : 1, background: 'linear-gradient(to top, rgba(5,5,8,0.8), transparent)' }}>
                <p className="font-body text-silver/50 text-xs uppercase tracking-widest">{p.corso}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-40 px-6 md:px-20 text-center border-t relative overflow-hidden"
        style={{ borderColor: 'rgba(44,44,46,0.3)', background: '#080810' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Il prossimo progetto
            <br />
            <span className="text-gold italic">potrebbe essere il tuo.</span>
          </h2>
          <p className="font-body text-silver/50 mb-12 text-lg">
            Candidati, supera il test e inizia a costruire il tuo portfolio.
          </p>
          <Link href="/ammissioni/test-ingresso"
            className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 30px rgba(201,162,39,0.3)' }}>
            Candidati ora
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}