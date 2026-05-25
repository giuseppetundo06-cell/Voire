'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { Check, Star, Building2, GraduationCap, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const piani = [
  {
    corso: 'Architettura',
    colore: '#1B4332',
    durata_standard: '5 anni',
    durata_accelerato: '3 anni',
    prezzo_standard: 12000,
    prezzo_accelerato: 15000,
    cfu: 300,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    corso: 'Automotive Design',
    colore: '#8B3A3A',
    durata_standard: '3 anni',
    durata_accelerato: '2 anni',
    prezzo_standard: 12000,
    prezzo_accelerato: 15000,
    cfu: 180,
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  },
  {
    corso: 'Gioielleria',
    colore: '#C9A227',
    durata_standard: '3 anni',
    durata_accelerato: '2 anni',
    prezzo_standard: 12000,
    prezzo_accelerato: 15000,
    cfu: 180,
    img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
  },
]

const finanziamenti = [
  {
    icon: GraduationCap,
    tipo: 'Borsa di Merito',
    sottotitolo: 'Per chi non può permetterselo ma vale.',
    copertura: 'Fino al 100%',
    colore: '#C9A227',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    requisiti: [
      'ISEE inferiore a €30.000',
      'Punteggio test ≥ 70/100',
      'Nessun obbligo post-laurea',
      'Rinnovabile ogni anno per merito',
    ],
    desc: 'Non importa da dove vieni o quanto hai in banca. Se sei abbastanza bravo, Voire ti porta fino in fondo. La borsa copre le tasse e si rinnova anno per anno, purché il rendimento lo giustifichi.',
  },
  {
    icon: Building2,
    tipo: 'Finanziamento Aziendale',
    sottotitolo: 'Le aziende investono sui migliori.',
    copertura: 'Fino al 100%',
    colore: '#1B4332',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    requisiti: [
      'Punteggio test ≥ 85/100',
      'Consenso alla condivisione dossier',
      'Possibile attività di ricerca 5-10h/sett',
      'Nessun obbligo contrattuale (Tipo A)',
    ],
    desc: 'Con un punteggio ≥85 il tuo dossier viene condiviso con le aziende partner. Possono offrirti copertura totale delle tasse — in cambio di nulla, oppure di attività di ricerca settimanale sui loro progetti reali. Tu scegli.',
  },
  {
    icon: Zap,
    tipo: 'Rate Flessibili',
    sottotitolo: 'Per chi vuole piena libertà.',
    copertura: 'Piano su misura',
    colore: '#8B3A3A',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    requisiti: [
      'Disponibile per tutti gli studenti',
      '10 o 12 rate mensili',
      'Zero interessi',
      'Attivabile in qualsiasi momento',
    ],
    desc: 'Nessuna pressione. Rateizza le tasse annuali in 10 o 12 rate mensili senza interessi. Puoi cambiare piano in qualsiasi momento durante l\'anno accademico.',
  },
]

export default function TassePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const pianiRef = useRef<HTMLDivElement[]>([])
  const finCardsRef = useRef<HTMLDivElement[]>([])
  const meritRef = useRef<HTMLDivElement>(null)
  const [selectedPiano, setSelectedPiano] = useState<'standard' | 'accelerato'>('standard')
  const [hoveredFin, setHoveredFin] = useState<number | null>(null)

  useEffect(() => {
    // Hero parallax
    const heroImg = heroRef.current?.querySelector('.hero-img')
if (heroImg) gsap.to(heroImg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Titolo hero
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.3 }
    )

    // Piani
    pianiRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 1.0, ease: 'power4.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })

    // Sezione merito
    gsap.fromTo(meritRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: meritRef.current, start: 'top 80%' }
      }
    )

    // Cards finanziamenti
    finCardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      )
    })
  }, [])

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero cinematografico */}
      <div ref={heroRef} className="relative min-h-screen flex items-end pb-32 overflow-hidden px-6 md:px-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="hero-img w-full h-[120%] object-cover -top-[10%] absolute"
            src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1920&q=80"
            alt="Tasse e costi"
            style={{ filter: 'brightness(0.25) saturate(0.6)' }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, #0A0A0A 25%, rgba(10,10,10,0.5) 70%, transparent 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #0A0A0A 0%, transparent 60%)',
          }} />
          {/* Orb dorato */}
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)' }} />
        </div>

        <div ref={titleRef} className="relative z-10 max-w-5xl" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Tasse e costi
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Trasparenza totale.
            <br />
            <span className="text-gold italic">Nessuna sorpresa.</span>
          </h1>
          <div className="h-px w-full max-w-2xl bg-gradient-to-r from-gold to-transparent mb-8" />
          <p className="font-body text-silver text-xl leading-relaxed max-w-2xl">
            €12.000 annui per tutti i corsi. Nessun costo nascosto. E se hai il talento giusto — potresti non pagare nulla.
          </p>

          {/* Quick stats */}
          <div className="flex gap-12 mt-12">
            {[
              { val: '€12.000', label: 'Tasse annue' },
              { val: '€150', label: 'Test (rimborsabile)' },
              { val: '0€', label: 'Se hai punteggio ≥85' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-gold text-3xl mb-1" style={{ letterSpacing: '-0.02em' }}>{s.val}</div>
                <div className="font-body text-silver/50 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle e piani */}
      <div className="py-32 px-6 md:px-20 border-t border-smoke bg-noir">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
                I piani
              </span>
              <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
                Scegli il tuo percorso.
              </h2>
            </div>
            <div className="flex items-center gap-0 border border-smoke w-fit">
              {(['standard', 'accelerato'] as const).map((p) => (
                <button key={p} onClick={() => setSelectedPiano(p)}
                  className="px-10 py-4 font-body uppercase transition-all duration-300"
                  style={{
                    fontSize: '0.65rem', letterSpacing: '0.2em',
                    color: selectedPiano === p ? '#0A0A0A' : '#8E8E93',
                    background: selectedPiano === p ? '#C9A227' : 'transparent',
                  }}>
                  Piano {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {piani.map((p, i) => (
              <div
                key={p.corso}
                ref={el => { if (el) pianiRef.current[i] = el }}
                className="relative overflow-hidden group cursor-default"
                style={{ opacity: 0 }}
              >
                {/* Immagine */}
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img src={p.img} alt={p.corso}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.5) saturate(0.7)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.9))' }} />
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.colore }} />
                  <div className="absolute bottom-4 left-6">
                    <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: p.colore }}>
                      {p.corso}
                    </span>
                  </div>
                </div>

                {/* Contenuto */}
                <div className="border border-t-0 border-smoke p-8 group-hover:border-gold/20 transition-colors duration-500">
                  <h3 className="font-display text-ivory text-xl mb-2" style={{ letterSpacing: '-0.01em' }}>
                    {p.cfu} CFU · {selectedPiano === 'standard' ? p.durata_standard : p.durata_accelerato}
                  </h3>

                  <div className="mb-8 pb-6 border-b border-smoke">
                    <div className="font-display text-gold" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}>
                      €{(selectedPiano === 'standard' ? p.prezzo_standard : p.prezzo_accelerato).toLocaleString()}
                    </div>
                    <p className="font-body text-silver/40 text-sm">all'anno · tutto incluso</p>
                  </div>

                  {[
                    'Lezioni online illimitate',
                    'Revisioni con i docenti',
                    'Tirocinio ogni semestre',
                    'Accesso Arena',
                    'Portfolio certificato',
                  ].map((item, j) => (
                    <div key={j} className="flex items-center gap-3 mb-3">
                      <Check size={13} style={{ color: p.colore }} className="shrink-0" />
                      <span className="font-body text-silver/60 text-sm">{item}</span>
                    </div>
                  ))}

                  <Link href="/ammissioni/test-ingresso"
                    className="block text-center font-body uppercase tracking-widest text-xs py-4 mt-8 transition-all duration-300 hover:opacity-80"
                    style={{
                      background: p.colore,
                      color: p.colore === '#C9A227' ? '#0A0A0A' : '#FAF9F6',
                    }}>
                    Candidati
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test d'ingresso nota */}
      <div className="py-10 px-6 md:px-20 border-y border-smoke"
        style={{ background: 'linear-gradient(to right, #0A0A0A, #1C1C1E, #0A0A0A)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-12 w-px bg-gold" />
            <div>
              <h3 className="font-display text-ivory text-xl" style={{ letterSpacing: '-0.01em' }}>
                Test d'ingresso — <span className="text-gold">€150</span>
              </h3>
              <p className="font-body text-silver/50 text-sm mt-1">Rimborsabile al 100% in caso di iscrizione.</p>
            </div>
          </div>
          <Link href="/ammissioni/test-ingresso"
            className="font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 whitespace-nowrap">
            Prenota il test
          </Link>
        </div>
      </div>

      {/* Sezione merito — statement */}
      <div ref={meritRef} className="py-48 px-6 md:px-20 relative overflow-hidden" style={{ opacity: 0 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
            alt="Merito"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.15) saturate(0.5)' }}
          />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,39,0.08) 0%, transparent 70%)',
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-2"
            style={{ border: '1px solid rgba(201,162,39,0.3)', background: 'rgba(201,162,39,0.05)' }}>
            <Star size={12} className="text-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>
              Il principio Voire
            </span>
          </div>

          <h2 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
            Il merito
            <br />
            <span className="text-gold italic">non ha prezzo.</span>
          </h2>

          <p className="font-body text-silver/70 text-xl leading-relaxed max-w-2xl mx-auto">
            Se hai il talento e la determinazione ma non le risorse economiche, Voire trova un modo. Sempre.
            <br /><br />
            <span className="text-ivory/90">Le borse di studio esistono per chi dimostra di valere indipendentemente dal conto in banca.</span>
          </p>
        </div>
      </div>

      {/* Finanziamenti cards grandi */}
      <div className="py-40 px-6 md:px-20 bg-noir">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Riduci o azzera i costi
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw', letterSpacing: '-0.02em' }}>
              Il merito non ha prezzo.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {finanziamenti.map((f, i) => {
              const Icon = f.icon
              const isHovered = hoveredFin === i
              return (
                <div
                  key={i}
                  ref={el => { if (el) finCardsRef.current[i] = el }}
                  className="relative overflow-hidden cursor-default transition-all duration-500"
                  style={{
                    opacity: 0,
                    border: `1px solid ${isHovered ? f.colore : 'rgba(44,44,46,0.8)'}`,
                    boxShadow: isHovered ? `0 0 40px ${f.colore}15` : 'none',
                  }}
                  onMouseEnter={() => setHoveredFin(i)}
                  onMouseLeave={() => setHoveredFin(null)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Immagine */}
                    <div className="relative md:w-80 shrink-0 overflow-hidden" style={{ minHeight: '280px' }}>
                      <img src={f.img} alt={f.tipo}
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700"
                        style={{
                          filter: 'brightness(0.5) saturate(0.6)',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        }} />
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(to right, transparent 0%, rgba(10,10,10,0.7) 80%, rgba(10,10,10,1) 100%)',
                      }} />
                      <div className="absolute top-0 left-0 bottom-0 w-1" style={{ background: f.colore }} />

                      {/* Icon */}
                      <div className="absolute bottom-8 left-8">
                        <div className="w-14 h-14 flex items-center justify-center"
                          style={{ background: `${f.colore}20`, border: `2px solid ${f.colore}60` }}>
                          <Icon size={24} style={{ color: f.colore }} />
                        </div>
                      </div>
                    </div>

                    {/* Contenuto */}
                    <div className="flex-1 p-10">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span className="font-body uppercase block mb-2" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: f.colore }}>
                            {f.tipo}
                          </span>
                          <h3 className="font-display text-ivory text-2xl transition-colors duration-300"
                            style={{ letterSpacing: '-0.01em', color: isHovered ? f.colore : '#FAF9F6' }}>
                            {f.sottotitolo}
                          </h3>
                        </div>
                        <div className="text-right shrink-0 ml-8">
                          <div className="font-body uppercase mb-1" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: f.colore }}>
                            Copertura
                          </div>
                          <div className="font-display text-gold text-2xl" style={{ letterSpacing: '-0.02em' }}>
                            {f.copertura}
                          </div>
                        </div>
                      </div>

                      <p className="font-body text-silver/60 text-sm leading-relaxed mb-8 max-w-xl">
                        {f.desc}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {f.requisiti.map((req, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <Check size={13} style={{ color: f.colore }} className="shrink-0 mt-0.5" />
                            <span className="font-body text-silver/60 text-xs">{req}</span>
                          </div>
                        ))}
                      </div>

                      {/* Highlight speciale per finanziamento aziendale */}
                      {f.tipo === 'Finanziamento Aziendale' && (
                        <div className="mt-8 p-5 border"
                          style={{ borderColor: `${f.colore}30`, background: `${f.colore}05` }}>
                          <p className="font-body text-sm leading-relaxed" style={{ color: f.colore }}>
                            ⚡ Con punteggio ≥85 il tuo dossier viene condiviso con Ferrari, Bulgari, Pininfarina e le altre 97 aziende partner. Alcune potrebbero finanziarti completamente in cambio di attività di ricerca sui loro progetti reali — 5/10 ore a settimana, compatibili con lo studio.
                          </p>
                        </div>
                      )}

                      {/* Highlight ISEE per borsa */}
                      {f.tipo === 'Borsa di Merito' && (
                        <div className="mt-8 p-5 border"
                          style={{ borderColor: `${f.colore}30`, background: `${f.colore}05` }}>
                          <p className="font-body text-sm leading-relaxed" style={{ color: f.colore }}>
                            🎓 La borsa è riservata a studenti con ISEE inferiore a €30.000 che dimostrano eccellenza al test d'ingresso. Non è un sussidio — è un riconoscimento. Si guadagna con il merito, non si chiede.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* FAQ costi */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke"
        style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0A0A0A 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-ivory mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            Domande sui costi
          </h2>
          <div className="flex flex-col gap-0">
            {[
              { q: 'Si paga tutto subito?', a: 'No. Le tasse si pagano anno per anno. Puoi rateizzare in 10 o 12 rate mensili senza interessi.' },
              { q: 'Come si richiede la borsa di studio?', a: 'Non si richiede. Si guadagna. Se hai ISEE ≤€30.000 e punteggio ≥70 al test, vieni automaticamente valutato per le borse disponibili.' },
              { q: 'Sono obbligato ad accettare un finanziamento aziendale?', a: 'No. La condivisione del dossier con le aziende richiede il tuo consenso esplicito. Puoi rifiutare qualsiasi offerta.' },
              { q: 'Le attività di ricerca per le aziende sono obbligatorie?', a: 'Solo nel Tipo B. In questo caso l\'azienda ti chiede 5-10 ore settimanali su progetti reali, compatibili con il piano di studi. Il Tipo A e C non prevedono obblighi.' },
              { q: 'Cosa succede se interrompo gli studi?', a: 'Paghi solo le rate già emesse. I crediti acquisiti rimangono validi per 5 anni.' },
            ].map((item, i) => (
              <div key={i} className="py-6 border-b border-smoke/50 group">
                <h4 className="font-body text-ivory text-sm mb-3 uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                  {item.q}
                </h4>
                <p className="font-body text-silver/50 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA finale */}
      <div className="py-48 px-6 md:px-20 text-center relative overflow-hidden bg-noir border-t border-smoke">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            Il tuo talento
            <br />
            <span className="text-gold italic">vale più di €12.000.</span>
          </h2>
          <p className="font-body text-silver/60 mb-14 text-lg">
            Fai il test. Scopri quanto vali. Lascia che siano gli altri a pagarti il percorso.
          </p>
          <Link href="/ammissioni/test-ingresso"
            className="inline-block font-body text-noir bg-gold px-16 py-6 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 40px rgba(201,162,39,0.3)' }}>
            Prenota il test — €150
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}