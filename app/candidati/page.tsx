'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { Check, ChevronRight, User, Mail, Phone, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const corsi = ['Architettura', 'Automotive Design', 'Gioielleria']
const piani = ['Standard', 'Accelerato']

export default function CandidatiPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nome: '', cognome: '', email: '', telefono: '',
    nazionalita: '', corso: '', piano: '',
    motivazione: '', privacy: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -Math.random() * 0.5 - 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      life: Math.random(),
    }))

    let animId: number
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.003
        if (p.life <= 0 || p.y < 0) { p.x = Math.random() * canvas.width; p.y = canvas.height; p.life = 1 }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,162,39,${p.opacity * p.life})`
        ctx.fill()
      })
      animId = requestAnimationFrame(loop)
    }
    loop()

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

    gsap.fromTo(formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' } }
    )

    return () => cancelAnimationFrame(animId)
  }, [])

  const handleSubmit = () => {
    if (!form.nome || !form.email || !form.corso || !form.privacy) return
    setSubmitted(true)
    gsap.fromTo('.success-anim',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
    )
  }

  const inputClass = "w-full border border-smoke/50 text-ivory px-4 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
  const inputStyle = { background: 'rgba(20,20,28,0.9)' }

  return (
    <main className="min-h-screen" style={{ background: '#050508' }}>
      <Cursor />
      <Header />

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden px-6 md:px-20">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 overflow-hidden">
          <img className="hero-img w-full h-[120%] object-cover absolute -top-[10%]"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
            alt="Candidati"
            style={{ filter: 'brightness(0.15) saturate(0.5)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050508 20%, rgba(5,5,8,0.4) 70%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,162,39,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div ref={titleRef} className="relative max-w-5xl" style={{ zIndex: 3, opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Candidatura · Il primo passo
            </span>
          </div>
          <h1 className="font-display text-ivory mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.02', letterSpacing: '-0.03em', textShadow: '0 0 60px rgba(201,162,39,0.15)' }}>
            Inizia il tuo
            <br />
            <span className="text-gold italic">percorso.</span>
          </h1>
          <p className="font-body text-silver/60 text-lg leading-relaxed max-w-xl">
            Compila il form di candidatura. Riceverai una conferma entro 24 ore con le istruzioni per prenotare il test d'ingresso.
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="px-6 md:px-20 py-8 border-b" style={{ borderColor: 'rgba(44,44,46,0.4)', background: '#080810' }}>
        <div className="max-w-3xl mx-auto flex items-center">
          {['Dati personali', 'Corso e piano', 'Motivazione'].map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold transition-all duration-300"
                  style={{
                    background: step > i + 1 ? '#C9A227' : step === i + 1 ? '#C9A227' : 'rgba(28,28,30,1)',
                    color: step >= i + 1 ? '#0A0A0A' : '#8E8E93',
                    boxShadow: step === i + 1 ? '0 0 15px rgba(201,162,39,0.5)' : 'none',
                  }}>
                  {step > i + 1 ? <Check size={12} /> : i + 1}
                </div>
                <span className="font-body uppercase hidden md:block"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: step === i + 1 ? '#C9A227' : '#8E8E93' }}>
                  {s}
                </span>
              </div>
              {i < 2 && <div className="h-px flex-1 mx-4 transition-colors duration-500"
                style={{ background: step > i + 1 ? '#C9A227' : 'rgba(44,44,46,0.5)' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div ref={formRef} className="py-32 px-6 md:px-20" style={{ opacity: 0, background: '#080810' }}>
        <div className="max-w-3xl mx-auto">

          {!submitted ? (
            <>
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-ivory mb-12"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                    Chi sei?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                      <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Nome</label>
                      <input type="text" placeholder="Il tuo nome" value={form.nome}
                        onChange={e => setForm({ ...form, nome: e.target.value })}
                        className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Cognome</label>
                      <input type="text" placeholder="Il tuo cognome" value={form.cognome}
                        onChange={e => setForm({ ...form, cognome: e.target.value })}
                        className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Email</label>
                      <input type="email" placeholder="la@tua.email" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Telefono</label>
                      <input type="tel" placeholder="+39 000 000 0000" value={form.telefono}
                        onChange={e => setForm({ ...form, telefono: e.target.value })}
                        className={inputClass} style={inputStyle} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Nazionalità</label>
                      <input type="text" placeholder="Es. Italiana" value={form.nazionalita}
                        onChange={e => setForm({ ...form, nazionalita: e.target.value })}
                        className={inputClass} style={inputStyle} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => form.nome && form.email && setStep(2)}
                      disabled={!form.nome || !form.email}
                      className="flex items-center gap-3 font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 disabled:opacity-40"
                      style={{ boxShadow: form.nome && form.email ? '0 0 20px rgba(201,162,39,0.3)' : 'none' }}>
                      Continua <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-ivory mb-12"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                    Cosa vuoi studiare?
                  </h2>

                  <div className="mb-8">
                    <label className="font-body text-silver/40 uppercase block mb-4" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                      Corso di interesse
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {corsi.map((c) => (
                        <div key={c}
                          className="border p-6 cursor-pointer transition-all duration-300 text-center"
                          style={{
                            borderColor: form.corso === c ? '#C9A227' : 'rgba(44,44,46,0.6)',
                            background: form.corso === c ? 'rgba(201,162,39,0.05)' : 'transparent',
                            boxShadow: form.corso === c ? '0 0 20px rgba(201,162,39,0.15)' : 'none',
                          }}
                          onClick={() => setForm({ ...form, corso: c })}>
                          <div className="font-display text-ivory text-sm" style={{ letterSpacing: '-0.01em', color: form.corso === c ? '#C9A227' : '#FAF9F6' }}>
                            {c}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="font-body text-silver/40 uppercase block mb-4" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                      Piano di studi
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {piani.map((p) => (
                        <div key={p}
                          className="border p-6 cursor-pointer transition-all duration-300"
                          style={{
                            borderColor: form.piano === p ? '#C9A227' : 'rgba(44,44,46,0.6)',
                            background: form.piano === p ? 'rgba(201,162,39,0.05)' : 'transparent',
                          }}
                          onClick={() => setForm({ ...form, piano: p })}>
                          <div className="font-display text-ivory text-lg mb-1" style={{ color: form.piano === p ? '#C9A227' : '#FAF9F6' }}>
                            {p}
                          </div>
                          <div className="font-body text-silver/40 text-xs">
                            {p === 'Standard' ? 'Percorso completo' : 'Per chi ha già background tecnico'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(1)}
                      className="font-body text-silver border border-smoke/40 px-10 py-4 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                      Indietro
                    </button>
                    <button onClick={() => form.corso && form.piano && setStep(3)}
                      disabled={!form.corso || !form.piano}
                      className="flex items-center gap-3 font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 disabled:opacity-40">
                      Continua <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-ivory mb-12"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                    Convincici.
                  </h2>

                  <div className="mb-6">
                    <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                      Perché vuoi entrare in Voire? (max 500 caratteri)
                    </label>
                    <textarea rows={6} maxLength={500}
                      placeholder="Racconta chi sei, cosa hai fatto, perché vuoi studiare qui..."
                      value={form.motivazione}
                      onChange={e => setForm({ ...form, motivazione: e.target.value })}
                      className="w-full border border-smoke/50 text-ivory px-4 py-4 font-body text-sm outline-none focus:border-gold transition-colors duration-300 resize-none"
                      style={{ background: 'rgba(20,20,28,0.9)' }} />
                    <p className="font-body text-silver/20 text-xs mt-1 text-right">{form.motivazione.length}/500</p>
                  </div>

                  <div className="flex items-start gap-3 mb-10 cursor-pointer" onClick={() => setForm({ ...form, privacy: !form.privacy })}>
                    <div className="w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300"
                      style={{ borderColor: form.privacy ? '#C9A227' : 'rgba(44,44,46,0.6)', background: form.privacy ? '#C9A227' : 'transparent' }}>
                      {form.privacy && <Check size={12} className="text-noir" />}
                    </div>
                    <p className="font-body text-silver/40 text-xs leading-relaxed">
                      Accetto il trattamento dei dati personali ai sensi del GDPR e la{' '}
                      <Link href="#" className="text-gold hover:underline">Privacy Policy</Link> di Voire.
                    </p>
                  </div>

                  {/* Riepilogo */}
                  <div className="border border-smoke/30 p-6 mb-8" style={{ background: 'rgba(20,20,28,0.5)' }}>
                    <p className="font-body text-silver/40 uppercase mb-3" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Riepilogo candidatura</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { l: 'Nome', v: `${form.nome} ${form.cognome}` },
                        { l: 'Email', v: form.email },
                        { l: 'Corso', v: form.corso },
                        { l: 'Piano', v: form.piano },
                      ].map((item, i) => (
                        <div key={i}>
                          <span className="font-body text-silver/30 text-xs uppercase tracking-widest">{item.l}: </span>
                          <span className="font-body text-ivory text-xs">{item.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(2)}
                      className="font-body text-silver border border-smoke/40 px-10 py-4 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                      Indietro
                    </button>
                    <button onClick={handleSubmit}
                      disabled={!form.privacy}
                      className="flex items-center gap-3 font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 disabled:opacity-40"
                      style={{ boxShadow: form.privacy ? '0 0 20px rgba(201,162,39,0.3)' : 'none' }}>
                      Invia candidatura <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="success-anim text-center py-20" style={{ opacity: 0 }}>
              <div className="text-7xl mb-8">🎯</div>
              <h2 className="font-display text-ivory mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
                Candidatura ricevuta.
              </h2>
              <p className="font-body text-silver/50 mb-3 text-lg">
                Benvenuto nel processo di selezione, <span className="text-gold">{form.nome}</span>.
              </p>
              <p className="font-body text-silver/40 mb-12 max-w-md mx-auto">
                Riceverai una email a <span className="text-gold">{form.email}</span> entro 24 ore con le istruzioni per prenotare il test d'ingresso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ammissioni/test-ingresso"
                  className="font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300"
                  style={{ boxShadow: '0 0 20px rgba(201,162,39,0.3)' }}>
                  Prenota il test
                </Link>
                <Link href="/"
                  className="font-body text-silver border border-smoke/40 px-10 py-4 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                  Torna alla home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}