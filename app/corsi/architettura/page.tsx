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
      { nome: 'Fondamenti di Progettazione Architettonica', cfu: 10, modo: 'Online + Revisioni' },
      { nome: 'Storia dell\'Architettura I (Antica e Medievale)', cfu: 8, modo: 'Online' },
      { nome: 'Matematica per l\'Architettura', cfu: 8, modo: 'Online' },
      { nome: 'Disegno e Rappresentazione I', cfu: 6, modo: 'Online + Revisioni' },
      { nome: 'Fisica Tecnica', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 1: Studio di architettura (osservazione)', cfu: 2, modo: 'Presenza' },
    ]
  },
  {
    numero: 2, anno: 1,
    materie: [
      { nome: 'Laboratorio di Progettazione I', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Storia dell\'Architettura II (Rinascimento e Barocco)', cfu: 6, modo: 'Online' },
      { nome: 'Tecnologia dei Materiali', cfu: 6, modo: 'Online' },
      { nome: 'CAD e Modellazione Digitale I', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 2: Cantiere edile', cfu: 4, modo: 'Presenza' },
    ]
  },
  {
    numero: 3, anno: 2,
    materie: [
      { nome: 'Laboratorio di Progettazione II', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Storia dell\'Architettura III (Moderna e Contemporanea)', cfu: 6, modo: 'Online' },
      { nome: 'Statica e Scienza delle Costruzioni', cfu: 8, modo: 'Online' },
      { nome: 'BIM e Modellazione Parametrica', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 3: Studio internazionale', cfu: 4, modo: 'Presenza' },
    ]
  },
  {
    numero: 4, anno: 2,
    materie: [
      { nome: 'Laboratorio di Progettazione III', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Impianti Tecnici', cfu: 6, modo: 'Online' },
      { nome: 'Urbanistica e Pianificazione Territoriale', cfu: 6, modo: 'Online' },
      { nome: 'Rendering e Visualizzazione', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 4: Progetto reale assistito', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 5, anno: 3,
    materie: [
      { nome: 'Progettazione Urbana e Paesaggio', cfu: 10, modo: 'Online + Revisioni' },
      { nome: 'Strutture Avanzate', cfu: 8, modo: 'Online' },
      { nome: 'Architettura Bioclimatica', cfu: 6, modo: 'Online' },
      { nome: 'Tecnologie Digitali Avanzate (Grasshopper, Rhino)', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 5: Progetto autonomo supervisionato', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 6, anno: 3,
    materie: [
      { nome: 'Laboratorio di Progettazione Avanzata I', cfu: 12, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Diritto Urbanistico ed Edilizio', cfu: 6, modo: 'Online' },
      { nome: 'Progettazione Sostenibile', cfu: 6, modo: 'Online' },
      { nome: 'Restauro e Conservazione', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 6: Studio di architettura internazionale', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 7, anno: 4,
    materie: [
      { nome: 'Laboratorio di Progettazione Avanzata II', cfu: 14, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Architettura degli Interni', cfu: 6, modo: 'Online' },
      { nome: 'Gestione del Cantiere e Sicurezza', cfu: 6, modo: 'Online' },
      { nome: 'Economia e Valutazione del Progetto', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 7: Progetto reale con responsabilità', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 8, anno: 4,
    materie: [
      { nome: 'Laboratorio di Sintesi Finale I', cfu: 14, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Teoria dell\'Architettura Contemporanea', cfu: 6, modo: 'Online' },
      { nome: 'Comunicazione del Progetto e Portfolio', cfu: 4, modo: 'Online' },
      { nome: 'Tirocinio 8: Pre-inserimento professionale', cfu: 6, modo: 'Presenza' },
    ]
  },
  {
    numero: 9, anno: 5,
    materie: [
      { nome: 'Laboratorio di Sintesi Finale II', cfu: 16, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Deontologia e Pratica Professionale', cfu: 6, modo: 'Online' },
      { nome: 'Tirocinio 9: Progetto autonomo certificato', cfu: 8, modo: 'Presenza' },
    ]
  },
  {
    numero: 10, anno: 5,
    materie: [
      { nome: 'Laboratorio di Tesi', cfu: 16, modo: 'Online + Revisioni + Esame presenza' },
      { nome: 'Seminario Internazionale', cfu: 4, modo: 'Presenza' },
      { nome: 'Tesi di Laurea Magistrale', cfu: 20, modo: 'Presenza' },
    ]
  },
]

export default function ArchitetturaPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [openSemestre, setOpenSemestre] = useState<number | null>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(imgRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power4.inOut' }
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
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
            alt="Architettura"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(0.7)', transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-20 pb-24">
          <div ref={titleRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-verdone" />
              <span className="font-body uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#1B4332' }}>
                Laurea Magistrale · 300 CFU · 5 anni
              </span>
            </div>
            <h1 className="font-display text-ivory mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.0', letterSpacing: '-0.03em' }}>
              Architettura
            </h1>
            <p className="font-body text-silver max-w-xl text-lg leading-relaxed">
              Dal progetto alla costruzione. Il percorso completo che forma i grandi architetti del futuro, con tirocini ogni semestre nei migliori studi internazionali.
            </p>
          </div>

          <div ref={infoRef} className="flex flex-wrap gap-4 mt-10" style={{ opacity: 0 }}>
            <Link href="#piano-studi"
              className="font-body text-ivory px-10 py-4 uppercase tracking-widest text-xs transition-all duration-300 hover:opacity-80"
              style={{ background: '#1B4332' }}>
              Piano di studi
            </Link>
            <Link href="#"
              className="font-body border px-10 py-4 uppercase tracking-widest text-xs hover:bg-white/5 transition-all duration-300"
              style={{ borderColor: '#1B4332', color: '#1B4332' }}>
              Candidati ora
            </Link>
          </div>
        </div>
      </div>

      {/* Numeri corso */}
      <div className="bg-graphite border-y border-smoke px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { val: '300', label: 'CFU Totali' },
            { val: '5', label: 'Anni (Standard)' },
            { val: '3', label: 'Anni (Accelerato)' },
            { val: '10', label: 'Tirocini' },
            { val: '€12.000', label: 'Tasse annue' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-display mb-2" style={{ fontSize: '2.2rem', letterSpacing: '-0.02em', color: '#1B4332' }}>
                {item.val}
              </div>
              <div className="font-body text-silver text-xs uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Piani */}
      <div className="px-6 md:px-20 py-16 bg-graphite/50 border-b border-smoke">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-smoke p-8">
            <div className="font-body text-silver uppercase mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>Piano Standard</div>
            <div className="font-display text-ivory text-3xl mb-3">5 anni</div>
            <p className="font-body text-silver text-sm leading-relaxed">300 CFU · 10 semestri · Ideale per chi parte da zero o vuole il massimo della formazione teorica e pratica.</p>
          </div>
          <div className="border p-8" style={{ borderColor: '#1B4332', background: 'rgba(27,67,50,0.05)' }}>
            <div className="font-body uppercase mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#1B4332' }}>Piano Accelerato</div>
            <div className="font-display text-ivory text-3xl mb-3">3 anni</div>
            <p className="font-body text-silver text-sm leading-relaxed">Per chi ha già un background tecnico. Stesse materie, focus su laboratori e tirocini, riduzione ore teoriche.</p>
          </div>
        </div>
      </div>

      {/* Piano di studi */}
      <div id="piano-studi" className="px-6 md:px-20 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="font-body uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#1B4332' }}>
              Il percorso
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Piano di studi — 5 anni
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
                    <span className="font-display transition-colors duration-300"
                      style={{ fontSize: '2rem', lineHeight: 1, color: openSemestre === i ? '#1B4332' : 'rgba(27,67,50,0.3)' }}>
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
                    style={{ color: '#1B4332', transform: openSemestre === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  />
                </button>

                <div style={{
                  maxHeight: openSemestre === i ? '800px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div className="pb-6 flex flex-col">
                    {sem.materie.map((materia, j) => (
                      <div key={j} className="flex items-center justify-between py-4 border-t border-smoke/50 group/m">
                        <div className="flex items-center gap-4">
                          <div className="w-1 h-1 rounded-full transition-colors duration-300"
                            style={{ background: 'rgba(27,67,50,0.5)' }} />
                          <span className="font-body text-silver text-sm group-hover/m:text-ivory transition-colors duration-300">
                            {materia.nome}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <span className="font-body text-silver/50 text-xs hidden md:block">{materia.modo}</span>
                          <span className="font-body text-xs font-medium" style={{ color: '#1B4332' }}>{materia.cfu} CFU</span>
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

      {/* CTA */}
      <div className="px-6 md:px-20 py-32 text-center border-t border-smoke">
        <h2 className="font-display text-ivory mb-8"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
          Pronto a costruire il futuro?
        </h2>
        <Link href="#"
          className="inline-block font-body text-ivory px-14 py-5 uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 hover:opacity-80"
          style={{ background: '#1B4332' }}>
          Affronta il Test d'Ingresso
        </Link>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  )
}