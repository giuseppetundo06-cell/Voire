'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'

gsap.registerPlugin(ScrollTrigger)

const docenti = [
  {
    nome: 'Marco Ferretti',
    titolo: 'Head of Design — Pininfarina',
    corso: 'Automotive Design',
    bio: '22 anni in centri stile europei. Ha guidato il design di oltre 40 concept car per Ferrari, Maserati e BMW.',
    immagine: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    colore: '#8B3A3A',
    materie: ['Fondamenti di Design del Veicolo', 'Superfici Classe A', 'Rendering Fotorealistico'],
  },
  {
    nome: 'Sofia Conti',
    titolo: 'Senior Architect — Zaha Hadid Architects',
    corso: 'Architettura',
    bio: 'Laurea alla AA di Londra, 15 anni in studi internazionali. Specializzata in architettura parametrica.',
    immagine: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    colore: '#1B4332',
    materie: ['Laboratorio di Progettazione II', 'BIM e Modellazione Parametrica', 'Progettazione Sostenibile'],
  },
  {
    nome: 'Luca Bernardi',
    titolo: 'Creative Director — Bulgari',
    corso: 'Gioielleria',
    bio: 'Gemmologista certificato GIA. 18 anni nel luxury jewelry tra Roma, Parigi e Hong Kong.',
    immagine: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    colore: '#C9A227',
    materie: ['Laboratorio di Design III', 'Haute Joaillerie', 'Brand Building'],
  },
  {
    nome: 'Elena Marchetti',
    titolo: 'Partner — Foster + Partners',
    corso: 'Architettura',
    bio: 'Politecnico di Milano, Harvard GSD. Ha coordinato progetti in 12 paesi tra aeroporti, musei e torri.',
    immagine: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    colore: '#1B4332',
    materie: ['Progettazione Sostenibile', 'Urbanistica', 'Diritto Urbanistico'],
  },
  {
    nome: 'Paolo Ricci',
    titolo: 'Design Engineer — Ferrari',
    corso: 'Automotive Design',
    bio: 'IED Torino e Royal College of Art. 12 anni in Ferrari come design engineer.',
    immagine: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    colore: '#8B3A3A',
    materie: ['Aerodinamica e Packaging', 'Clay Modeling', 'Laboratorio Design II'],
  },
  {
    nome: 'Chiara Romano',
    titolo: 'Master Goldsmith — Cartier Paris',
    corso: 'Gioielleria',
    bio: 'Scuola Orafa Ambrosiana, 14 anni in Cartier. Esperta in incastonatura pavé e smalti.',
    immagine: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    colore: '#C9A227',
    materie: ['Tecniche di Oreficeria I-III', 'Incastonatura', 'Smalti e Micromosaico'],
  },
]

const filtri = ['Tutti', 'Architettura', 'Automotive Design', 'Gioielleria']

function DocCard({ doc, index }: { doc: typeof docenti[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: (index % 3) * 0.12,
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' }
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden cursor-default"
      style={{ opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Immagine */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={doc.immagine}
          alt={doc.nome}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            filter: hovered ? 'brightness(0.35) saturate(0.5)' : 'brightness(0.6) saturate(0.7)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.7s ease, filter 0.5s ease',
          }}
        />

        {/* Overlay gradiente fisso */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.5) 45%, transparent 100%)',
        }} />

        {/* Linea colore top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: doc.colore }} />

        {/* Badge corso */}
        <div className="absolute top-4 right-4 px-3 py-1 font-body uppercase"
          style={{
            fontSize: '0.5rem', letterSpacing: '0.2em',
            color: doc.colore,
            background: 'rgba(10,10,10,0.85)',
            border: `1px solid ${doc.colore}40`,
          }}>
          {doc.corso}
        </div>

        {/* Contenuto bottom — SEMPRE visibile */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-display text-ivory text-xl mb-1 transition-colors duration-300"
            style={{ letterSpacing: '-0.01em', color: hovered ? doc.colore : '#FAF9F6' }}>
            {doc.nome}
          </h3>
          <p className="font-body text-silver/60 text-xs mb-3">{doc.titolo}</p>

          {/* Bio — visibile sempre */}
          <p className="font-body text-silver/50 text-xs leading-relaxed transition-opacity duration-300"
            style={{ opacity: hovered ? 0 : 1 }}>
            {doc.bio}
          </p>

          {/* Materie — visibili solo su hover */}
          <div className="transition-all duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              position: hovered ? 'relative' : 'absolute',
              pointerEvents: hovered ? 'auto' : 'none',
            }}>
            <div className="pt-3 border-t" style={{ borderColor: `${doc.colore}30` }}>
              <p className="font-body uppercase mb-2" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: doc.colore }}>
                Materie insegnate
              </p>
              {doc.materie.map((m, j) => (
                <div key={j} className="flex items-center gap-2 mb-1.5">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: doc.colore }} />
                  <span className="font-body text-silver/70 text-xs">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DocentiPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('Tutti')

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )
  }, [])

  const filtered = docenti.filter(d => filter === 'Tutti' || d.corso === filter)

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative pt-48 pb-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div ref={titleRef} className="max-w-7xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              I docenti · 47 professionisti
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="font-display text-ivory"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
              Sai esattamente
              <br />
              <span className="text-gold italic">da chi impari.</span>
            </h1>
            <p className="font-body text-silver text-lg leading-relaxed max-w-md mb-2">
              Curriculum pubblici e verificabili. Tutti i nostri docenti hanno esperienze reali nelle aziende più importanti del settore.
            </p>
          </div>
        </div>
      </div>

      {/* Filtri */}
      <div className="px-6 md:px-20 pb-0 border-b border-smoke">
        <div className="max-w-7xl mx-auto flex">
          {filtri.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-8 py-5 font-body uppercase transition-all duration-300"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: filter === f ? '#C9A227' : '#8E8E93',
                borderBottom: filter === f ? '2px solid #C9A227' : '2px solid transparent',
                background: 'transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Griglia */}
      <div className="py-24 px-6 md:px-20 bg-noir">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc, i) => (
            <DocCard key={doc.nome} doc={doc} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke text-center relative overflow-hidden bg-noir">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Vuoi imparare da loro?
          </h2>
          <p className="font-body text-silver mb-12 text-lg">
            Il primo passo è superare il test d'ingresso.
          </p>
          <a href="/ammissioni/test-ingresso"
            className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105">
            Candidati ora
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}