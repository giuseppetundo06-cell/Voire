'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { Check, Star, Trophy, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const borse = [
  {
    tipo: 'Borsa di Eccellenza',
    copertura: '100%',
    icon: Trophy,
    colore: '#C9A227',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    requisiti: [
      'Punteggio test ≥ 90/100',
      'ISEE non richiesto',
      'Rinnovo automatico con media ≥ 28/30',
      'Priorità assoluta nelle aziende partner',
    ],
    desc: 'Riservata ai candidati straordinari. Se il tuo punteggio supera 90, Voire copre tutto. Nessuna condizione economica richiesta — solo talento puro.',
  },
  {
    tipo: 'Borsa di Merito',
    copertura: '50–100%',
    icon: Star,
    colore: '#1B4332',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    requisiti: [
      'Punteggio test ≥ 75/100',
      'ISEE ≤ €30.000',
      'Rinnovo annuale per merito',
      'Accesso ai finanziamenti aziendali',
    ],
    desc: 'Per chi dimostra talento e ha bisogno di supporto economico. La percentuale di copertura dipende dall\'ISEE e dal punteggio ottenuto al test.',
  },
  {
    tipo: 'Borsa di Accesso',
    copertura: '25–50%',
    icon: Zap,
    colore: '#8B3A3A',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    requisiti: [
      'Punteggio test ≥ 70/100',
      'ISEE ≤ €20.000',
      'Rinnovo semestrale',
      'Compatibile con rate mensili',
    ],
    desc: 'Nessuno dovrebbe rinunciare a Voire per motivi economici. La borsa di accesso garantisce un contributo a chi ne ha più bisogno.',
  },
]

const faq = [
  { q: 'Come faccio a sapere se ho diritto a una borsa?', a: 'Dopo il test riceverai automaticamente la valutazione. Se il punteggio e l\'ISEE lo permettono, riceverai un\'offerta di borsa entro 5 giorni lavorativi.' },
  { q: 'Devo richiedere la borsa o viene assegnata?', a: 'Viene valutata automaticamente. Basta indicare il tuo ISEE durante la registrazione al test e fare il meglio possibile.' },
  { q: 'La borsa si rinnova ogni anno?', a: 'Sì, ma solo se mantieni il rendimento richiesto. La borsa di eccellenza richiede media ≥28/30, le altre ≥26/30.' },
  { q: 'Posso avere sia una borsa che un finanziamento aziendale?', a: 'No, sono alternative. Se ricevi un finanziamento aziendale al 100%, la borsa decade automaticamente.' },
]

export default function BorsePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -Math.random() * 0.5 - 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      life: Math.random(),
    }))

    let animId: number
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.003
        if (p.life <= 0 || p.y < 0) { p.x = Math.random() * canvas.width; p.y = canvas.height; p.life = 1 }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,162,39,${p.opacity * p.life})`
        ctx.fill()
      })
      animId = requestAnimationFrame(loop)
    }
    loop()

    const heroImg = heroRef.current?.querySelector('.hero-img')
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.3 }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 85%' } }
      )
    })

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <main className="min-h-screen" style={{ background: '#050508' }}>
      <Cursor />
      <Header />

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen flex items-end pb-32 overflow-hidden px-6 md:px-20">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 overflow-hidden">
          <img className="hero-img w-full h-[120%] object-cover absolute -top-[10%]"
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
            alt="Borse di studio"
            style={{ filter: 'brightness(0.2) saturate(0.6)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050508 20%, rgba(5,5,8,0.5) 70%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,162,39,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div ref={titleRef} className="relative max-w-5xl" style={{ zIndex: 3, opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Borse di Studio
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.0', letterSpacing: '-0.03em', textShadow: '0 0 80px rgba(201,162,39,0.15)' }}>
            Il merito
            <br />
            <span className="text-gold italic">non ha prezzo.</span>
          </h1>
          <div className="h-px w-full max-w-xl bg-gradient-to-r from-gold to-transparent mb-8" />
          <p className="font-body text-silver/70 text-xl leading-relaxed max-w-2xl">
            Se hai il talento e la determinazione ma non le risorse economiche, Voire trova un modo. Sempre. Le borse non si chiedono — si conquistano.
          </p>
        </div>
      </div>

      {/* Statement */}
      <div className="py-24 px-6 md:px-20 border-y border-smoke/20"
        style={{ background: 'linear-gradient(to right, #080810, #0D0D18, #080810)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-smoke/20">
          {[
            { val: '€0', label: 'Tasse se punteggio ≥90', color: '#C9A227' },
            { val: '3', label: 'Tipi di borsa disponibili', color: '#1B4332' },
            { val: '100%', label: 'Basate sul merito', color: '#8B3A3A' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center py-12 px-8">
              <div className="font-display mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: s.color, textShadow: `0 0 20px ${s.color}40` }}>
                {s.val}
              </div>
              <div className="h-px w-8 mb-3" style={{ background: s.color }} />
              <p className="font-body text-silver/50 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards borse */}
      <div className="py-40 px-6 md:px-20" style={{ background: '#050508' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Le borse disponibili
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Tre livelli. Un principio solo.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {borse.map((b, i) => {
              const Icon = b.icon
              return (
                <div
                  key={i}
                  ref={el => { if (el) cardsRef.current[i] = el }}
                  className="relative overflow-hidden group transition-all duration-500 hover:border-opacity-60"
                  style={{ opacity: 0, border: `1px solid ${b.colore}25` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Immagine */}
                    <div className="relative md:w-72 shrink-0 overflow-hidden" style={{ minHeight: '260px' }}>
                      <img src={b.img} alt={b.tipo}
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-108"
                        style={{ filter: 'brightness(0.4) saturate(0.6)' }} />
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(to right, transparent 0%, rgba(5,5,8,0.8) 80%, rgba(5,5,8,1) 100%)',
                      }} />
                      <div className="absolute top-0 left-0 bottom-0 w-1" style={{ background: b.colore }} />
                      <div className="absolute bottom-8 left-8">
                        <div className="w-14 h-14 flex items-center justify-center"
                          style={{ background: `${b.colore}20`, border: `2px solid ${b.colore}50`, boxShadow: `0 0 20px ${b.colore}20` }}>
                          <Icon size={24} style={{ color: b.colore }} />
                        </div>
                      </div>
                    </div>

                    {/* Contenuto */}
                    <div className="flex-1 p-10">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span className="font-body uppercase block mb-2" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: b.colore }}>
                            {b.tipo}
                          </span>
                          <h3 className="font-display text-ivory text-2xl group-hover:text-gold transition-colors duration-300"
                            style={{ letterSpacing: '-0.01em' }}>
                            Copertura fino a
                          </h3>
                        </div>
                        <div className="font-display text-4xl" style={{ color: b.colore, textShadow: `0 0 20px ${b.colore}40`, letterSpacing: '-0.02em' }}>
                          {b.copertura}
                        </div>
                      </div>

                      <p className="font-body text-silver/50 text-sm leading-relaxed mb-8 max-w-xl">{b.desc}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {b.requisiti.map((req, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <Check size={13} style={{ color: b.colore }} className="shrink-0 mt-0.5" />
                            <span className="font-body text-silver/50 text-xs">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Come funziona */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke/20"
        style={{ background: 'linear-gradient(135deg, #080810 0%, #0A0A18 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Come funziona
            </span>
            <h2 className="font-display text-ivory mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw', letterSpacing: '-0.02em' }}>
              Non si chiede.
              <br />
              <span className="text-gold italic">Si conquista.</span>
            </h2>
            <p className="font-body text-silver/60 leading-relaxed mb-8 text-lg">
              Niente moduli da compilare, niente richieste umilianti. Fai il test, fai del tuo meglio, e se meriti una borsa te la offriamo noi.
            </p>
            {[
              'Registrati al test d\'ingresso',
              'Indica il tuo ISEE (opzionale per borsa di eccellenza)',
              'Sostieni il test al massimo delle tue capacità',
              'Ricevi automaticamente la valutazione entro 5 giorni',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 mb-4 group">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
                  <span className="font-body text-gold text-xs">{i + 1}</span>
                </div>
                <p className="font-body text-silver/60 text-sm leading-relaxed group-hover:text-ivory transition-colors duration-300">{step}</p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Merito" className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.3) saturate(0.5)' }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.08) 0%, transparent 70%)',
            }} />
            <div className="absolute inset-0 border border-smoke/20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gold" />
            <div className="absolute bottom-12 left-12 right-12 text-center">
              <div className="font-display text-gold text-6xl mb-2" style={{ textShadow: '0 0 30px rgba(201,162,39,0.5)' }}>"</div>
              <p className="font-display text-ivory italic text-lg" style={{ letterSpacing: '-0.01em' }}>
                Il talento è democratico. Le opportunità, ancora no. Noi stiamo cambiando questo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke/20" style={{ background: '#050508' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-ivory mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            Domande sulle borse
          </h2>
          {faq.map((item, i) => (
            <div key={i} className="py-6 border-b group" style={{ borderColor: 'rgba(44,44,46,0.5)' }}>
              <h4 className="font-body text-ivory text-sm mb-3 uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                {item.q}
              </h4>
              <p className="font-body text-silver/40 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-48 px-6 md:px-20 text-center relative overflow-hidden" style={{ background: '#080810' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            Dimostra quanto vali.
            <br />
            <span className="text-gold italic">Il resto lo facciamo noi.</span>
          </h2>
          <p className="font-body text-silver/50 mb-14 text-lg">
            Prenota il test. Fai del tuo meglio. Lascia che sia il merito a parlare.
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