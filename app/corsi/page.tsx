'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

const corsi = [
  {
    slug: 'architettura',
    nome: 'Architettura',
    tipo: 'Laurea Magistrale',
    cfu: 300,
    durata: '5 anni',
    durata_acc: '3 anni',
    colore: '#1B4332',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    desc: 'Dal progetto alla costruzione. Il percorso completo che forma i grandi architetti del futuro.',
    aziende: ['Foster + Partners', 'Zaha Hadid', 'Renzo Piano', 'Stefano Boeri'],
  },
  {
    slug: 'automotive-design',
    nome: 'Automotive Design',
    tipo: 'Laurea Triennale',
    cfu: 180,
    durata: '3 anni',
    durata_acc: '2 anni',
    colore: '#8B3A3A',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    desc: 'Dal concept sketch alla superficie Classe A. Per chi vuole disegnare le auto del futuro.',
    aziende: ['Ferrari', 'Lamborghini', 'Pininfarina', 'Porsche'],
  },
  {
    slug: 'gioielleria',
    nome: 'Gioielleria',
    tipo: 'Laurea Triennale',
    cfu: 180,
    durata: '3 anni',
    durata_acc: '2 anni',
    colore: '#C9A227',
    img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80',
    desc: "Dall'idea al gioiello finito. Cultura gemmologica, padronanza tecnica e visione creativa.",
    aziende: ['Bulgari', 'Cartier', 'Van Cleef & Arpels', 'Chopard'],
  },
]

export default function CorsiPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const router = useRouter()
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      )
    })
  }, [])

  const handleEnter = (i: number) => {
    setHovered(i)
    const card = cardsRef.current[i]
    gsap.to(card.querySelector('.c-img'), { scale: 1.06, filter: 'brightness(0.7) saturate(1.2)', duration: 0.8, ease: 'power2.out' })
    gsap.to(card.querySelector('.c-overlay'), { opacity: 1, duration: 0.4 })
    gsap.to(card.querySelector('.c-cta'), { opacity: 1, y: 0, duration: 0.4 })
    gsap.to(card.querySelector('.c-aziende'), { opacity: 1, y: 0, duration: 0.4, delay: 0.05 })
  }

  const handleLeave = (i: number) => {
    setHovered(null)
    const card = cardsRef.current[i]
    gsap.to(card.querySelector('.c-img'), { scale: 1, filter: 'brightness(0.5) saturate(0.7)', duration: 0.8, ease: 'power2.out' })
    gsap.to(card.querySelector('.c-overlay'), { opacity: 0, duration: 0.4 })
    gsap.to(card.querySelector('.c-cta'), { opacity: 0, y: 10, duration: 0.3 })
    gsap.to(card.querySelector('.c-aziende'), { opacity: 0, y: 10, duration: 0.3 })
  }

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative pt-48 pb-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div ref={titleRef} className="max-w-7xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Tre lauree d'élite
            </span>
          </div>
          <h1 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Mai viste online.
            <br />
            <span className="text-gold italic">Fino ad ora.</span>
          </h1>
          <p className="font-body text-silver/70 text-xl leading-relaxed max-w-2xl">
            Tre percorsi di laurea unici in Italia. Docenti verificabili, tirocini ogni semestre, aziende partner che investono su di te.
          </p>
        </div>
      </div>

      {/* Cards corsi grandi */}
      <div className="pb-40 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {corsi.map((c, i) => (
            <div
              key={c.slug}
              ref={el => { if (el) cardsRef.current[i] = el }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ opacity: 0, height: '500px' }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={() => router.push(`/corsi/${c.slug}`)}
            >
              {/* Immagine */}
              <img className="c-img absolute inset-0 w-full h-full object-cover"
                src={c.img} alt={c.nome}
                style={{ filter: 'brightness(0.5) saturate(0.7)' }} />

              {/* Overlay colore */}
              <div className="c-overlay absolute inset-0" style={{
                opacity: 0,
                background: `linear-gradient(135deg, ${c.colore}20, transparent 60%)`,
              }} />

              {/* Overlay fisso */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)',
              }} />

              {/* Linea colore sinistra */}
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: c.colore }} />

              {/* Numero grande */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 font-display text-ivory/5 select-none"
                style={{ fontSize: '12rem', lineHeight: 1 }}>
                0{i + 1}
              </div>

              {/* Contenuto */}
              <div className="absolute inset-0 flex flex-col justify-center px-16">
                <span className="font-body uppercase mb-4 block" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: c.colore }}>
                  {c.tipo} · {c.cfu} CFU
                </span>
                <h2 className="font-display text-ivory mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {c.nome}
                </h2>
                <p className="font-body text-silver/60 text-lg leading-relaxed max-w-lg mb-2">
                  {c.desc}
                </p>

                <div className="flex gap-8 mt-2">
                  {[
                    { label: 'Standard', val: c.durata },
                    { label: 'Accelerato', val: c.durata_acc },
                  ].map((item, j) => (
                    <div key={j}>
                      <div className="font-body text-silver/30 uppercase mb-1" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>{item.label}</div>
                      <div className="font-display text-ivory text-xl" style={{ letterSpacing: '-0.01em' }}>{item.val}</div>
                    </div>
                  ))}
                </div>

                {/* Aziende — visibili su hover */}
                <div className="c-aziende mt-6 flex items-center gap-3" style={{ opacity: 0, transform: 'translateY(10px)' }}>
                  <span className="font-body text-silver/30 text-xs uppercase tracking-widest">Partner:</span>
                  {c.aziende.map((az, j) => (
                    <span key={j} className="font-body text-xs px-2 py-1"
                      style={{ color: c.colore, border: `1px solid ${c.colore}30`, background: `${c.colore}08`, fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                      {az}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="c-cta mt-8 flex items-center gap-3" style={{ opacity: 0, transform: 'translateY(10px)' }}>
                  <span className="font-body text-ivory uppercase tracking-widest text-xs border-b pb-1" style={{ borderColor: c.colore }}>
                    Scopri il corso →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confronto rapido */}
      <div className="py-24 px-6 md:px-20 border-t border-smoke"
        style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0A0A0A 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-ivory mb-12 text-center"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            Confronta i corsi
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(44,44,46,0.5)' }}>
                  <th className="text-left pb-4 font-body text-silver/40 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>Caratteristica</th>
                  {corsi.map(c => (
                    <th key={c.slug} className="pb-4 font-display text-ivory text-center"
                      style={{ letterSpacing: '-0.01em', color: c.colore }}>
                      {c.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Tipo', vals: ['Magistrale', 'Triennale', 'Triennale'] },
                  { label: 'CFU', vals: ['300', '180', '180'] },
                  { label: 'Durata standard', vals: ['5 anni', '3 anni', '3 anni'] },
                  { label: 'Durata accelerata', vals: ['3 anni', '2 anni', '2 anni'] },
                  { label: 'Tasse annue', vals: ['€12.000', '€12.000', '€12.000'] },
                  { label: 'Tirocini', vals: ['10', '6', '6'] },
                ].map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: 'rgba(44,44,46,0.3)' }}>
                    <td className="py-4 font-body text-silver/40 text-sm">{row.label}</td>
                    {row.vals.map((val, j) => (
                      <td key={j} className="py-4 font-body text-ivory text-sm text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-40 px-6 md:px-20 text-center bg-noir border-t border-smoke relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Non sai quale scegliere?
          </h2>
          <p className="font-body text-silver/60 mb-12 text-lg">
            Prova tutti e tre gratuitamente prima di decidere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ammissioni/prova-gratuita"
              className="inline-block font-body text-noir bg-gold px-12 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(201,162,39,0.3)' }}>
              Prova gratuita
            </Link>
            <Link href="/candidati"
              className="inline-block font-body text-gold border border-gold px-12 py-5 uppercase tracking-widest text-xs hover:bg-gold/10 transition-all duration-300">
              Candidati ora
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}