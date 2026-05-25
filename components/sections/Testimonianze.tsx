'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonianze = [
  {
    nome: 'Sofia Marchetti',
    ruolo: 'Junior Architect',
    azienda: 'Zaha Hadid Architects',
    tipo: 'alumni',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    testo: 'Pensavo che una laurea online non potesse competere con una tradizionale. Mi sbagliavo. Il tirocinio al secondo semestre mi ha aperto porte che non immaginavo esistessero.',
  },
  {
    nome: 'Marco Ferretti',
    ruolo: 'Head of Design',
    azienda: 'Pininfarina',
    tipo: 'ceo',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    testo: 'Abbiamo finanziato tre studenti Voire negli ultimi due anni. Il livello di preparazione è superiore a molti laureati tradizionali. È un investimento, non un costo.',
  },
  {
    nome: 'Chiara Romano',
    ruolo: 'Designer',
    azienda: 'Bulgari',
    tipo: 'alumni',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    testo: 'Il test di ingresso sembrava impossibile. Poi ho capito che era esattamente quello: una sfida. Superarla è stata la prima conferma che ero nel posto giusto.',
  },
]

export default function Testimonianze() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
  }, [])

  const goTo = (i: number) => {
    if (!slideRef.current) return
    gsap.to(slideRef.current, {
      opacity: 0, x: -30, duration: 0.3,
      onComplete: () => {
        setActive(i)
        gsap.fromTo(slideRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
        )
      }
    })
  }

  const t = testimonianze[active]

  return (
    <section ref={sectionRef} className="py-40 px-6 md:px-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #1C1C1E 50%, #0A0A0A 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        <div ref={titleRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            Chi l'ha vissuto
          </span>
          <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Le loro parole.
          </h2>
        </div>

        {/* Slide */}
        <div ref={slideRef} className="flex flex-col items-center text-center gap-10">

          {/* Foto */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold">
              <img src={t.foto} alt={t.nome} className="w-full h-full object-cover" />
            </div>
            {t.tipo === 'alumni' && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gold text-noir px-3 py-1 whitespace-nowrap"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                ALUMNI VOIRE
              </div>
            )}
            {t.tipo === 'ceo' && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-smoke text-gold px-3 py-1 whitespace-nowrap border border-gold"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                CEO PARTNER
              </div>
            )}
          </div>

          {/* Quote */}
          <div className="max-w-2xl">
            <div className="font-display text-gold text-6xl leading-none mb-4">"</div>
            <p className="font-display text-ivory italic"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
              {t.testo}
            </p>
          </div>

          {/* Nome */}
          <div>
            <p className="font-body text-ivory text-sm tracking-widest uppercase">{t.nome}</p>
            <p className="font-body text-silver text-xs mt-1">{t.ruolo} · {t.azienda}</p>
          </div>
        </div>

        {/* Navigazione dots */}
        <div className="flex justify-center gap-4 mt-16">
          {testimonianze.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: active === i ? '32px' : '8px',
                height: '2px',
                background: active === i ? '#C9A227' : '#2C2C2E',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}