'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aziende = {
  architettura: [
    'Foster + Partners', 'Zaha Hadid Architects', 'Bjarke Ingels Group', 'Renzo Piano Building Workshop',
    'OMA', 'Herzog & de Meuron', 'Snøhetta', 'MVRDV', 'Kengo Kuma', 'Studio Libeskind',
    'Grimshaw Architects', 'Heatherwick Studio', 'David Chipperfield', 'SANAA', 'SOM',
    'Gensler', 'Stefano Boeri', 'Fuksas', 'Pininfarina Architecture', 'Carlo Ratti Associati',
  ],
  automotive: [
    'Ferrari', 'Lamborghini', 'Pagani', 'Maserati', 'Alfa Romeo', 'Pininfarina',
    'Italdesign Giugiaro', 'Porsche', 'BMW Designworks', 'Mercedes-Benz Design',
    'Audi Design', 'Bugatti', 'McLaren', 'Bentley', 'Rolls-Royce',
    'Tesla Design', 'Lucid Motors', 'Genesis', 'Lexus Design', 'Mazda Design',
  ],
  gioielleria: [
    'Bulgari', 'Buccellati', 'Pomellato', 'Damiani', 'Cartier',
    'Van Cleef & Arpels', 'Piaget', 'Chopard', 'Graff', 'Harry Winston',
    'Tiffany & Co.', 'Repossi', 'Vhernier', 'De Beers', 'Chanel High Jewelry',
    'Messika', 'Mikimoto', 'Tasaki', 'Boghossian', 'JAR Paris',
  ],
}

type Settore = keyof typeof aziende

const tabs: { key: Settore; label: string }[] = [
  { key: 'architettura', label: 'Architettura' },
  { key: 'automotive', label: 'Automotive' },
  { key: 'gioielleria', label: 'Gioielleria' },
]

function CarouselRow({ items, direction = 1 }: { items: string[], direction?: number }) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const totalWidth = row.scrollWidth / 2
    gsap.to(row, {
      x: direction > 0 ? -totalWidth : totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          const n = parseFloat(x.toString())
          return direction > 0
            ? ((n % totalWidth) - totalWidth) % -totalWidth
            : ((n % totalWidth) + totalWidth) % totalWidth
        })
      }
    })
    return () => { gsap.killTweensOf(row) }
  }, [direction])

  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-2">
      <div ref={rowRef} className="flex gap-12 w-max">
        {doubled.map((name, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap group cursor-default">
            <div className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-300" />
            <span className="font-body text-silver group-hover:text-gold transition-colors duration-300"
              style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AziendePartner() {
  const [activeTab, setActiveTab] = useState<Settore>('architettura')
  const titleRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(tabsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: tabsRef.current, start: 'top 85%' } }
    )
  }, [])

  const handleTab = (key: Settore) => {
    if (!carouselRef.current) return
    gsap.to(carouselRef.current, {
      opacity: 0, y: 10, duration: 0.2,
      onComplete: () => {
        setActiveTab(key)
        gsap.to(carouselRef.current, { opacity: 1, y: 0, duration: 0.4 })
      }
    })
  }

  const items = aziende[activeTab]
  const half = Math.ceil(items.length / 2)

  return (
    <section className="bg-noir py-40 px-6 md:px-20 overflow-hidden relative">

      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            I nostri partner
          </span>
          <h2 className="font-display text-ivory mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Dove farai il tirocinio.
          </h2>
          <p className="font-body text-silver" style={{ fontSize: '0.9rem' }}>
            Chi potrebbe finanziarti.
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="flex justify-center mb-16" style={{ opacity: 0 }}>
          <div className="flex border-b border-smoke">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTab(tab.key)}
                className="px-10 py-4 font-body uppercase transition-all duration-300"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: activeTab === tab.key ? '#C9A227' : '#8E8E93',
                  borderBottom: activeTab === tab.key ? '1px solid #C9A227' : '1px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="flex flex-col gap-6">
          <CarouselRow items={items.slice(0, half)} direction={1} />
          <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.2), transparent)' }} />
          <CarouselRow items={items.slice(half)} direction={-1} />
        </div>

        <p className="text-center font-body text-silver mt-12" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
          E altri 80+ partner internazionali nei tre settori.
        </p>
      </div>
    </section>
  )
}