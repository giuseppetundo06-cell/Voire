'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import BreathingCircle from '@/components/mindspace/BreathingCircle'
import DailyQuote from '@/components/mindspace/DailyQuote'

gsap.registerPlugin(ScrollTrigger)

export default function MindspacePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const breathRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [showQuote, setShowQuote] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.set(headlineRef.current, { opacity: 0 })
    tl.set(subRef.current, { opacity: 0, y: 20 })

    tl.to(headlineRef.current, { opacity: 1, duration: 0.1 }, 0.2)

    // Lettera per lettera
    const text = headlineRef.current!
    const original = text.innerText
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let iteration = 0
    const interval = setInterval(() => {
      text.innerText = original.split('').map((letter, index) => {
        if (letter === ' ') return ' '
        if (index < iteration) return original[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join('')
      if (iteration >= original.length) clearInterval(interval)
      iteration += 0.5
    }, 30)

    tl.to(subRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 1.5)

    gsap.fromTo(breathRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: breathRef.current, start: 'top 85%' } }
    )

    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
        style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)' }} />

        <div className="text-center relative z-10 max-w-3xl">
          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Voire Mindspace
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>

          <h1 ref={headlineRef} className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
            La mente che si ferma è quella che va più lontano.
          </h1>

          <p ref={subRef} className="font-body text-silver/60 text-xl"
            style={{ opacity: 0, letterSpacing: '0.05em' }}>
            Cinque minuti. Ogni giorno.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="font-body text-gold/40 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.3em' }}>Scorri</span>
          <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(201,162,39,0.2)' }}>
            <div className="w-full h-full bg-gold" style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* Respirazione */}
      <div ref={breathRef} className="py-40 px-6 flex flex-col items-center" style={{ opacity: 0, background: '#0A0A0A' }}>
        <div className="max-w-lg w-full">
          <div className="text-center mb-12">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Respirazione guidata
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Prenditi cinque minuti.
            </h2>
          </div>

          <div className="border p-10" style={{ borderColor: 'rgba(201,162,39,0.15)', background: 'rgba(28,28,30,0.5)' }}>
            <BreathingCircle
              fixedTechnique="box"
              fixedDuration={5}
              onComplete={() => setShowQuote(true)}
            />
          </div>

          {showQuote && (
            <div className="mt-12">
              <DailyQuote animate={true} />
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="py-40 px-6 text-center"
        style={{ opacity: 0, background: '#FAF9F6' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', color: '#0A0A0A' }}>
            Questo è solo l'inizio.
          </h2>
          <p className="font-body mb-12 text-lg" style={{ color: '#8E8E93' }}>
            Voire si prende cura di te anche oltre le lezioni.
          </p>
          <Link href="/"
            className="inline-block font-body text-ivory px-14 py-5 uppercase tracking-widest text-xs hover:opacity-80 transition-all duration-300"
            style={{ background: '#0A0A0A' }}>
            Scopri Voire
          </Link>
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