'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import {
  LayoutDashboard, BookOpen, FileCheck, MessageSquare,
  Briefcase, Image, Sword, CreditCard, User,
  Bell, ChevronRight, TrendingUp, Calendar, Award, Zap, Flame,
  Wind
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: BookOpen, label: 'Lezioni', href: '#' },
  { icon: FileCheck, label: 'Esami', href: '#' },
  { icon: MessageSquare, label: 'Revisioni', href: '#' },
  { icon: Briefcase, label: 'Tirocinio', href: '#' },
  { icon: Image, label: 'Portfolio', href: '#' },
  { icon: Sword, label: 'Arena', href: '/arena' },
  { icon: Wind, label: 'Mindspace', href: '/area-studente/mindspace' },
  { icon: CreditCard, label: 'Pagamenti', href: '#' },
  { icon: User, label: 'Profilo', href: '#' },
]

const prossimi = [
  { tipo: 'Lezione', titolo: 'Laboratorio di Progettazione III', data: 'Oggi 18:00', docente: 'Sofia Conti', colore: '#1B4332', icon: BookOpen },
  { tipo: 'Esame', titolo: 'Statica e Scienza delle Costruzioni', data: 'Domani 10:00', docente: 'Prof. Bianchi', colore: '#8B3A3A', icon: FileCheck },
  { tipo: 'Revisione', titolo: 'Revisione progetto semestrale', data: '28 Maggio 14:00', docente: 'Elena Marchetti', colore: '#C9A227', icon: MessageSquare },
]

const accessi = [
  { icon: MessageSquare, label: 'Prenota revisione', colore: '#C9A227' },
  { icon: Calendar, label: 'Calendario esami', colore: '#1B4332' },
  { icon: CreditCard, label: 'Paga rata', colore: '#8B3A3A' },
  { icon: Image, label: 'Carica progetto', colore: '#C9A227' },
  { icon: Sword, label: "Vai all'Arena", colore: '#1B4332', href: '/arena' },
  { icon: MessageSquare, label: 'Contatta supporto', colore: '#8B3A3A' },
]

const notifiche = [
  { testo: 'Nuovo brief Arena disponibile: Design Sprint #12', tempo: '2 ore fa', letto: false },
  { testo: 'Sofia Conti ha commentato il tuo progetto', tempo: '5 ore fa', letto: false },
  { testo: 'Reminder: esame Statica domani alle 10:00', tempo: '1 giorno fa', letto: true },
  { testo: 'Pininfarina ha visualizzato il tuo dossier', tempo: '2 giorni fa', letto: true },
  { testo: 'CFU bonus +0.5 per Quiz Battle', tempo: '3 giorni fa', letto: true },
]

export default function AreaStudentePage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notificheOpen, setNotificheOpen] = useState(false)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Canvas particelle
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.3 - 0.1,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.3 + 0.05,
      life: Math.random(),
      color: Math.random() > 0.5 ? '201,162,39' : Math.random() > 0.5 ? '27,67,50' : '139,58,58',
    }))

    let animId: number
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.002
        if (p.life <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height
          p.life = 1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.opacity * p.life})`
        ctx.fill()
      })
      animId = requestAnimationFrame(loop)
    }
    loop()

    gsap.fromTo(mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08 }
      )
    })

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <main className="min-h-screen flex relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <Cursor />

      {/* Canvas particelle globale */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Immagini sfumate di sfondo */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Immagine architettura sfumata in alto a destra */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
            alt="" className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.08) saturate(0.4)', mixBlendMode: 'luminosity' }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at top right, transparent 20%, #0A0A0A 70%)',
          }} />
        </div>
        {/* Immagine automotive sfumata in basso a sinistra */}
        <div className="absolute bottom-0 left-[260px] w-[500px] h-[400px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
            alt="" className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.06) saturate(0.3)', mixBlendMode: 'luminosity' }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at bottom left, transparent 10%, #0A0A0A 65%)',
          }} />
        </div>
        {/* Orb dorato centrale */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)' }} />
        {/* Orb verde */}
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(27,67,50,0.05) 0%, transparent 70%)' }} />
        {/* Grid sottile */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300"
        style={{
          width: sidebarOpen ? '260px' : '70px',
          background: 'rgba(8,8,12,0.95)',
          borderRight: '1px solid rgba(201,162,39,0.08)',
          backdropFilter: 'blur(20px)',
        }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8 border-b"
          style={{ borderColor: 'rgba(201,162,39,0.08)' }}>
          <Link href="/" className="font-display text-ivory tracking-[0.2em] hover:text-gold transition-colors duration-300"
            style={{ fontSize: sidebarOpen ? '1.3rem' : '1rem', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {sidebarOpen ? 'VOIRE' : 'V'}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon
            return (
              <Link key={i} href={item.href}
                className="flex items-center gap-4 px-5 py-3.5 transition-all duration-200 group relative"
                style={{
                  color: item.active ? '#C9A227' : '#8E8E93',
                  background: item.active ? 'rgba(201,162,39,0.06)' : 'transparent',
                  borderLeft: item.active ? '2px solid #C9A227' : '2px solid transparent',
                }}>
                {item.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ background: '#C9A227', boxShadow: '0 0 8px rgba(201,162,39,0.6)' }} />
                )}
                <Icon size={17} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
                {sidebarOpen && (
                  <span className="font-body uppercase whitespace-nowrap transition-colors duration-200 group-hover:text-ivory"
                    style={{ fontSize: '0.62rem', letterSpacing: '0.15em' }}>
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User info */}
        {sidebarOpen && (
          <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(201,162,39,0.08)' }}>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                alt="Sofia" className="w-8 h-8 rounded-full object-cover"
                style={{ border: '1px solid rgba(201,162,39,0.3)' }} />
              <div>
                <div className="font-body text-ivory text-xs">Sofia M.</div>
                <div className="font-body text-silver/30 text-xs" style={{ fontSize: '0.55rem' }}>Architettura · Anno 2</div>
              </div>
            </div>
          </div>
        )}

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center p-4 border-t transition-colors duration-200 hover:text-gold"
          style={{ borderColor: 'rgba(201,162,39,0.08)', color: '#8E8E93' }}>
          <ChevronRight size={16} style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
        </button>
      </aside>

      {/* Contenuto principale */}
      <div ref={mainRef} className="flex-1 flex flex-col min-h-screen transition-all duration-300 relative"
        style={{ marginLeft: sidebarOpen ? '260px' : '70px', opacity: 0, zIndex: 1 }}>

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 border-b"
          style={{
            background: 'rgba(8,8,12,0.9)',
            borderColor: 'rgba(201,162,39,0.08)',
            backdropFilter: 'blur(20px)',
          }}>
          <div>
            <h1 className="font-display text-ivory text-xl" style={{ letterSpacing: '-0.01em' }}>
              Ciao, <span className="text-gold" style={{ textShadow: '0 0 20px rgba(201,162,39,0.4)' }}>Sofia</span> 👋
            </h1>
            <p className="font-body text-silver/30 text-xs mt-0.5">Architettura · Anno 2 · Semestre 3</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setNotificheOpen(!notificheOpen)}
                className="relative w-10 h-10 flex items-center justify-center border transition-all duration-200 hover:border-gold hover:text-gold"
                style={{ borderColor: 'rgba(201,162,39,0.15)', color: '#8E8E93' }}>
                <Bell size={16} />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: '#C9A227', boxShadow: '0 0 8px rgba(201,162,39,0.6)' }}>
                  <span className="font-body text-noir" style={{ fontSize: '0.5rem', fontWeight: 'bold' }}>2</span>
                </div>
              </button>

              {notificheOpen && (
                <div className="absolute right-0 top-12 w-80 border shadow-2xl z-50"
                  style={{ background: 'rgba(8,8,12,0.98)', borderColor: 'rgba(201,162,39,0.15)', backdropFilter: 'blur(20px)' }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(201,162,39,0.08)' }}>
                    <span className="font-body text-gold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>Notifiche</span>
                  </div>
                  {notifiche.map((n, i) => (
                    <div key={i} className="px-4 py-3 border-b transition-colors duration-200 hover:bg-white/2 cursor-default"
                      style={{ borderColor: 'rgba(44,44,46,0.3)', background: !n.letto ? 'rgba(201,162,39,0.03)' : 'transparent' }}>
                      <div className="flex items-start gap-3">
                        {!n.letto && <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                          style={{ background: '#C9A227', boxShadow: '0 0 6px rgba(201,162,39,0.6)' }} />}
                        <div className={n.letto ? 'pl-4' : ''}>
                          <p className="font-body text-xs leading-relaxed" style={{ color: n.letto ? '#8E8E93' : '#FAF9F6' }}>
                            {n.testo}
                          </p>
                          <p className="font-body text-silver/30 text-xs mt-1">{n.tempo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Sofia" className="w-10 h-10 rounded-full object-cover cursor-pointer"
              style={{ border: '2px solid rgba(201,162,39,0.4)', boxShadow: '0 0 10px rgba(201,162,39,0.2)' }} />
          </div>
        </header>

        {/* Dashboard */}
        <div className="flex-1 p-8 overflow-auto">

          {/* Stats row */}
          <div ref={el => { if (el) cardsRef.current[0] = el }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" style={{ opacity: 0 }}>
            {[
              { label: 'Media voti', val: '28.4', icon: TrendingUp, color: '#C9A227', img: null },
              { label: 'CFU totali', val: '84/180', icon: Award, color: '#1B4332', img: null },
              { label: 'CFU Arena', val: '+12', icon: Zap, color: '#8B3A3A', img: null },
              { label: 'Rank Arena', val: '#4', icon: Sword, color: '#C9A227', img: null },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="relative overflow-hidden border p-5 group hover:border-opacity-50 transition-all duration-300"
                  style={{
                    borderColor: `${s.color}20`,
                    background: 'rgba(10,10,14,0.8)',
                    boxShadow: `0 0 20px ${s.color}05`,
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: s.color, opacity: 0.4 }} />
                  <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 80% 20%, ${s.color}08, transparent 60%)` }} />
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <div className="w-8 h-8 flex items-center justify-center"
                      style={{ background: `${s.color}15` }}>
                      <Icon size={15} style={{ color: s.color }} />
                    </div>
                  </div>
                  <div className="font-display relative z-10" style={{ fontSize: '1.8rem', letterSpacing: '-0.02em', color: s.color, textShadow: `0 0 15px ${s.color}30` }}>
                    {s.val}
                  </div>
                  <div className="font-body text-silver/30 text-xs uppercase tracking-widest mt-1 relative z-10" style={{ fontSize: '0.5rem' }}>
                    {s.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progresso semestre */}
          <div ref={el => { if (el) cardsRef.current[1] = el }}
            className="relative overflow-hidden border p-6 mb-6"
            style={{ opacity: 0, borderColor: 'rgba(201,162,39,0.12)', background: 'rgba(10,10,14,0.8)' }}>
            <div className="absolute inset-0 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=50"
                alt="" className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.04) saturate(0.3)', mixBlendMode: 'luminosity' }} />
              <div className="absolute inset-0" style={{ background: 'rgba(10,10,14,0.92)' }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-silver/40 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                  Semestre 3 — Settimana 8 di 18
                </span>
                <span className="font-body text-gold font-bold">44%</span>
              </div>
              <div className="h-1.5 mb-2 overflow-hidden" style={{ background: 'rgba(44,44,46,0.4)' }}>
                <div className="h-full transition-all duration-1000"
                  style={{ width: '44%', background: 'linear-gradient(to right, #C9A227, #E8D48A)', boxShadow: '0 0 10px rgba(201,162,39,0.5)' }} />
              </div>
              <p className="font-body text-silver/30 text-xs">10 settimane al termine del semestre</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* Prossimi impegni */}
            <div ref={el => { if (el) cardsRef.current[2] = el }}
              className="relative overflow-hidden border p-6"
              style={{ opacity: 0, borderColor: 'rgba(201,162,39,0.1)', background: 'rgba(10,10,14,0.8)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(27,67,50,0.08) 0%, transparent 70%)' }} />
              </div>
              <h3 className="font-display text-ivory text-lg mb-6 flex items-center gap-3 relative z-10" style={{ letterSpacing: '-0.01em' }}>
                <Calendar size={16} className="text-gold" />
                Prossimi impegni
              </h3>
              <div className="flex flex-col gap-3 relative z-10">
                {prossimi.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 border-l-2 transition-all duration-200 hover:bg-white/2 cursor-default group"
                      style={{ borderColor: p.colore, background: `${p.colore}05` }}>
                      <div className="w-8 h-8 flex items-center justify-center shrink-0"
                        style={{ background: `${p.colore}15` }}>
                        <Icon size={14} style={{ color: p.colore }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-body uppercase mb-1" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: p.colore }}>
                          {p.tipo}
                        </div>
                        <p className="font-body text-ivory text-sm truncate group-hover:text-gold transition-colors duration-200">{p.titolo}</p>
                        <p className="font-body text-silver/30 text-xs mt-0.5">{p.docente} · {p.data}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Accessi rapidi */}
            <div ref={el => { if (el) cardsRef.current[3] = el }}
              className="relative overflow-hidden border p-6"
              style={{ opacity: 0, borderColor: 'rgba(201,162,39,0.1)', background: 'rgba(10,10,14,0.8)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(139,58,58,0.06) 0%, transparent 70%)' }} />
              </div>
              <h3 className="font-display text-ivory text-lg mb-6 flex items-center gap-3 relative z-10" style={{ letterSpacing: '-0.01em' }}>
                <Zap size={16} className="text-gold" />
                Accessi rapidi
              </h3>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {accessi.map((a, i) => {
                  const Icon = a.icon
                  return (
                    <Link key={i} href={a.href || '#'}
                      className="flex items-center gap-3 p-4 border transition-all duration-200 group"
                      style={{ borderColor: 'rgba(44,44,46,0.4)', background: 'rgba(5,5,8,0.5)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = a.colore + '50' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(44,44,46,0.4)' }}>
                      <div className="w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ background: `${a.colore}15` }}>
                        <Icon size={14} style={{ color: a.colore }} />
                      </div>
                      <span className="font-body text-silver/50 text-xs group-hover:text-ivory transition-colors duration-200">
                        {a.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Tirocinio */}
          <div ref={el => { if (el) cardsRef.current[4] = el }}
            className="relative overflow-hidden border p-6"
            style={{ opacity: 0, borderColor: 'rgba(27,67,50,0.3)', background: 'rgba(10,10,14,0.8)' }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=50"
                alt="" className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.05) saturate(0.3)', mixBlendMode: 'luminosity' }} />
              <div className="absolute inset-0" style={{ background: 'rgba(10,10,14,0.92)' }} />
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: '#1B4332', opacity: 0.5 }} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center border shrink-0"
                  style={{ borderColor: 'rgba(27,67,50,0.4)', background: 'rgba(27,67,50,0.1)' }}>
                  <Briefcase size={24} style={{ color: '#1B4332' }} />
                </div>
                <div>
                  <div className="font-body uppercase mb-1" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#1B4332' }}>
                    Tirocinio 3 · In corso
                  </div>
                  <h4 className="font-display text-ivory text-xl mb-1" style={{ letterSpacing: '-0.01em' }}>
                    Foster + Partners
                  </h4>
                  <p className="font-body text-silver/40 text-sm">Londra, UK · Dal 1 Aprile 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {[
                  { val: '6', label: 'CFU' },
                  { val: '8', label: 'Settimane rimaste' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-gold text-2xl mb-1" style={{ letterSpacing: '-0.02em' }}>{item.val}</div>
                    <div className="font-body text-silver/30 uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>{item.label}</div>
                  </div>
                ))}
                <div className="px-3 py-1.5 font-body uppercase"
                  style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#1B4332', border: '1px solid rgba(27,67,50,0.4)', background: 'rgba(27,67,50,0.1)', boxShadow: '0 0 10px rgba(27,67,50,0.2)' }}>
                  Attivo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}