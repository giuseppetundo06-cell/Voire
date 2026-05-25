'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statements = [
  "L'eccellenza qui non si regala. Si conquista.",
  "Non promettiamo prestigio. Lo costruiamo con te.",
  "Non promettiamo un posto nelle aziende migliori. Te ne garantiamo l'attenzione.",
]

export default function Manifesto() {
  const itemsRef = useRef<HTMLDivElement[]>([])
  const linesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
      gsap.fromTo(linesRef.current[i],
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }, [])

  return (
    <section className="bg-ivory py-40 px-6 md:px-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-24">
        {statements.map((text, i) => (
          <div
            key={i}
            ref={el => { if (el) itemsRef.current[i] = el }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div
              ref={el => { if (el) linesRef.current[i] = el }}
              className="w-full h-px bg-gold"
            />
            <p
              className="font-display text-noir"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}