'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Award, MapPin, Calendar, Gift, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { icon: Briefcase, titolo: 'Tirocinio ogni semestre', testo: 'Non uno stage finale. Un tirocinio vero in ogni semestre, nelle migliori aziende del settore.' },
  { icon: Award, titolo: "Docenti d'eccellenza", testo: 'Curriculum pubblici e verificabili. Sai esattamente da chi impari.' },
  { icon: MapPin, titolo: 'Esami in presenza per il 30', testo: 'Vuoi il massimo? Lo confermi guardandoci negli occhi.' },
  { icon: Calendar, titolo: 'Sessioni su misura', testo: 'Concentra tutti gli esami in 1-2 giorni. Compatibile con il lavoro.' },
  { icon: Gift, titolo: 'Un semestre gratis', testo: 'Prova completa + un esame. Nessun rischio, solo talento.' },
  { icon: Building2, titolo: 'Finanziato dalle aziende', testo: 'Le nostre partner investono sugli studenti migliori.' },
]

export default function Differenziatori() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )

    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: item, start: 'top 88%' } }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-40 px-6 md:px-20 relative overflow-hidden bg-noir">

      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="mb-20" style={{ opacity: 0 }}>
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            La differenza
          </span>
          <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Perché Voire è diversa
          </h2>
        </div>

        {/* Griglia 2x3 senza linee */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                ref={el => { if (el) itemsRef.current[i] = el }}
                className="flex flex-col gap-5 group cursor-default"
                style={{ opacity: 0 }}
              >
                {/* Icona */}
                <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} className="text-gold" />
                </div>

                {/* Titolo */}
                <h3 className="font-display text-ivory text-xl transition-colors duration-300 group-hover:text-gold"
                  style={{ letterSpacing: '-0.01em' }}>
                  {item.titolo}
                </h3>

                {/* Linea sottile gold */}
                <div className="h-px bg-gold/20 group-hover:bg-gold transition-colors duration-500 w-12" />

                {/* Testo */}
                <p className="font-body text-silver text-sm leading-relaxed">
                  {item.testo}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}