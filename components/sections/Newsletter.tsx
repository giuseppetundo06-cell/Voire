'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' } }
    )
  }, [])

  const handleSubmit = () => {
    if (!email) return
    setSent(true)
    gsap.fromTo('.newsletter-success',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
  }

  return (
    <section ref={sectionRef} className="bg-noir border-t border-smoke py-20 px-6 md:px-20">
      <div ref={contentRef} className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10" style={{ opacity: 0 }}>

        <div className="max-w-md">
          <h3 className="font-display text-ivory text-2xl mb-2" style={{ letterSpacing: '-0.01em' }}>
            Resta aggiornato.
          </h3>
          <p className="font-body text-silver text-sm leading-relaxed">
            Ricevi novità su ammissioni, borse di studio e opportunità.
          </p>
        </div>

        {!sent ? (
          <div className="flex gap-0 w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 bg-graphite border border-smoke text-ivory px-6 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-silver/50"
            />
            <button
              onClick={handleSubmit}
              className="bg-gold text-noir px-8 py-4 font-body text-xs uppercase tracking-widest hover:bg-goldLight transition-colors duration-300 whitespace-nowrap"
            >
              Iscriviti
            </button>
          </div>
        ) : (
          <div className="newsletter-success font-body text-gold text-sm tracking-widest uppercase" style={{ opacity: 0 }}>
            ✓ Iscrizione confermata
          </div>
        )}
      </div>
    </section>
  )
}