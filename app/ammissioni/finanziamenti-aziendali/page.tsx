'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const tipi = [
  {
    tipo: 'TIPO A',
    titolo: 'Finanziamento Puro',
    colore: '#C9A227',
    desc: 'L\'azienda copre le tasse parzialmente o totalmente. Nessun obbligo contrattuale. L\'azienda "scommette" su di te per il futuro.',
    vantaggi: [
      'Nessun obbligo contrattuale',
      'Copertura parziale o totale',
      'L\'azienda crede in te',
      'Libertà totale post-laurea',
    ],
  },
  {
    tipo: 'TIPO B',
    titolo: 'Finanziamento con Ricerca',
    colore: '#1B4332',
    desc: 'L\'azienda copre le tasse e tu svolgi attività di ricerca per loro durante gli studi. 5-10h/settimana, compatibili con lo studio.',
    vantaggi: [
      'Tasse coperte',
      '5-10h/settimana di ricerca',
      'Progetti reali e pubblicazioni',
      'Mentorship diretta',
    ],
    popular: true,
  },
  {
    tipo: 'TIPO C',
    titolo: 'Finanziamento con Prelazione',
    colore: '#8B3A3A',
    desc: 'L\'azienda copre le tasse e al termine degli studi hai priorità di assunzione. Nessun obbligo di accettare, ma corsia preferenziale.',
    vantaggi: [
      'Tasse coperte',
      'Priorità di assunzione',
      'Nessun obbligo di accettare',
      'Corsia preferenziale garantita',
    ],
  },
]

const timeline = [
  { n: '01', t: 'Affronta il test', d: 'Ottieni un punteggio ≥70 al test d\'ingresso.' },
  { n: '02', t: 'Ricevi il dossier', d: 'Feedback dettagliato con i tuoi punti di forza.' },
  { n: '03', t: 'Dai il consenso', d: 'Scegli se condividere il dossier con le aziende.' },
  { n: '04', t: 'Le aziende valutano', d: 'Vedono il tuo potenziale e decidono se investire.' },
  { n: '05', t: 'Ricevi le offerte', d: 'Finanziamento parziale o totale in arrivo.' },
  { n: '06', t: 'Scegli e firma', d: 'Accetti i termini e inizi il tuo percorso.' },
]

const aziende = [
  'Ferrari', 'Lamborghini', 'Bulgari', 'Cartier', 'Foster + Partners',
  'Zaha Hadid', 'Pininfarina', 'Maserati', 'Van Cleef & Arpels', 'Pagani',
  'Renzo Piano', 'Pomellato', 'BMW Designworks', 'Rolls-Royce', 'Chopard',
  'Stefano Boeri', 'McLaren', 'Graff', 'Harry Winston', 'Heatherwick',
]

const testimonianze = [
  {
    nome: 'Lorenzo B.',
    corso: 'Automotive Design',
    azienda: 'Pininfarina',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    testo: 'Quando ho visto l\'email di Pininfarina non ci credevo. Pensavo fosse uno spam. Invece era una proposta reale di finanziamento totale.',
  },
  {
    nome: 'Alessia M.',
    corso: 'Gioielleria',
    azienda: 'Bulgari',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    testo: 'Il Tipo B con Bulgari è stato il miglior investimento della mia vita. Ho lavorato su progetti reali mentre studiavo.',
  },
]

export default function FinanziamentiPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const tipiRef = useRef<HTMLDivElement[]>([])
  const timelineRef = useRef<HTMLDivElement[]>([])
  const aziendeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )

    tipiRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })

    timelineRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      )
    })

    // Carousel aziende
    if (aziendeRef.current) {
      const totalWidth = aziendeRef.current.scrollWidth / 2
      gsap.to(aziendeRef.current, {
        x: -totalWidth,
        duration: 25,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => {
            const n = parseFloat(x.toString())
            return ((n % totalWidth) - totalWidth) % -totalWidth
          })
        }
      })
    }
  }, [])

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative min-h-screen flex items-end pb-32 overflow-hidden px-6 md:px-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Finanziamenti"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.5)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0A0A 30%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0A0A0A 0%, transparent 60%)' }} />
        </div>

        <div ref={titleRef} className="relative z-10 max-w-5xl" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Finanziamenti Aziendali
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Le aziende migliori
            <br />
            investono sui
            <br />
            <span className="text-gold italic">talenti migliori.</span>
          </h1>
          <p className="font-body text-silver text-xl leading-relaxed max-w-2xl">
            Se il tuo dossier le convince, pagano loro. Nessuno scherzo.
          </p>
        </div>
      </div>

      {/* Come funziona — timeline */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke bg-noir">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Il processo
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Come funziona.
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {timeline.map((t, i) => (
              <div
                key={i}
                ref={el => { if (el) timelineRef.current[i] = el }}
                className="flex items-start gap-8 py-8 border-b border-smoke group"
                style={{ opacity: 0 }}
              >
                <div className="shrink-0 w-16">
                  <span className="font-display text-gold/20 group-hover:text-gold/50 transition-colors duration-300"
                    style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                    {t.n}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-gold/30 group-hover:bg-gold group-hover:w-16 transition-all duration-500" />
                    <h3 className="font-display text-ivory text-xl group-hover:text-gold transition-colors duration-300"
                      style={{ letterSpacing: '-0.01em' }}>
                      {t.t}
                    </h3>
                  </div>
                  <p className="font-body text-silver/60 text-sm leading-relaxed">{t.d}</p>
                </div>
                {i < timeline.length - 1 && (
                  <ArrowRight size={16} className="text-gold/20 group-hover:text-gold transition-colors duration-300 mt-2 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tipi di finanziamento */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke"
        style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0A0A0A 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Le opzioni
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Tre tipi di finanziamento.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tipi.map((t, i) => (
              <div
                key={i}
                ref={el => { if (el) tipiRef.current[i] = el }}
                className="relative border p-10 hover:border-gold/30 transition-colors duration-500 group"
                style={{ opacity: 0, borderColor: t.popular ? t.colore : 'rgba(44,44,46,1)' }}
              >
                {t.popular && (
                  <div className="absolute -top-3 left-8 px-4 py-1 font-body uppercase text-ivory"
                    style={{ fontSize: '0.5rem', letterSpacing: '0.2em', background: t.colore }}>
                    Più comune
                  </div>
                )}
                <div className="h-1 w-full mb-8 -mx-0" style={{ background: t.colore, marginLeft: '-2.5rem', marginRight: '-2.5rem', width: 'calc(100% + 5rem)' }} />

                <span className="font-body uppercase block mb-2" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: t.colore }}>
                  {t.tipo}
                </span>
                <h3 className="font-display text-ivory text-2xl mb-6 group-hover:text-gold transition-colors duration-300"
                  style={{ letterSpacing: '-0.01em' }}>
                  {t.titolo}
                </h3>
                <p className="font-body text-silver/60 text-sm leading-relaxed mb-8">{t.desc}</p>

                <div className="flex flex-col gap-3">
                  {t.vantaggi.map((v, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check size={13} style={{ color: t.colore }} className="shrink-0" />
                      <span className="font-body text-silver/70 text-sm">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aziende che finanziano */}
      <div className="py-24 border-t border-smoke bg-noir overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20 mb-12">
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            Chi finanzia
          </span>
          <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw', letterSpacing: '-0.02em' }}>
            Le aziende che investono.
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div ref={aziendeRef} className="flex gap-8 w-max">
            {[...aziende, ...aziende].map((az, i) => (
              <div key={i} className="px-6 py-3 border border-smoke/50 hover:border-gold/40 transition-colors duration-300 whitespace-nowrap cursor-default">
                <span className="font-body text-silver/50 hover:text-gold transition-colors duration-300"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  {az}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonianze */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke bg-noir">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Storie reali
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw', letterSpacing: '-0.02em' }}>
              Chi ce l'ha fatta.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonianze.map((t, i) => (
              <div key={i} className="border border-smoke p-10 hover:border-gold/20 transition-colors duration-500 group">
                <div className="font-display text-gold/30 text-6xl mb-4 group-hover:text-gold/50 transition-colors duration-300">"</div>
                <p className="font-display text-ivory/80 italic mb-8 leading-relaxed"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.01em' }}>
                  {t.testo}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-smoke/50">
                  <img src={t.img} alt={t.nome} className="w-12 h-12 rounded-full object-cover"
                    style={{ border: '1px solid rgba(201,162,39,0.3)' }} />
                  <div>
                    <p className="font-body text-ivory text-sm font-medium">{t.nome}</p>
                    <p className="font-body text-silver/40 text-xs">{t.corso} · Finanziato da {t.azienda}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-48 px-6 md:px-20 text-center border-t border-smoke relative overflow-hidden bg-noir">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw', letterSpacing: '-0.02em' }}>
            Il primo passo è il test.
            <br />
            <span className="text-gold italic">Tutto parte da lì.</span>
          </h2>
          <p className="font-body text-silver/60 mb-14 text-lg">
            Un punteggio ≥70 apre le porte ai finanziamenti aziendali.
          </p>
          <Link href="/ammissioni/test-ingresso"
            className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105">
            Prenota il test — €150
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}