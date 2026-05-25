'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { Check, Play, BookOpen, Users, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const incluso = [
  { icon: Play, titolo: 'Lezioni di prova', desc: '3 lezioni complete per ogni corso — Architettura, Automotive, Gioielleria.', colore: '#C9A227' },
  { icon: BookOpen, titolo: 'Materiali didattici', desc: 'Accesso ai syllabus completi e ai materiali del primo semestre.', colore: '#1B4332' },
  { icon: Users, titolo: 'Sessione con un docente', desc: 'Una revisione di 30 minuti con un docente del corso che preferisci.', colore: '#8B3A3A' },
  { icon: Award, titolo: 'Un esame incluso', desc: 'Sostieni un esame vero. Se lo superi, il voto vale nel tuo percorso.', colore: '#C9A227' },
]

export default function ProvaGratuitaPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const formRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ nome: '', email: '', corso: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const heroImg = heroRef.current?.querySelector('.hero-img')
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.3 }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      )
    })

    gsap.fromTo(formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <main className="min-h-screen" style={{ background: '#050508' }}>
      <Cursor />
      <Header />

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen flex items-end pb-32 overflow-hidden px-6 md:px-20">
        <div className="absolute inset-0 overflow-hidden">
          <img className="hero-img w-full h-[120%] object-cover absolute -top-[10%]"
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1920&q=80"
            alt="Prova gratuita"
            style={{ filter: 'brightness(0.2) saturate(0.6)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050508 20%, rgba(5,5,8,0.5) 70%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(27,67,50,0.15) 0%, transparent 70%)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(27,67,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div ref={titleRef} className="relative max-w-5xl" style={{ zIndex: 3, opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12" style={{ background: '#1B4332' }} />
            <span className="font-body uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#1B4332' }}>
              Prova Gratuita · Nessun rischio
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.0', letterSpacing: '-0.03em' }}>
            Prova prima.
            <br />
            <span style={{ color: '#1B4332' }} className="italic">Decidi dopo.</span>
          </h1>
          <div className="h-px w-full max-w-xl mb-8" style={{ background: 'linear-gradient(to right, #1B4332, transparent)' }} />
          <p className="font-body text-silver/70 text-xl leading-relaxed max-w-2xl">
            Un semestre di accesso completo. Lezioni vere, docenti veri, un esame vero. Nessun costo, nessun impegno. Solo la certezza di fare la scelta giusta.
          </p>
        </div>
      </div>

      {/* Cosa include */}
      <div className="py-40 px-6 md:px-20" style={{ background: '#080810' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#1B4332' }}>
              Cosa include
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw', letterSpacing: '-0.02em' }}>
              Un semestre completo. Gratis.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incluso.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  ref={el => { if (el) cardsRef.current[i] = el }}
                  className="relative overflow-hidden border p-10 group cursor-default transition-all duration-500"
                  style={{ opacity: 0, borderColor: 'rgba(44,44,46,0.6)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.colore + '50' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(44,44,46,0.6)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: item.colore }} />
                  <div className="w-14 h-14 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.colore}15`, border: `1px solid ${item.colore}30` }}>
                    <Icon size={24} style={{ color: item.colore }} />
                  </div>
                  <h3 className="font-display text-ivory text-xl mb-3 group-hover:text-gold transition-colors duration-300"
                    style={{ letterSpacing: '-0.01em' }}>
                    {item.titolo}
                  </h3>
                  <p className="font-body text-silver/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form registrazione */}
      <div ref={formRef} className="py-40 px-6 md:px-20 border-t border-smoke/20 relative overflow-hidden"
        style={{ opacity: 0, background: 'linear-gradient(135deg, #050508 0%, #0A0A12 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(27,67,50,0.08) 0%, transparent 70%)' }} />

        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <span className="font-body uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#1B4332' }}>
            Inizia ora
          </span>
          <h2 className="font-display text-ivory mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Accedi alla prova gratuita.
          </h2>
          <p className="font-body text-silver/50 mb-12">Nessuna carta di credito richiesta. Accesso immediato.</p>

          {!sent ? (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Il tuo nome" value={form.nome}
                  onChange={e => setForm({ ...form, nome: e.target.value })}
                  className="border border-smoke/50 text-ivory px-4 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                  style={{ background: 'rgba(20,20,28,0.8)' }} />
                <input type="email" placeholder="La tua email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-smoke/50 text-ivory px-4 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                  style={{ background: 'rgba(20,20,28,0.8)' }} />
              </div>
              <select value={form.corso} onChange={e => setForm({ ...form, corso: e.target.value })}
                className="border border-smoke/50 text-ivory px-4 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                style={{ background: 'rgba(20,20,28,0.8)' }}>
                <option value="">Scegli il corso di interesse</option>
                <option value="architettura">Architettura</option>
                <option value="automotive">Automotive Design</option>
                <option value="gioielleria">Gioielleria</option>
              </select>
              <button
                onClick={() => form.nome && form.email && form.corso && setSent(true)}
                className="font-body text-noir bg-gold py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105 mt-2"
                style={{ boxShadow: '0 0 30px rgba(27,67,50,0.3)' }}>
                Accedi gratis
              </button>
            </div>
          ) : (
            <div className="py-12">
              <div className="text-6xl mb-6">🎓</div>
              <h3 className="font-display text-ivory text-2xl mb-4">Benvenuto in Voire!</h3>
              <p className="font-body text-silver/50">
                Controlla la tua email <span style={{ color: '#1B4332' }}>{form.email}</span> per accedere alla prova gratuita.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="py-40 px-6 md:px-20 text-center border-t border-smoke/20" style={{ background: '#050508' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Convinto? Fai il passo successivo.
          </h2>
          <p className="font-body text-silver/50 mb-12 text-lg">
            Dopo la prova gratuita, prenota il test d'ingresso e candidati ufficialmente.
          </p>
          <Link href="/ammissioni/test-ingresso"
            className="inline-block font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 30px rgba(201,162,39,0.3)' }}>
            Prenota il test d'ingresso
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}