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
      { nome: 'Fondamenti di Design del Veicolo', cfu: 10, modo: 'Online + Revisioni' },
      { nome: "Storia dell'Automobile e del Design Industriale", cfu: 6, modo: 'Online' },
      { nome: 'Sketching e Disegno a Mano Libera', cfu: 8, modo: 'Online + Revisioni' },
      { nome: 'Matematica e Geometria per il Design', cfu: 6, modo: 'Online' },
      { nome: "Materiali per l'Automotive", cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 1: Centro stile (osservazione)', cfu: 2, modo: 'Presenza' },
    ]
  },
  {
    numero: 2, anno: 1,
    materie: [
      { nome: 'Laboratorio di Design I: Concept Car', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Ergonomia e Human Factors', cfu: 6, modo: 'Online' },
      { nome: 'Modellazione Digitale I (Alias/Blender)', cfu: 8, modo: 'Online' },
      { nome: 'Color & Trim I', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 2: Carrozzeria artigianale', cfu: 4, modo: 'Presenza' },
    ]
  },
  {
    numero: 3, anno: 2,
    materie: [
      { nome: 'Laboratorio di Design II: Exterior Design', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Aerodinamica e Packaging', cfu: 6, modo: 'Online' },
      { nome: 'Modellazione Digitale II (Superfici Classe A)', cfu: 8, modo: 'Online' },
      { nome: 'Propulsioni e Powertrain (ICE, EV, Hydrogen)', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 3: OEM design center', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 4, anno: 2,
    materie: [
      { nome: 'Laboratorio di Design III: Interior Design', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'UX/UI per Automotive', cfu: 6, modo: 'Online' },
      { nome: 'Prototipazione Rapida e Clay Modeling', cfu: 6, modo: 'Online + Presenza' },
      { nome: 'Color & Trim II', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 4: Progetto concept OEM', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 5, anno: 3,
    materie: [
      { nome: 'Laboratorio di Design Finale I: Veicolo Completo', cfu: 14, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Design per la Mobilità Sostenibile', cfu: 6, modo: 'Online' },
      { nome: 'Brand Identity e Design Language', cfu: 4, modo: 'Online' },
      { nome: 'Rendering Fotorealistico (KeyShot/VRED)', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 5: Progetto autonomo per brand reale', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 6, anno: 3,
    materie: [
      { nome: 'Laboratorio di Design Finale II', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Portfolio e Presentazione Professionale', cfu: 4, modo: 'Online' },
      { nome: 'Business of Automotive', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 6: Pre-inserimento centro stile', cfu: 6, modo: 'Presenza' },
      { nome: 'Tesi di Laurea', cfu: 8, modo: 'Presenza' },
    ]
  },
]

export default function AutomotivePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [openSemestre, setOpenSemestre] = useState<number | null>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(imgRef.current,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'power4.inOut' }
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
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
            alt="Automotive Design"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(0.8)', transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-20 pb-24">
          <div ref={titleRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-mattone" />
              <span className="font-body uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#8B3A3A' }}>
                Laurea Triennale · 180 CFU · 3 anni
              </span>
            </div>
            <h1 className="font-display text-ivory mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.0', letterSpacing: '-0.03em' }}>
              Automotive<br />Design
            </h1>
            <p className="font-body text-silver max-w-xl text-lg leading-relaxed">
              Dal concept sketch alla superficie Classe A. Il percorso più avanzato per chi vuole disegnare le auto del futuro.
            </p>
          </div>

          <div ref={infoRef} className="flex gap-6 mt-10" style={{ opacity: 0 }}>
            <Link href="#piano-studi"
              className="font-body text-noir px-10 py-4 uppercase tracking-widest text-xs transition-all duration-300"
              style={{ background: '#8B3A3A' }}>
              Piano di studi
            </Link>
            <Link href="#"
              className="font-body text-ivory border px-10 py-4 uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300"
              style={{ borderColor: '#8B3A3A', color: '#8B3A3A' }}>
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
              <div className="font-display mb-2" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', color: '#8B3A3A' }}>
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
            <span className="font-body uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#8B3A3A' }}>
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
                    <span className="font-display group-hover:text-mattone transition-colors duration-300"
                      style={{ fontSize: '2rem', lineHeight: 1, color: 'rgba(139,58,58,0.3)' }}>
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
                    style={{ color: '#8B3A3A', transform: openSemestre === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
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
                          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(139,58,58,0.4)' }} />
                          <span className="font-body text-silver text-sm group-hover/m:text-ivory transition-colors duration-300">
                            {materia.nome}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <span className="font-body text-silver/50 text-xs hidden md:block">{materia.modo}</span>
                          <span className="font-body text-xs font-medium" style={{ color: '#8B3A3A' }}>{materia.cfu} CFU</span>
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
          Pronto a disegnare il futuro?
        </h2>
        <Link href="#"
          className="inline-block font-body text-ivory px-14 py-5 uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105"
          style={{ background: '#8B3A3A' }}>
          Affronta il Test d'Ingresso
        </Link>
      </div>

      <Footer />
    </main>
  )
}