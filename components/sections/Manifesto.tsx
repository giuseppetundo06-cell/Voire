'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  text: string
  index: number
}

export default function ManifestoStatement({ text, index }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.6, ease: 'power3.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    )
    gsap.fromTo(textRef.current,
      { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    )
  }, [index])

  const isRight = index % 2 !== 0

  return (
    <div
      ref={ref}
      className="relative py-28 px-6 md:px-20 overflow-hidden"
      style={{
        background: index === 0
          ? 'linear-gradient(135deg, #0A0A0A 0%, #1C1C1E 100%)'
          : index === 1
          ? 'linear-gradient(135deg, #1B4332 0%, #0A0A0A 100%)'
          : 'linear-gradient(135deg, #0A0A0A 0%, #8B3A3A22 100%)',
      }}
    >
      {/* Texture punti */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A227 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Numero grande decorativo */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 font-display text-ivory/5 pointer-events-none select-none ${isRight ? 'right-10' : 'left-10'}`}
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 1 }}
      >
        0{index + 1}
      </div>

      <div className={`relative max-w-7xl mx-auto flex ${isRight ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-2xl">
          {/* Linea gold */}
          <div ref={lineRef} className="h-px bg-gold mb-8" style={{ transformOrigin: 'left center' }} />
          
          {/* Testo */}
          <p
            ref={textRef}
            className="font-display text-ivory"
            style={{
              fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
              opacity: 0,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}