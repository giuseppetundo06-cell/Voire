'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const numeri = [
  { valore: 12, suffisso: '%', label: 'Tasso di ammissione' },
  { valore: 94, suffisso: '%', label: 'Placement entro 6 mesi' },
  { valore: 100, suffisso: '+', label: 'Aziende partner' },
  { valore: 47, suffisso: '', label: "Docenti d'eccellenza" },
]

export default function Numeri() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<HTMLDivElement[]>([])
  const countersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
      }
    )

    numbersRef.current.forEach((el, i) => {
      if (!el) return

      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      )

      const counter = countersRef.current[i]
      if (!counter) return
      const endVal = numeri[i].valore
      const obj = { val: 0 }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(obj, {
            val: endVal,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              if (counter) counter.textContent = Math.round(obj.val).toString()
            },
          })
        },
      })
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-noir py-40 px-6 md:px-20 relative overflow-hidden">

      <div className="absolute top-0 left-20 right-20 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9A227, transparent)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        <div ref={titleRef} className="text-center mb-24" style={{ opacity: 0 }}>
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            I numeri
          </span>
          <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Voire in cifre
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {numeri.map((n, i) => (
            <div
              key={i}
              ref={el => { if (el) numbersRef.current[i] = el }}
              className="flex flex-col items-center text-center gap-4 py-16 px-8 border-r border-smoke last:border-r-0"
              style={{ opacity: 0 }}
            >
              <div className="font-display text-gold flex items-end"
                style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                <span ref={el => { if (el) countersRef.current[i] = el }}>0</span>
                <span>{n.suffisso}</span>
              </div>
              <div className="h-px w-8 bg-gold/40" />
              <p className="font-body text-silver text-sm tracking-wide">{n.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-20 right-20 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9A227, transparent)' }} />
    </section>
  )
}