'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const valori = [
  {
    numero: '01',
    titolo: 'Selezione brutale.',
    testo: 'Ammettiamo il 12% dei candidati. Non perché vogliamo essere esclusivi — ma perché vogliamo essere efficaci. Ogni studente che entra è lì per merito.',
    colore: '#C9A227',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  },
  {
    numero: '02',
    titolo: 'Docenti verificabili.',
    testo: 'Curriculum pubblici. Nessun professore anonimo. Sai esattamente chi ti insegna, dove ha lavorato, cosa ha realizzato.',
    colore: '#1B4332',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
  {
    numero: '03',
    titolo: 'Industria come partner.',
    testo: 'Le aziende non vengono a presentarsi alla fine. Sono dentro il corso dall\'inizio — nei brief, nelle revisioni, nei tirocini, nei finanziamenti.',
    colore: '#8B3A3A',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    numero: '04',
    titolo: 'Online senza compromessi.',
    testo: 'Online non significa inferiore. Significa accessibile, flessibile e — se fatto bene — superiore. Noi lo facciamo bene.',
    colore: '#C9A227',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
  },
]

const team = [
  {
    nome: 'Alessandro Ferretti',
    ruolo: 'Co-Founder & CEO',
    bio: 'Ex Head of Design Partnerships di LVMH Europa. Ha costruito programmi formativi per 40+ brand del lusso.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    nome: 'Martina Conti',
    ruolo: 'Co-Founder & Chief Academic Officer',
    bio: 'PhD in Design Research al Politecnico di Milano. Ha insegnato in 8 università internazionali prima di fondare Voire.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    nome: 'Luca Romano',
    ruolo: 'Chief Partnerships Officer',
    bio: 'Ha costruito reti di partnership con Ferrari, Bulgari e Foster+Partners. 15 anni nel mondo del design d\'eccellenza.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
]

export default function ChiSiamoPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const valoriRef = useRef<HTMLDivElement[]>([])
  const teamRef = useRef<HTMLDivElement[]>([])
  const manifRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.3 }
    )

    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'power3.inOut', delay: 0.8, transformOrigin: 'left' }
    )

    valoriRef.current.forEach((el, i) => {
      const img = el.querySelector('.val-img')
      const content = el.querySelector('.val-content')

      gsap.fromTo(img,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, clipPath: 'inset(0 0% 0 0)',
          duration: 1.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      )
      gsap.fromTo(content,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      )
    })

    teamRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })

    gsap.fromTo(manifRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: manifRef.current, start: 'top 80%' }
      }
    )
  }, [])

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen flex items-end pb-32 overflow-hidden px-6 md:px-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Chi siamo"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.6)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0A0A 30%, rgba(10,10,10,0.4) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0A0A0A 0%, transparent 60%)' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div ref={titleRef} className="relative z-10 max-w-5xl" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Chi siamo · Dal 2021
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Non siamo l'università
            <br />
            che ti aspetti.
            <br />
            <span className="text-gold italic">Siamo quella che meriti.</span>
          </h1>
          <div ref={lineRef} className="h-px bg-gold mb-8" style={{ transformOrigin: 'left' }} />
          <p className="font-body text-silver text-xl leading-relaxed max-w-2xl">
            Voire è nata da una domanda semplice: perché le migliori scuole di design non sono accessibili a chi non vive nelle città giuste, non ha i soldi giusti, non conosce le persone giuste?
          </p>
        </div>
      </div>

      {/* Numeri rapidi */}
      <div className="py-0 border-y border-smoke" style={{ background: 'linear-gradient(to right, #0A0A0A, #1C1C1E, #0A0A0A)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-smoke">
          {[
            { val: '2021', label: 'Anno di fondazione' },
            { val: '12%', label: 'Tasso di ammissione' },
            { val: '94%', label: 'Placement in 6 mesi' },
            { val: '100+', label: 'Aziende partner' },
          ].map((n, i) => (
            <div key={i} className="flex flex-col items-center text-center py-16 px-8">
              <div className="font-display text-gold mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}>
                {n.val}
              </div>
              <div className="h-px w-8 bg-gold/30 mb-3" />
              <p className="font-body text-silver text-sm">{n.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Valori con immagini */}
      <div className="py-40 bg-noir">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="mb-24">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              I nostri principi
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Cosa ci rende diversi.
            </h2>
          </div>

          <div className="flex flex-col gap-32">
            {valori.map((v, i) => (
              <div
                key={i}
                ref={el => { if (el) valoriRef.current[i] = el }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
              >
                {/* Immagine */}
                <div className="val-img md:w-1/2 aspect-video overflow-hidden" style={{ opacity: 0 }}>
                  <img
                    src={v.img}
                    alt={v.titolo}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.6) saturate(0.7)' }}
                  />
                </div>

                {/* Contenuto */}
                <div className="val-content md:w-1/2" style={{ opacity: 0 }}>
                  <span className="font-display block mb-4" style={{ fontSize: '4rem', lineHeight: 1, color: v.colore, opacity: 0.2 }}>
                    {v.numero}
                  </span>
                  <div className="h-px w-12 mb-6" style={{ background: v.colore }} />
                  <h3 className="font-display text-ivory mb-6"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}>
                    {v.titolo}
                  </h3>
                  <p className="font-body text-silver leading-relaxed text-lg">{v.testo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-40 border-t border-smoke"
        style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0A0A0A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Le persone
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Chi ha fondato Voire.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((p, i) => (
              <div
                key={i}
                ref={el => { if (el) teamRef.current[i] = el }}
                className="group"
                style={{ opacity: 0 }}
              >
                <div className="relative overflow-hidden mb-6 aspect-square">
                  <img
                    src={p.img}
                    alt={p.nome}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.7) saturate(0.7)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
                <h3 className="font-display text-ivory text-xl mb-1 group-hover:text-gold transition-colors duration-300"
                  style={{ letterSpacing: '-0.01em' }}>
                  {p.nome}
                </h3>
                <p className="font-body text-gold text-xs uppercase tracking-widest mb-4">{p.ruolo}</p>
                <p className="font-body text-silver text-sm leading-relaxed">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manifesto */}
      <div ref={manifRef} className="py-40 px-6 md:px-20 border-t border-smoke relative overflow-hidden bg-noir"
        style={{ opacity: 0 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="font-display text-gold mb-6" style={{ fontSize: '6rem', lineHeight: 1, opacity: 0.6 }}>"</div>
          <blockquote className="font-display text-ivory mb-12"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: '1.3', letterSpacing: '-0.02em' }}>
            Il talento è democratico.
            <br />
            Le opportunità, ancora no.
            <br />
            <span className="text-gold italic">Noi stiamo cambiando questo.</span>
          </blockquote>
          <div className="h-px w-24 bg-gold mx-auto mb-8" />
          <p className="font-body text-silver text-sm tracking-widest uppercase">Fondatori di Voire · 2021</p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-40 px-6 md:px-20 bg-noir text-center border-t border-smoke relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Fai parte della storia.
          </h2>
          <p className="font-body text-silver mb-12 text-lg">
            La prossima sessione di test è aperta. Hai 6 settimane per prepararti.
          </p>
          <Link href="/ammissioni/test-ingresso"
            className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105">
            Candidati ora
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}