'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function CtaFinale() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative py-48 px-6 md:px-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1C1C1E 50%, #0A0A0A 100%)' }}
    >
      {/* Texture punti */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto text-center" style={{ opacity: 0 }}>
        <div className="inline-flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-gold" />
          <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            Il tuo futuro inizia qui
          </span>
          <div className="h-px w-16 bg-gold" />
        </div>

        <h2 className="font-display text-ivory mb-8"
  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
  La domanda non è se puoi fidarti di noi.
  <br />
  È se puoi{' '}
  <span className="text-gold italic">farne parte.</span>
</h2>

        <Link
          href="#"
          className="inline-block font-body text-noir bg-gold px-16 py-6 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
        >
          Affronta il Test d'Ingresso
        </Link>
      </div>
    </section>
  )
}