'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { FileCheck, Files, GraduationCap, Award, ChevronRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const opzioni = [
  {
    tipo: 'Esame Singolo',
    prezzo: 450,
    risparmio: null,
    icon: FileCheck,
    desc: 'Un esame a scelta del destinatario',
    colore: '#8E8E93',
  },
  {
    tipo: 'Pacchetto 5 Esami',
    prezzo: 2000,
    risparmio: 250,
    icon: Files,
    desc: 'Ideale per coprire un semestre',
    colore: '#1B4332',
  },
  {
    tipo: 'Semestre Completo',
    prezzo: 6000,
    risparmio: null,
    icon: GraduationCap,
    desc: 'Tutti gli esami + tirocinio di un semestre',
    colore: '#8B3A3A',
    popular: true,
  },
  {
    tipo: 'Anno Completo',
    prezzo: 12000,
    risparmio: null,
    icon: Award,
    desc: 'Un anno intero di Voire',
    colore: '#C9A227',
  },
]

const steps = [
  { n: '01', t: 'Ricevi l\'email', d: 'Il destinatario riceve l\'email con il codice regalo.' },
  { n: '02', t: 'Crea un account', d: 'Accede a Voire o usa il suo account esistente.' },
  { n: '03', t: 'Inserisce il codice', d: 'Va nella sezione Pagamenti e inserisce il codice.' },
  { n: '04', t: 'Credito applicato', d: 'Il credito viene applicato automaticamente.' },
]

export default function GiftCardPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState<number | null>(null)
  const [form, setForm] = useState({
    nomeDestinatario: '',
    emailDestinatario: '',
    messaggio: '',
    dataInvio: '',
    nomeMittente: '',
    emailMittente: '',
  })
  const [preview, setPreview] = useState(false)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })

    stepsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })
  }, [])

  const selectedOption = selected !== null ? opzioni[selected] : null

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative pt-48 pb-32 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div ref={titleRef} className="max-w-7xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Gift Card
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Regala il futuro.
            <br />
            <span className="text-gold italic">Un esame alla volta.</span>
          </h1>
          <p className="font-body text-silver text-xl leading-relaxed max-w-2xl">
            Le Gift Card Voire permettono di regalare singoli esami, semestri o l'intero percorso di laurea. Il regalo più prezioso che esista.
          </p>
        </div>
      </div>

      {/* Wizard */}
      <div className="pb-40 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">

          {/* Progress steps */}
          <div className="flex items-center gap-0 mb-16 border-b border-smoke pb-8">
            {['Scegli', 'Personalizza', 'Anteprima', 'Pagamento'].map((s, i) => (
              <div key={i} className="flex items-center gap-0 flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold shrink-0 transition-all duration-300"
                    style={{
                      background: step > i + 1 ? '#C9A227' : step === i + 1 ? '#C9A227' : 'rgba(44,44,46,1)',
                      color: step >= i + 1 ? '#0A0A0A' : '#8E8E93',
                      border: step === i + 1 ? '2px solid #C9A227' : '2px solid transparent',
                    }}>
                    {step > i + 1 ? <Check size={12} /> : i + 1}
                  </div>
                  <span className="font-body uppercase hidden md:block transition-colors duration-300"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: step === i + 1 ? '#C9A227' : '#8E8E93' }}>
                    {s}
                  </span>
                </div>
                {i < 3 && <div className="h-px flex-1 mx-4" style={{ background: step > i + 1 ? '#C9A227' : 'rgba(44,44,46,1)' }} />}
              </div>
            ))}
          </div>

          {/* Step 1 — Scegli */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-ivory mb-12" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                Cosa vuoi regalare?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {opzioni.map((op, i) => {
                  const Icon = op.icon
                  return (
                    <div
                      key={i}
                      ref={el => { if (el) cardsRef.current[i] = el }}
                      className="relative border p-8 cursor-pointer transition-all duration-300"
                      style={{
                        opacity: 0,
                        borderColor: selected === i ? op.colore : 'rgba(44,44,46,1)',
                        background: selected === i ? `${op.colore}08` : 'transparent',
                        boxShadow: selected === i ? `0 0 30px ${op.colore}15` : 'none',
                      }}
                      onClick={() => setSelected(i)}
                    >
                      {op.popular && (
                        <div className="absolute -top-3 left-6 px-3 py-1 font-body uppercase text-noir"
                          style={{ fontSize: '0.5rem', letterSpacing: '0.2em', background: op.colore }}>
                          Più regalato
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 flex items-center justify-center"
                          style={{ background: `${op.colore}15`, border: `1px solid ${op.colore}30` }}>
                          <Icon size={22} style={{ color: op.colore }} />
                        </div>
                        {selected === i && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: op.colore }}>
                            <Check size={12} className="text-noir" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-display text-ivory text-xl mb-2" style={{ letterSpacing: '-0.01em' }}>
                        {op.tipo}
                      </h3>
                      <p className="font-body text-silver/60 text-sm mb-4">{op.desc}</p>
                      <div className="flex items-end gap-2">
                        <span className="font-display text-gold text-3xl" style={{ letterSpacing: '-0.02em' }}>
                          €{op.prezzo.toLocaleString()}
                        </span>
                        {op.risparmio && (
                          <span className="font-body text-green-400 text-xs mb-1">
                            risparmi €{op.risparmio}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => selected !== null && setStep(2)}
                  className="flex items-center gap-3 font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 disabled:opacity-40"
                  disabled={selected === null}
                >
                  Continua
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Personalizza */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-ivory mb-12" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                Personalizza il regalo.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Nome destinatario', key: 'nomeDestinatario', type: 'text', placeholder: 'A chi è destinato?' },
                  { label: 'Email destinatario', key: 'emailDestinatario', type: 'email', placeholder: 'Dove inviare la card' },
                  { label: 'Il tuo nome', key: 'nomeMittente', type: 'text', placeholder: 'Chi fa il regalo?' },
                  { label: 'La tua email', key: 'emailMittente', type: 'email', placeholder: 'Per la conferma' },
                  { label: 'Data di invio', key: 'dataInvio', type: 'date', placeholder: '' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full border border-smoke text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                      style={{ background: 'rgba(28,28,30,0.8)' }}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                    Messaggio personale (opzionale)
                  </label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={form.messaggio}
                    onChange={e => setForm({ ...form, messaggio: e.target.value })}
                    placeholder="Scrivi un messaggio..."
                    className="w-full border border-smoke text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors duration-300 resize-none"
                    style={{ background: 'rgba(28,28,30,0.8)' }}
                  />
                  <p className="font-body text-silver/30 text-xs mt-1 text-right">{form.messaggio.length}/500</p>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)}
                  className="font-body text-silver border border-smoke px-10 py-4 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                  Indietro
                </button>
                <button onClick={() => setStep(3)}
                  className="flex items-center gap-3 font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300">
                  Anteprima
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Anteprima */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-ivory mb-12" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                Anteprima della card.
              </h2>

              {/* Card preview */}
              <div className="relative overflow-hidden mb-12 max-w-lg mx-auto"
                style={{
                  background: 'linear-gradient(135deg, #0A0A0A 0%, #1C1C1E 100%)',
                  border: `1px solid ${selectedOption?.colore}40`,
                  boxShadow: `0 0 60px ${selectedOption?.colore}15`,
                  aspectRatio: '1.6/1',
                  padding: '40px',
                }}>
                {/* Pattern di sfondo */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #C9A227 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }} />
                {/* Linea top */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: selectedOption?.colore }} />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-display text-ivory text-2xl tracking-[0.2em]">VOIRE</span>
                    <span className="font-body uppercase px-3 py-1"
                      style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: selectedOption?.colore, border: `1px solid ${selectedOption?.colore}40` }}>
                      Gift Card
                    </span>
                  </div>

                  <div>
                    {form.nomeDestinatario && (
                      <p className="font-body text-silver/50 text-xs mb-1">Un regalo per</p>
                    )}
                    <h3 className="font-display text-ivory text-2xl mb-1" style={{ letterSpacing: '-0.01em' }}>
                      {form.nomeDestinatario || 'Nome Destinatario'}
                    </h3>
                    {form.nomeMittente && (
                      <p className="font-body text-silver/40 text-xs">da {form.nomeMittente}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-body text-silver/30 text-xs mb-1 uppercase tracking-widest">Valore</p>
                      <span className="font-display text-gold text-3xl" style={{ letterSpacing: '-0.02em' }}>
                        €{selectedOption?.prezzo.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-silver/30 text-xs uppercase tracking-widest">Codice</p>
                      <p className="font-body text-ivory/40 text-sm tracking-widest">XXXX-XXXX-XXXX</p>
                      <p className="font-body text-silver/30 text-xs mt-1">Valida 24 mesi</p>
                    </div>
                  </div>
                </div>
              </div>

              {form.messaggio && (
                <div className="max-w-lg mx-auto mb-12 p-6 border border-smoke/50 italic">
                  <p className="font-body text-silver/60 text-sm leading-relaxed">"{form.messaggio}"</p>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => setStep(2)}
                  className="font-body text-silver border border-smoke px-10 py-4 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                  Indietro
                </button>
                <button onClick={() => setStep(4)}
                  className="flex items-center gap-3 font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300">
                  Procedi al pagamento
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Pagamento */}
          {step === 4 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: 'rgba(201,162,39,0.1)', border: '2px solid rgba(201,162,39,0.4)' }}>
                <Award size={32} className="text-gold" />
              </div>
              <h2 className="font-display text-ivory mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                Riepilogo ordine
              </h2>
              <p className="font-body text-silver/60 mb-4">{selectedOption?.tipo}</p>
              <div className="font-display text-gold text-5xl mb-12" style={{ letterSpacing: '-0.03em' }}>
                €{selectedOption?.prezzo.toLocaleString()}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    gsap.to('.order-complete', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
                    setStep(5)
                  }}
                  className="font-body text-noir bg-gold px-14 py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105">
                  Paga con Stripe
                </button>
                <button onClick={() => setStep(3)}
                  className="font-body text-silver border border-smoke px-10 py-5 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                  Indietro
                </button>
              </div>
            </div>
          )}

          {/* Step 5 — Conferma */}
          {step === 5 && (
            <div className="order-complete text-center py-20" style={{ opacity: 0 }}>
              <div className="text-6xl mb-8">🎁</div>
              <h2 className="font-display text-ivory mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
                Gift Card inviata!
              </h2>
              <p className="font-body text-silver/60 mb-2">
                La card è stata inviata a <span className="text-gold">{form.emailDestinatario}</span>
              </p>
              <p className="font-body text-silver/40 text-sm mb-12">
                Una copia è stata inviata a {form.emailMittente}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setStep(1); setSelected(null); setForm({ nomeDestinatario: '', emailDestinatario: '', messaggio: '', dataInvio: '', nomeMittente: '', emailMittente: '' }) }}
                  className="font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300">
                  Regala un'altra Card
                </button>
                <Link href="/"
                  className="font-body text-silver border border-smoke px-10 py-4 uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-300">
                  Torna alla home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Come funziona il riscatto */}
      <div className="py-40 px-6 md:px-20 border-t border-smoke"
        style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0A0A0A 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Come funziona
            </span>
            <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Il riscatto è semplice.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {steps.map((s, i) => (
              <div
                key={i}
                ref={el => { if (el) stepsRef.current[i] = el }}
                className="relative p-8 group"
                style={{ opacity: 0, borderRight: i < 3 ? '1px solid rgba(44,44,46,0.5)' : 'none' }}
              >
                <div className="font-display text-gold/15 group-hover:text-gold/30 transition-colors duration-500 mb-6"
                  style={{ fontSize: '4rem', lineHeight: 1 }}>
                  {s.n}
                </div>
                <div className="h-px w-8 bg-gold/20 group-hover:bg-gold group-hover:w-16 transition-all duration-500 mb-4" />
                <h3 className="font-display text-ivory text-lg mb-3 group-hover:text-gold transition-colors duration-300"
                  style={{ letterSpacing: '-0.01em' }}>
                  {s.t}
                </h3>
                <p className="font-body text-silver/60 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per le aziende */}
      <div className="py-40 px-6 md:px-20 bg-noir border-t border-smoke">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-xl">
            <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Per le aziende
            </span>
            <h2 className="font-display text-ivory mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Vuoi regalare Gift Card ai tuoi dipendenti?
            </h2>
            <p className="font-body text-silver/70 leading-relaxed mb-8">
              Sconti per volumi da 10+ Gift Card, personalizzazione con logo aziendale e fatturazione B2B disponibile.
            </p>
            <ul className="flex flex-col gap-3 mb-10">
              {['Sconto dal 10% per ordini 10+', 'Personalizzazione con logo', 'Fatturazione B2B', 'Consegna dedicata'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={14} className="text-gold shrink-0" />
                  <span className="font-body text-silver/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contatti"
              className="inline-block font-body text-noir bg-gold px-10 py-4 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300">
              Contattaci per un preventivo
            </Link>
          </div>

          <div className="relative w-full md:w-96 aspect-square overflow-hidden border border-smoke/30">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
              alt="Aziende"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.4) saturate(0.6)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)' }} />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-ivory text-xl italic" style={{ letterSpacing: '-0.01em' }}>
                "Il regalo più utile che abbia mai ricevuto."
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}