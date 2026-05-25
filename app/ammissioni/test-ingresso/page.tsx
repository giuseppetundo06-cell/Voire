'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const fasi = [
  {
    numero: '01',
    titolo: 'Test Cognitivo e Attitudinale',
    durata: '90 minuti',
    modalita: 'Online, proctored',
    punteggio: '0–40 punti',
    colore: '#1B4332',
    descrizione: 'Ragionamento logico-spaziale, cultura visiva e storia del design, comprensione testi tecnici IT/EN.',
    dettagli: [
      'Ragionamento logico-spaziale (40%) — 20 quesiti su pattern, rotazioni, sequenze, visualizzazione 3D',
      'Cultura visiva e storia del design (30%) — 15 quesiti su movimenti artistici e designer iconici',
      'Comprensione testi tecnici IT/EN (30%) — 2 testi con 10 domande totali',
    ]
  },
  {
    numero: '02',
    titolo: 'Prova Pratica di Settore',
    durata: '5 giorni',
    modalita: 'Online, upload elaborato',
    punteggio: '0–40 punti',
    colore: '#8B3A3A',
    descrizione: 'Brief creativo assegnato al termine della Fase 1. Progetto pratico nel tuo settore di riferimento.',
    dettagli: [
      'Architettura: redesign di uno spazio esistente — planimetria, prospettiva, relazione progettuale',
      'Automotive: concept vehicle 2035 — 3 sketch, concept board A3, descrizione design language',
      'Gioielleria: un gioiello che racconta un\'emozione — moodboard, disegno tecnico, rendering',
    ]
  },
  {
    numero: '03',
    titolo: 'Colloquio Motivazionale',
    durata: '30 minuti',
    modalita: 'Videochiamata',
    punteggio: '0–20 punti',
    colore: '#C9A227',
    descrizione: '1 docente Voire + 1 rappresentante azienda partner. Presentazione, discussione elaborato, visione.',
    dettagli: [
      '10 min: presentazione del candidato e del proprio percorso',
      '10 min: discussione dell\'elaborato della Fase 2',
      '10 min: domande su motivazione, obiettivi e visione personale',
    ]
  },
]

const soglie = [
  {
    range: '85–100',
    titolo: 'Ammissione con Borsa Candidabile',
    badge: 'ORO',
    colore: '#C9A227',
    desc: 'Il dossier viene condiviso con le aziende partner. Priorità assoluta per finanziamenti aziendali.',
  },
  {
    range: '70–84',
    titolo: 'Ammissione Standard',
    badge: 'ARGENTO',
    colore: '#8E8E93',
    desc: 'Accesso a tutti i corsi e piani. Possibilità di borse dopo il primo semestre.',
  },
  {
    range: '<70',
    titolo: 'Non Ammesso',
    badge: 'NO',
    colore: '#8B3A3A',
    desc: 'Possibilità di ripetere dopo 6 mesi con feedback dettagliato su cosa migliorare.',
  },
]

const faq = [
  { q: 'Posso prepararmi?', a: 'Sì, ma non esistono "risposte giuste" — valutiamo il tuo modo di pensare, non le nozioni.' },
  { q: 'Cosa succede se non passo?', a: 'Puoi riprovare dopo 6 mesi, con feedback dettagliato su cosa migliorare.' },
  { q: 'Il colloquio è in italiano o inglese?', a: 'Scegli tu la lingua preferita. Valutiamo la comunicazione, non la lingua.' },
  { q: 'Le aziende vedono il mio dossier automaticamente?', a: 'Solo con il tuo consenso esplicito. Nessuna condivisione senza autorizzazione.' },
  { q: 'Posso fare il test se lavoro?', a: 'Sì, le sessioni serali sono disponibili ogni mese.' },
]

export default function TestIngressoPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const fasiRef = useRef<HTMLDivElement[]>([])
  const soglieRef = useRef<HTMLDivElement[]>([])
  const soglieSecRef = useRef<HTMLDivElement>(null)
  const calendRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heroImg = heroRef.current?.querySelector('.hero-img')
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 80, filter: 'blur(20px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out', delay: 0.3 }
    )

    fasiRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' } }
      )
    })

    soglieRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: soglieSecRef.current, start: 'top 80%' } }
      )
    })

    gsap.fromTo(calendRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: calendRef.current, start: 'top 85%' } }
    )

    gsap.fromTo(faqRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: faqRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <main className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <Cursor />
      <Header />

      {/* HERO */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img className="hero-img absolute w-full h-[120%] object-cover -top-[10%]"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
            alt=""
            style={{ filter: 'brightness(0.3) saturate(0.6)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.7) 80%, #0A0A0A 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,39,0.12) 0%, transparent 70%)'
          }} />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        {[
          { pos: 'top-8 left-8', d: 'M0 20 L0 0 L20 0' },
          { pos: 'top-8 right-8', d: 'M40 20 L40 0 L20 0' },
          { pos: 'bottom-8 left-8', d: 'M0 20 L0 40 L20 40' },
          { pos: 'bottom-8 right-8', d: 'M40 20 L40 40 L20 40' },
        ].map(({ pos, d }, i) => (
          <div key={i} className={`absolute ${pos} pointer-events-none`} style={{ zIndex: 2 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d={d} stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" />
            </svg>
          </div>
        ))}

        <div ref={titleRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-4 mb-10">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Ammissioni · Test d'Ingresso
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h1 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '1.05', letterSpacing: '-0.02em', textShadow: '0 0 80px rgba(201,162,39,0.25)' }}>
            Non è un esame.
            <br />
            <span className="text-gold italic">È una sfida.</span>
          </h1>
          <p className="font-body text-silver/70 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Il test d'ingresso Voire misura il tuo potenziale, non solo le tue conoscenze. Ed è il primo passo per essere notato da noi e dalle aziende.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#fasi"
              className="font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 20px rgba(201,162,39,0.3)' }}>
              Scopri le fasi
            </Link>
            <Link href="#prenota"
              className="font-body text-gold border border-gold/50 px-10 py-4 uppercase tracking-widest text-xs hover:bg-gold/10 transition-all duration-300">
              Prenota il test — €150
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 5 }}>
          <span className="font-body text-gold/40 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.3em' }}>Scorri</span>
          <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(201,162,39,0.2)' }}>
            <div className="w-full h-full bg-gold" style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* LE 3 FASI */}
      <div id="fasi" className="py-40 px-6 md:px-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>

        {/* Immagine sfumata destra */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
          <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=70"
            alt="" className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(0.5)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.8) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Il percorso
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Le 3 fasi del test
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {fasi.map((fase, i) => (
              <div
                key={i}
                ref={el => { if (el) fasiRef.current[i] = el }}
                className="relative flex flex-col md:flex-row gap-0 border-b py-16 group"
                style={{ opacity: 0, borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div className="md:w-32 shrink-0 flex items-start">
                  <span className="font-display transition-opacity duration-300 group-hover:opacity-50"
                    style={{ fontSize: '5rem', lineHeight: 1, color: fase.colore, opacity: 0.25 }}>
                    {fase.numero}
                  </span>
                </div>

                <div className="flex-1 flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <div className="h-px w-12 mb-6 group-hover:w-20 transition-all duration-500"
                      style={{ background: fase.colore }} />
                    <h3 className="font-display text-ivory text-2xl mb-4 group-hover:text-gold transition-colors duration-300"
                      style={{ letterSpacing: '-0.01em' }}>
                      {fase.titolo}
                    </h3>
                    <p className="font-body text-silver/60 text-sm leading-relaxed mb-6">
                      {fase.descrizione}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {fase.dettagli.map((d, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: fase.colore }} />
                          <span className="font-body text-silver/50 text-xs leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:w-56 flex flex-col gap-4 shrink-0">
                    {[
                      { label: 'Durata', val: fase.durata },
                      { label: 'Modalità', val: fase.modalita },
                      { label: 'Punteggio', val: fase.punteggio },
                    ].map((item, j) => (
                      <div key={j} className="border-l-2 pl-4" style={{ borderColor: fase.colore }}>
                        <div className="font-body text-silver/40 uppercase mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                          {item.label}
                        </div>
                        <div className="font-body text-ivory text-sm">{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PUNTEGGI E SOGLIE */}
      <div ref={soglieSecRef} className="py-40 px-6 md:px-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>

        {/* Immagine sfumata sinistra */}
        <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none overflow-hidden">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=70"
            alt="" className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(0.5)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to left, #0A0A0A 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.8) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)'
          }} />
        </div>

        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              I risultati
            </span>
            <h2 className="font-display text-ivory mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Punteggio e soglie
            </h2>
            <p className="font-body text-silver/50 max-w-xl mx-auto">
              Il tuo punteggio determina non solo l'ammissione, ma anche le opportunità che si aprono.
            </p>
          </div>

          <div className="flex flex-col">
            {soglie.map((s, i) => (
              <div
                key={i}
                ref={el => { if (el) soglieRef.current[i] = el }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 py-12 border-b group transition-all duration-300 hover:pl-6 cursor-default"
                style={{ opacity: 0, borderColor: 'rgba(255,255,255,0.06)' }}
              >
                {/* Range */}
                <div className="shrink-0 w-40">
                  <span className="font-display"
                    style={{
                      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                      letterSpacing: '-0.03em',
                      color: s.colore,
                      lineHeight: 1,
                      textShadow: `0 0 30px ${s.colore}50`,
                    }}>
                    {s.range}
                  </span>
                </div>

                {/* Linea verticale */}
                <div className="hidden md:block w-px h-12 shrink-0 transition-all duration-300 group-hover:h-16"
                  style={{ background: `linear-gradient(to bottom, ${s.colore}, transparent)` }} />

                {/* Contenuto */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-body uppercase px-3 py-1"
                      style={{
                        fontSize: '0.55rem', letterSpacing: '0.2em',
                        color: s.colore,
                        border: `1px solid ${s.colore}40`,
                        background: `${s.colore}12`,
                      }}>
                      {s.badge}
                    </span>
                    <h3 className="font-display text-ivory text-xl group-hover:text-gold transition-colors duration-300"
                      style={{ letterSpacing: '-0.01em' }}>
                      {s.titolo}
                    </h3>
                  </div>
                  <p className="font-body text-silver/50 text-sm leading-relaxed">{s.desc}</p>
                </div>

                {/* Freccia */}
                <div className="shrink-0 text-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-2"
                  style={{ color: s.colore }}>
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CALENDARIO */}
      <div ref={calendRef} id="prenota" className="py-40 px-6 md:px-20 relative overflow-hidden"
        style={{ opacity: 0, background: '#0A0A0A' }}>

        {/* Immagine sfumata destra */}
        <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none overflow-hidden">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=70"
            alt="" className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.5)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.7) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 15%, transparent 85%, #0A0A0A 100%)'
          }} />
        </div>

        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            Prossime sessioni
          </span>
          <h2 className="font-display text-ivory mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Quando vuoi. Dove vuoi.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              { mese: 'Giugno 2026', num: 1 },
              { mese: 'Luglio 2026', num: 2 },
              { mese: 'Settembre 2026', num: 3 },
            ].map((s, i) => (
              <div key={i}
                className="group border py-10 px-6 hover:border-gold transition-all duration-300 cursor-pointer relative overflow-hidden"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="font-body text-gold/60 uppercase mb-3" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                  Sessione {s.num}
                </div>
                <div className="font-display text-ivory text-2xl mb-2 group-hover:text-gold transition-colors duration-300"
                  style={{ letterSpacing: '-0.01em' }}>
                  {s.mese}
                </div>
                <div className="font-body text-silver/40 text-sm">Mattina + Sera</div>
              </div>
            ))}
          </div>

          {/* Prezzo */}
          <div className="border py-14 px-10 mb-12 relative overflow-hidden"
            style={{ borderColor: 'rgba(201,162,39,0.4)', background: 'rgba(201,162,39,0.03)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
            <div className="font-display text-gold relative z-10"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.03em', textShadow: '0 0 40px rgba(201,162,39,0.4)' }}>
              €150
            </div>
            <p className="font-body text-silver/50 text-sm mt-2 relative z-10">
              Rimborsabile al 100% in caso di iscrizione al corso
            </p>
          </div>

          <Link href="#"
            className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 30px rgba(201,162,39,0.3)' }}>
            Prenota il tuo test
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div ref={faqRef} className="py-40 px-6 md:px-20 relative overflow-hidden"
        style={{ opacity: 0, background: '#0A0A0A' }}>

        {/* Immagine sfumata sinistra */}
        <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none overflow-hidden">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=70"
            alt="" className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.5)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to left, #0A0A0A 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.7) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)'
          }} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Hai dubbi?
            </span>
            <h2 className="font-display text-ivory"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Domande frequenti
            </h2>
          </div>

          <div className="flex flex-col">
            {faq.map((item, i) => (
              <div key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-body text-ivory text-sm group-hover:text-gold transition-colors duration-300 pr-8">
                    {item.q}
                  </span>
                  <ChevronDown size={16} className="text-gold shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <p className="font-body text-silver/50 text-sm leading-relaxed pb-6">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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