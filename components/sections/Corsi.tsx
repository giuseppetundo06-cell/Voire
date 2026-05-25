'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

const corsi = [
  {
    slug: 'architettura',
    nome: 'Architettura',
    descrizione: 'Laurea Magistrale in Architettura — 300 CFU',
    immagine: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    colore: '#1B4332',
    cfu: 300,
    durata: '5 anni',
  },
  {
    slug: 'automotive-design',
    nome: 'Automotive Design',
    descrizione: 'Laurea Triennale in Automotive Design — 180 CFU',
    immagine: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    colore: '#8B3A3A',
    cfu: 180,
    durata: '3 anni',
  },
  {
    slug: 'gioielleria',
    nome: 'Gioielleria',
    descrizione: 'Laurea Triennale in Gioielleria — 180 CFU',
    immagine: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80',
    colore: '#C9A227',
    cfu: 180,
    durata: '3 anni',
  },
]

export default function Corsi() {
  const router = useRouter()
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const curtainRef = useRef<HTMLDivElement>(null)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 1.2, ease: 'power4.out', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%' } }
      )
    })
  }, [])

  const handleEnter = (i: number) => {
    const card = cardsRef.current[i]
    gsap.to(card.querySelector('img'), { scale: 1.08, duration: 1, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-overlay'), { opacity: 1, duration: 0.4 })
    gsap.to(card.querySelector('.card-cta'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-info'), { y: -12, duration: 0.5, ease: 'power2.out' })
  }

  const handleLeave = (i: number) => {
    const card = cardsRef.current[i]
    gsap.to(card.querySelector('img'), { scale: 1, duration: 1, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-overlay'), { opacity: 0, duration: 0.4 })
    gsap.to(card.querySelector('.card-cta'), { opacity: 0, y: 20, duration: 0.3 })
    gsap.to(card.querySelector('.card-info'), { y: 0, duration: 0.5, ease: 'power2.out' })
  }

  const handleClick = (corso: typeof corsi[0]) => {
    if (transitioning) return
    setTransitioning(true)

    const curtain = curtainRef.current!
    curtain.style.background = corso.colore

    gsap.set(curtain, { scaleY: 0, transformOrigin: 'bottom center' })

    gsap.to(curtain, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => router.push(`/corsi/${corso.slug}`)
    })
  }

  return (
    <section className="bg-noir py-40 px-6 md:px-20 relative">

      {/* Curtain transizione */}
      <div
        ref={curtainRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99999, transform: 'scaleY(0)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            Tre Lauree d'Élite
          </span>
          <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Mai viste online. Fino ad ora.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corsi.map((corso, i) => (
            <div
              key={corso.slug}
              ref={el => { if (el) cardsRef.current[i] = el }}
              className="relative overflow-hidden cursor-pointer"
              style={{ aspectRatio: '3/4', opacity: 0 }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={() => handleClick(corso)}
            >
              <img
                src={corso.immagine}
                alt={corso.nome}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) saturate(0.7)' }}
              />
              <div className="card-overlay absolute inset-0"
                style={{ opacity: 0, background: `linear-gradient(to top, ${corso.colore}88, transparent 60%)` }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }} />
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: corso.colore }} />
              <div className="absolute top-6 left-6">
                <span className="font-display select-none" style={{ fontSize: '5rem', lineHeight: 1, color: 'rgba(255,255,255,0.08)' }}>
                  0{i + 1}
                </span>
              </div>
              <div className="card-info absolute bottom-0 left-0 right-0 p-8">
                <span className="font-body block mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: corso.colore }}>
                  {corso.durata} · {corso.cfu} CFU
                </span>
                <h3 className="font-display text-ivory text-3xl mb-2" style={{ letterSpacing: '-0.01em' }}>
                  {corso.nome}
                </h3>
                <p className="font-body text-silver text-sm leading-relaxed">{corso.descrizione}</p>
              </div>
              <div className="card-cta absolute bottom-8 right-8" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <span className="font-body text-xs uppercase tracking-widest text-ivory border-b pb-1" style={{ borderColor: corso.colore }}>
                  Scopri il corso →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}