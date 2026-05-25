'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Logo appare
    tl.fromTo(logoRef.current,
      { opacity: 0, letterSpacing: '0.5em', filter: 'blur(20px)' },
      { opacity: 1, letterSpacing: '0.3em', filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
      0.3
    )

    // Linea si espande
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power3.inOut', transformOrigin: 'left' },
      0.6
    )

    // Counter 0 → 100
    tl.to(counterRef.current, {
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function() {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(this.progress() * 100))
        }
      }
    }, 0.5)

    // Uscita
    tl.to(logoRef.current,
      { opacity: 0, y: -20, duration: 0.6, ease: 'power3.in' },
      2.6
    )
    tl.to(containerRef.current,
      { opacity: 0, duration: 0.6, ease: 'power2.in' },
      2.8
    )
    tl.call(() => onComplete(), [], 3.2)

  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#050508' }}>

      {/* Grid sottile */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(201,162,39,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.03) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Angoli */}
      {[
        { pos: 'top-8 left-8', d: 'M0 20 L0 0 L20 0' },
        { pos: 'top-8 right-8', d: 'M40 20 L40 0 L20 0' },
        { pos: 'bottom-8 left-8', d: 'M0 20 L0 40 L20 40' },
        { pos: 'bottom-8 right-8', d: 'M40 20 L40 40 L20 40' },
      ].map(({ pos, d }, i) => (
        <div key={i} className={`absolute ${pos}`}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d={d} stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Logo */}
      <div ref={logoRef} style={{ opacity: 0 }}>
        <span className="font-display text-ivory"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.3em', fontWeight: 300 }}>
          VOIRE
        </span>
      </div>

      {/* Linea + counter */}
      <div className="mt-10 w-64 relative">
        <div className="h-px bg-smoke/40 w-full overflow-hidden">
          <div ref={lineRef} className="h-full bg-gold"
            style={{ transformOrigin: 'left', transform: 'scaleX(0)' }} />
        </div>
        <div className="flex justify-between mt-3">
          <span className="font-body text-silver/30 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
            Caricamento
          </span>
          <span ref={counterRef} className="font-body text-gold"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            0
          </span>
        </div>
      </div>
    </div>
  )
}