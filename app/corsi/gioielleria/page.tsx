'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Cursor from '@/components/ui/Cursor'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const semestri = [
  {
    numero: 1, anno: 1,
    materie: [
      { nome: 'Fondamenti di Design del Gioiello', cfu: 10, modo: 'Online + Revisioni' },
      { nome: 'Storia del Gioiello e delle Arti Decorative', cfu: 6, modo: 'Online' },
      { nome: 'Disegno Tecnico e Rendering a Mano', cfu: 8, modo: 'Online + Revisioni' },
      { nome: 'Gemmologia I: Pietre Preziose', cfu: 8, modo: 'Online' },
      { nome: 'Metallurgia per Oreficeria', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 1: Laboratorio orafo', cfu: 2, modo: 'Presenza' },
    ]
  },
  {
    numero: 2, anno: 1,
    materie: [
      { nome: 'Laboratorio di Design I: Anello e Bracciale', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Gemmologia II: Pietre Semipreziose e Perle', cfu: 6, modo: 'Online' },
      { nome: 'Tecniche di Oreficeria I', cfu: 6, modo: 'Online + Presenza' },
      { nome: 'CAD per Gioielleria (Rhino + Matrix)', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 2: Atelier alta gioielleria', cfu: 4, modo: 'Presenza' },
    ]
  },
  {
    numero: 3, anno: 2,
    materie: [
      { nome: 'Laboratorio di Design II: Collana e Parure', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Tecniche di Oreficeria II (Incastonatura)', cfu: 8, modo: 'Online + Presenza' },
      { nome: 'Prototipazione 3D e Stampa', cfu: 6, modo: 'Online' },
      { nome: 'Colorimetria e Abbinamenti', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 3: Maison internazionale', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 4, anno: 2,
    materie: [
      { nome: 'Laboratorio di Design III: Haute Joaillerie', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Tecniche di Oreficeria III (Smalti, Micromosaico)', cfu: 6, modo: 'Online + Presenza' },
      { nome: 'Fotografia di Gioiello', cfu: 4, modo: 'Online' },
      { nome: 'Trend Forecasting e Ricerca Creativa', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 4: Progetto capsule collection', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 5, anno: 3,
    materie: [
      { nome: 'Laboratorio di Design Finale I: Collezione Personale', cfu: 14, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Sostenibilità e Gioielleria Etica', cfu: 4, modo: 'Online' },
      { nome: 'Brand Building per Designer Indipendenti', cfu: 4, modo: 'Online' },
      { nome: 'Rendering Fotorealistico (KeyShot)', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 5: Progetto per brand reale', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 6, anno: 3,
    materie: [
      { nome: 'Laboratorio di Design Finale II', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Portfolio e Comunicazione', cfu: 4, modo: 'Online' },
      { nome: 'Business della Gioielleria', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 6: Pre-inserimento atelier', cfu: 6, modo: 'Presenza' },
      { nome: 'Tesi di Laurea', cfu: 8, modo: 'Presenza' },
    ]
  },
]

export default function GioielleriaPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [openSemestre, setOpenSemestre] = useState<number | null>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(imgRef.current,
      { clipPath: 'inset(0 0 0 100%)' },
      { clipPath: 'inset(0 0 0 0%)', duration: 1.6, ease: 'power4.inOut' }
    , 0)

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    , 0.6)

    tl.fromTo(infoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    , 1.2)

    const imgEl = imgRef.current?.querySelector('img')
    if (imgEl) gsap.to(imgEl, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, [])

  const toggleSemestre = (i: number) => {
    setOpenSemestre(openSemestre === i ? null : i)
  }

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <div ref={imgRef} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=80"
            alt="Gioielleria"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(0.8)', transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-20 pb-24">
          <div ref={titleRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
                Laurea Triennale · 180 CFU · 3 anni
              </span>
            </div>
            <h1 className="font-display text-ivory mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.0', letterSpacing: '-0.03em' }}>
              Gioielleria
            </h1>
            <p className="font-body text-silver max-w-xl text-lg leading-relaxed">
              Dall'idea al gioiello finito. Un percorso unico che unisce cultura gemmologica, padronanza tecnica e visione creativa.
            </p>
          </div>

          <div ref={infoRef} className="flex gap-6 mt-10" style={{ opacity: 0 }}>
            <Link href="#piano-studi"
              className="font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300">
              Piano di studi
            </Link>
            <Link href="#"
              className="font-body text-gold border border-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-gold/10 transition-all duration-300">
              Candidati ora
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-graphite border-y border-smoke px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '180', label: 'CFU Totali' },
            { val: '3', label: 'Anni (Standard)' },
            { val: '6', label: 'Tirocini' },
            { val: '€12.000', label: 'Tasse annue' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-gold mb-2" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}>
                {item.val}
              </div>
              <div className="font-body text-silver text-xs uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="piano-studi" className="px-6 md:px-20 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Il percorso
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Piano di studi
            </h2>
          </div>

          <div className="flex flex-col">
            {semestri.map((sem, i) => (
              <div key={i} className="border-b border-smoke">
                <button
                  onClick={() => toggleSemestre(i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-display text-gold/30 group-hover:text-gold/60 transition-colors duration-300"
                      style={{ fontSize: '2rem', lineHeight: 1 }}>
                      S{sem.numero}
                    </span>
                    <div>
                      <div className="font-body text-ivory text-sm uppercase tracking-widest">
                        Semestre {sem.numero}
                      </div>
                      <div className="font-body text-silver text-xs mt-1">
                        Anno {sem.anno} · {sem.materie.reduce((a, m) => a + m.cfu, 0)} CFU
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-gold transition-transform duration-300"
                    style={{ transform: openSemestre === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <div style={{
                  maxHeight: openSemestre === i ? '600px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div className="pb-6 flex flex-col gap-0">
                    {sem.materie.map((materia, j) => (
                      <div key={j} className="flex items-center justify-between py-4 border-t border-smoke/50 group/m">
                        <div className="flex items-center gap-4">
                          <div className="w-1 h-1 rounded-full bg-gold/40 group-hover/m:bg-gold transition-colors duration-300" />
                          <span className="font-body text-silver text-sm group-hover/m:text-ivory transition-colors duration-300">
                            {materia.nome}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <span className="font-body text-silver/50 text-xs hidden md:block">{materia.modo}</span>
                          <span className="font-body text-gold text-xs font-medium">{materia.cfu} CFU</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-20 py-32 text-center border-t border-smoke">
        <h2 className="font-display text-ivory mb-8"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
          Pronta a creare il tuo gioiello?
        </h2>
        <Link href="#"
          className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105">
          Affronta il Test d'Ingresso
        </Link>
      </div>

      <Footer />
    </main>
  )
}