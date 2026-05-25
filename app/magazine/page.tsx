'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const articoli = [
  {
    categoria: 'Design',
    titolo: 'Come la sostenibilità sta ridefinendo l\'automotive del futuro',
    excerpt: 'Dal clay modeling all\'idrogeno: i centri stile dei grandi brand stanno rivoluzionando il processo creativo.',
    autore: 'Marco Ferretti',
    data: '15 Maggio 2026',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    colore: '#8B3A3A',
    featured: true,
  },
  {
    categoria: 'Architettura',
    titolo: 'Biomimicry: quando gli edifici imparano dalla natura',
    excerpt: 'Foster+Partners e Snøhetta stanno ridefinendo cosa significa costruire in armonia con l\'ecosistema.',
    autore: 'Sofia Conti',
    data: '10 Maggio 2026',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    colore: '#1B4332',
    featured: false,
  },
  {
    categoria: 'Gioielleria',
    titolo: 'L\'oro etico: la nuova frontiera della haute joaillerie',
    excerpt: 'Bulgari, Chopard e Tiffany hanno già convertito il 70% delle loro filiere. Gli altri sono in ritardo.',
    autore: 'Luca Bernardi',
    data: '5 Maggio 2026',
    img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
    colore: '#C9A227',
    featured: false,
  },
  {
    categoria: 'Carriera',
    titolo: 'Da studente a Ferrari in 18 mesi: la storia di Paolo',
    excerpt: 'Come un tirocinio al terzo semestre si è trasformato in un contratto a tempo indeterminato nel centro stile di Maranello.',
    autore: 'Redazione Voire',
    data: '28 Aprile 2026',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    colore: '#8B3A3A',
    featured: true,
  },
  {
    categoria: 'Design',
    titolo: 'Parametrico vs intuitivo: il grande dibattito del design contemporaneo',
    excerpt: 'Grasshopper e Rhino contro carta e matita. I docenti Voire si schierano.',
    autore: 'Elena Marchetti',
    data: '20 Aprile 2026',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    colore: '#1B4332',
    featured: false,
  },
  {
    categoria: 'Industria',
    titolo: 'I 10 centri stile più influenti del mondo nel 2026',
    excerpt: 'Una classifica che sorprende: non tutti sono dove ci si aspetta. E l\'Italia è più presente che mai.',
    autore: 'Redazione Voire',
    data: '15 Aprile 2026',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    colore: '#C9A227',
    featured: false,
  },
]

const categorie = ['Tutti', 'Design', 'Architettura', 'Gioielleria', 'Carriera', 'Industria']

export default function MagazinePage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [filter, setFilter] = useState('Tutti')
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )

    gsap.fromTo(featuredRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' } }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      )
    })
  }, [])

  const featured = articoli.filter(a => a.featured)
  const filtered = articoli.filter(a => !a.featured && (filter === 'Tutti' || a.categoria === filter))

  return (
    <main className="min-h-screen" style={{ background: '#050508' }}>
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative pt-48 pb-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />
        </div>

        <div ref={titleRef} className="max-w-7xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Magazine · Cultura del design
            </span>
          </div>
          <h1 className="font-display text-ivory"
            style={{ fontSize: 'clamp(3rem, 7vw', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Idee che
            <br />
            <span className="text-gold italic">muovono il mondo.</span>
          </h1>
        </div>
      </div>

      {/* Featured articles */}
      <div ref={featuredRef} className="px-6 md:px-20 pb-16" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((a, i) => (
            <div key={i} className="relative overflow-hidden group cursor-pointer"
              style={{ border: `1px solid ${a.colore}25` }}
              onMouseEnter={() => setHovered(-i - 1)}
              onMouseLeave={() => setHovered(null)}>
              <div className="relative overflow-hidden" style={{ height: '320px' }}>
                <img src={a.img} alt={a.titolo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.5) saturate(0.7)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.95), transparent)' }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: a.colore }} />
                <div className="absolute top-4 left-4 px-3 py-1 font-body uppercase"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: a.colore, background: 'rgba(5,5,8,0.8)', border: `1px solid ${a.colore}30` }}>
                  {a.categoria}
                </div>
              </div>
              <div className="p-8" style={{ background: 'rgba(8,8,16,0.95)' }}>
                <h3 className="font-display text-ivory text-xl mb-3 group-hover:text-gold transition-colors duration-300"
                  style={{ letterSpacing: '-0.01em' }}>
                  {a.titolo}
                </h3>
                <p className="font-body text-silver/50 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-silver/30 text-xs">{a.autore} · {a.data}</span>
                  <span className="font-body text-xs uppercase tracking-widest transition-colors duration-300"
                    style={{ color: a.colore }}>
                    Leggi →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtri e griglia */}
      <div className="px-6 md:px-20 border-t border-b" style={{ borderColor: 'rgba(44,44,46,0.3)' }}>
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {categorie.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className="px-6 py-5 font-body uppercase whitespace-nowrap transition-all duration-300"
              style={{
                fontSize: '0.6rem', letterSpacing: '0.2em',
                color: filter === c ? '#C9A227' : 'rgba(142,142,147,0.4)',
                borderBottom: filter === c ? '2px solid #C9A227' : '2px solid transparent',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="py-16 px-6 md:px-20" style={{ background: '#050508' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((a, i) => (
            <div
              key={i}
              ref={el => { if (el) cardsRef.current[i] = el }}
              className="relative overflow-hidden group cursor-pointer border transition-colors duration-500"
              style={{ opacity: 0, borderColor: 'rgba(44,44,46,0.4)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = a.colore + '40' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(44,44,46,0.4)' }}
            >
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <img src={a.img} alt={a.titolo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.5) saturate(0.7)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,16,1), transparent)' }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: a.colore }} />
                <div className="absolute top-3 left-4 px-2 py-0.5 font-body uppercase"
                  style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: a.colore, background: 'rgba(5,5,8,0.8)' }}>
                  {a.categoria}
                </div>
              </div>
              <div className="p-6" style={{ background: 'rgba(8,8,16,0.98)' }}>
                <h3 className="font-display text-ivory text-lg mb-2 group-hover:text-gold transition-colors duration-300"
                  style={{ letterSpacing: '-0.01em' }}>
                  {a.titolo}
                </h3>
                <p className="font-body text-silver/40 text-xs leading-relaxed mb-4">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-silver/20 text-xs">{a.data}</span>
                  <span className="font-body text-xs uppercase tracking-widest" style={{ color: a.colore }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-32 px-6 md:px-20 border-t text-center relative overflow-hidden"
        style={{ borderColor: 'rgba(44,44,46,0.3)', background: '#080810' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-ivory mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw', letterSpacing: '-0.02em' }}>
            Resta aggiornato.
          </h2>
          <p className="font-body text-silver/50 mb-8">Ogni settimana, le idee più interessanti del mondo del design.</p>
          <div className="flex gap-0">
            <input type="email" placeholder="La tua email"
              className="flex-1 border border-smoke/40 text-ivory px-5 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
              style={{ background: 'rgba(20,20,28,0.8)' }} />
            <button className="font-body text-noir bg-gold px-8 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300">
              Iscriviti
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}