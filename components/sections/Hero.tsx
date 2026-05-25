'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const corsi = [
  {
    nome: 'Architettura',
    label: 'Progetta il mondo',
    sub: 'Laurea Magistrale · 300 CFU · 5 anni',
    colore: '#1B4332',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
  },
  {
    nome: 'Automotive Design',
    label: 'Disegna il movimento',
    sub: 'Laurea Triennale · 180 CFU · 3 anni',
    colore: '#8B3A3A',
    bg: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90',
  },
  {
    nome: 'Gioielleria',
    label: "Crea l'eterno",
    sub: 'Laurea Triennale · 180 CFU · 3 anni',
    colore: '#C9A227',
    bg: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=90',
  },
]

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<HTMLDivElement[]>([])
  const imgRefs = useRef<HTMLImageElement[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  const animateSlide = (i: number) => {
    const img = imgRefs.current[i]
    if (!img) return
    gsap.killTweensOf(img)

    if (i === 0) {
      // Architettura — movimento orizzontale lento e continuo
      gsap.fromTo(img,
        { x: -60, y: 0, scale: 1.15 },
        {
          x: 60, scale: 1.08,
          duration: 20,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
    } else if (i === 1) {
      // Automotive — movimento orizzontale più veloce
      gsap.fromTo(img,
        { x: 80, y: 0, scale: 1.12 },
        {
          x: -80, scale: 1.06,
          duration: 14,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
    } else if (i === 2) {
      // Gioielleria — movimento verticale fluido
      gsap.fromTo(img,
        { y: 40, x: 0, scale: 1.12 },
        {
          y: -40, scale: 1.06,
          duration: 10,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
    }
  }

  useEffect(() => {
    // Mostra primo slide
    gsap.set(slideRefs.current[0], { opacity: 1 })
    animateSlide(0)

    // Intro testo
    const tl = gsap.timeline({ delay: 0.4 })
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 80, filter: 'blur(20px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' }
    )
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6'
    )
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5'
    )
    tl.fromTo(infoRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6'
    )

    // Mouse — salva target senza applicare direttamente
    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    // RAF separato per il parallax — lerp manuale ultra smooth
    const tickParallax = () => {
      const lerp = 0.04
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp

      const wrapper = slideRefs.current[activeRef.current]
      if (wrapper) {
        // Applica parallax al wrapper invece che all'immagine animata
        gsap.set(wrapper.querySelector('.parallax-layer'), {
          x: mouseRef.current.x,
          y: mouseRef.current.y,
        })
      }
      rafRef.current = requestAnimationFrame(tickParallax)
    }
    rafRef.current = requestAnimationFrame(tickParallax)

    // Auto-rotate
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % corsi.length)
    }, 7000)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const prev = activeRef.current
    if (prev === active) return
    activeRef.current = active

    // Uscita vecchio
    gsap.to(slideRefs.current[prev], { opacity: 0, duration: 1.4, ease: 'power2.inOut' })
    gsap.killTweensOf(imgRefs.current[prev])

    // Entrata nuovo
    gsap.to(slideRefs.current[active], { opacity: 1, duration: 1.6, ease: 'power2.inOut', delay: 0.1 })
    animateSlide(active)

    // Label
    gsap.fromTo(labelRef.current,
      { opacity: 0, y: 25, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
    )
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'center' }
    )
  }, [active])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#050508' }}>

      {/* Slides */}
      {corsi.map((c, i) => (
        <div
          key={i}
          ref={el => { if (el) slideRefs.current[i] = el }}
          className="absolute inset-0"
          style={{ zIndex: 0, opacity: 0, willChange: 'opacity' }}
        >
          {/* Layer parallax — si muove col mouse */}
          <div className="parallax-layer absolute inset-0" style={{ willChange: 'transform' }}>
            {/* Immagine — si muove con animazione loop */}
            <div className="absolute inset-[-10%] overflow-hidden">
              <img
                ref={el => { if (el) imgRefs.current[i] = el }}
                src={c.bg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.22) saturate(0.5)',
                  willChange: 'transform',
                }}
              />
            </div>
          </div>

          {/* Orb colore */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${c.colore}18, transparent 70%)`,
          }} />

          {/* Gradiente scuro */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(5,5,8,0.55) 0%, rgba(5,5,8,0.05) 35%, rgba(5,5,8,0.5) 65%, rgba(5,5,8,1) 100%)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, rgba(5,5,8,0.55) 0%, transparent 30%, transparent 70%, rgba(5,5,8,0.55) 100%)',
          }} />
        </div>
      ))}

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `linear-gradient(rgba(201,162,39,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.02) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Angoli HUD */}
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

      {/* Selettore corsi — destra */}
      <div ref={infoRef} className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5"
        style={{ zIndex: 5, opacity: 0 }}>
        {corsi.map((c, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: active === i ? 1 : 0.25 }}>
            <div className="text-right">
              <div className="font-body uppercase"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: c.colore }}>
                {c.nome}
              </div>
              {active === i && (
                <div className="font-body text-silver/40 text-xs mt-0.5">{c.sub}</div>
              )}
            </div>
            <div className="h-px transition-all duration-500"
              style={{ background: c.colore, width: active === i ? '28px' : '8px' }} />
          </button>
        ))}
      </div>

      {/* Testo */}
      <div className="relative flex flex-col items-center justify-end pb-28 flex-1 px-6 text-center"
        style={{ zIndex: 5 }}>
        <div ref={titleRef} className="max-w-5xl" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>
              Università online d'élite · Riconosciuta MIUR
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>

          <h1 ref={labelRef} className="font-display text-ivory mb-5"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              lineHeight: '0.95',
              letterSpacing: '-0.04em',
              textShadow: `0 0 120px ${corsi[active].colore}60`,
            }}>
            {corsi[active].label}
          </h1>

          <div ref={lineRef} className="h-px w-48 mx-auto"
            style={{
              background: `linear-gradient(to right, transparent, ${corsi[active].colore}, transparent)`,
            }} />
        </div>

        <p ref={subtitleRef} className="font-body text-silver/50 text-xl mt-8 mb-10 max-w-xl"
          style={{ opacity: 0, lineHeight: '1.7' }}>
          Tre lauree magistrali. Docenti verificabili.
          <br />
          <span style={{ color: corsi[active].colore }}>Tirocini ogni semestre.</span>
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4" style={{ opacity: 0 }}>
          <Link href="/candidati"
            className="group relative font-body text-noir px-14 py-5 uppercase tracking-widest text-xs font-bold overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #C9A227, #E8D48A)',
              boxShadow: '0 0 30px rgba(201,162,39,0.4)',
            }}>
            <span className="relative z-10">Candidati ora</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </Link>
          <Link href="/corsi"
            className="font-body text-gold border border-gold/40 px-14 py-5 uppercase tracking-widest text-xs hover:bg-gold/10 hover:border-gold transition-all duration-300">
            Scopri i corsi
          </Link>
        </div>

        {/* Indicatori */}
        <div className="flex gap-3 mt-10">
          {corsi.map((c, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="transition-all duration-500"
              style={{
                width: active === i ? '40px' : '8px',
                height: '2px',
                background: active === i ? c.colore : 'rgba(255,255,255,0.15)',
              }} />
          ))}
        </div>
      </div>
    </section>
  )
}