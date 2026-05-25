'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import { Zap, Trophy, Users, Star, Flame, Shield, Target, ChevronRight, Sword, Crown, Volume2, VolumeX } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const sfide = [
  {
    tipo: 'DESIGN SPRINT',
    titolo: 'Design Sprint',
    descrizione: 'Brief creativo. 48 ore. Nessuna scusa.',
    durata: '48:00:00',
    partecipanti: 23,
    maxPartecipanti: 40,
    cfu: '+2 CFU',
    icon: Zap,
    colore: '#C9A227',
    neon: '#C9A227',
    difficulty: 'HARD',
    live: true,
    img: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&q=80',
  },
  {
    tipo: 'QUIZ BATTLE',
    titolo: 'Quiz Battle',
    descrizione: '10 domande. 15 minuti. 1 solo vincitore.',
    durata: '00:15:00',
    partecipanti: 6,
    maxPartecipanti: 8,
    cfu: '+0.1 CFU',
    icon: Target,
    colore: '#FF4444',
    neon: '#FF4444',
    difficulty: 'MEDIUM',
    live: true,
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
  },
  {
    tipo: 'PORTFOLIO SHOWDOWN',
    titolo: 'Portfolio Showdown',
    descrizione: 'Il tuo lavoro contro tutti. La community decide.',
    durata: '12:45:22',
    partecipanti: 67,
    maxPartecipanti: 100,
    cfu: '+3 CFU',
    icon: Star,
    colore: '#44AAFF',
    neon: '#44AAFF',
    difficulty: 'EPIC',
    live: true,
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
  },
  {
    tipo: 'TEAM JAM',
    titolo: 'Team Project Jam',
    descrizione: 'Forma la tua squadra. Presenta alle aziende.',
    durata: '14 GG',
    partecipanti: 0,
    maxPartecipanti: 50,
    cfu: '+5 CFU',
    icon: Users,
    colore: '#AA44FF',
    neon: '#AA44FF',
    difficulty: 'LEGENDARY',
    live: false,
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
  },
]

const leaderboard = [
  { rank: 1, nome: 'Sofia M.', corso: 'Architettura', cfu: 47, streak: 12, badge: '👑', level: 'LEGEND', color: '#C9A227', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { rank: 2, nome: 'Marco F.', corso: 'Automotive', cfu: 41, streak: 8, badge: '⚡', level: 'MASTER', color: '#FF4444', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { rank: 3, nome: 'Chiara R.', corso: 'Gioielleria', cfu: 38, streak: 15, badge: '🔥', level: 'MASTER', color: '#44AAFF', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { rank: 4, nome: 'Luca B.', corso: 'Architettura', cfu: 33, streak: 5, badge: '⭐', level: 'PRO', color: '#AA44FF', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  { rank: 5, nome: 'Anna V.', corso: 'Automotive', cfu: 29, streak: 9, badge: '⭐', level: 'PRO', color: '#44FF88', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
]

function CountdownTimer() {
  const [time, setTime] = useState({ h: 23, m: 47, s: 33 })
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="flex items-center gap-1">
      {[pad(time.h), pad(time.m), pad(time.s)].map((u, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="font-body font-bold text-gold" style={{ fontVariantNumeric: 'tabular-nums', fontSize: '1.1rem' }}>{u}</span>
          {i < 2 && <span className="text-gold/50 text-sm">:</span>}
        </span>
      ))}
    </div>
  )
}

function AnimatedCounter({ end, color, glow }: { end: number; color: string; glow: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: end, duration: 2.5, ease: 'power2.out',
          onUpdate: () => { if (spanRef.current) spanRef.current.textContent = Math.round(obj.val).toLocaleString() }
        })
        observer.disconnect()
      }
    })
    if (spanRef.current) observer.observe(spanRef.current)
    return () => observer.disconnect()
  }, [end])
  return (
    <span ref={spanRef} style={{
      fontFamily: "'Impact', 'Arial Black', sans-serif",
      fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
      letterSpacing: '-0.02em', color,
      textShadow: `0 0 20px ${glow}, 0 0 40px ${glow}`,
    }}>0</span>
  )
}

function GlitchText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'
    let iteration = 0
    const interval = setInterval(() => {
      if (!ref.current) return
      ref.current.innerText = text.split('').map((letter, index) => {
        if (index < iteration) return letter
        return chars[Math.floor(Math.random() * chars.length)]
      }).join('')
      if (iteration >= text.length) clearInterval(interval)
      iteration += 0.4
    }, 25)
    return () => clearInterval(interval)
  }, [text])
  return <span ref={ref}>{text}</span>
}

export default function ArenaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const leaderRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const [soundOn, setSoundOn] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Tutti')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext()
    return ctxRef.current
  }, [])

  const playHover = useCallback(() => {
    if (!soundOn) return
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 440
      g.gain.setValueAtTime(0.04, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      osc.connect(g); g.connect(ctx.destination)
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12)
    } catch (e) {}
  }, [soundOn, getCtx])

  const playClick = useCallback(() => {
    if (!soundOn) return
    try {
      const ctx = getCtx()
      ;[220, 330, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1)
        g.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.03)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3 + i * 0.05)
        osc.connect(g); g.connect(ctx.destination)
        osc.start(ctx.currentTime + i * 0.03)
        osc.stop(ctx.currentTime + 0.4)
      })
    } catch (e) {}
  }, [soundOn, getCtx])

  const playLeaderboardHover = useCallback(() => {
    if (!soundOn) return
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = 660
      g.gain.setValueAtTime(0.03, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.connect(g); g.connect(ctx.destination)
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08)
    } catch (e) {}
  }, [soundOn, getCtx])

  const startMusic = useCallback(() => {}, [])

  const toggleSound = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (soundOn) {
      audio.pause()
      audio.currentTime = 0
      setSoundOn(false)
    } else {
      audio.volume = 0.35
      audio.loop = true
      const promise = audio.play()
      if (promise !== undefined) {
        promise.then(() => setSoundOn(true)).catch((err) => {
          console.log('Audio error:', err)
        })
      }
    }
  }, [soundOn])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['201,162,39', '255,68,68', '68,170,255', '170,68,255', '68,255,136']
    const particles = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -Math.random() * 0.8 - 0.2,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random(),
    }))

    let animId: number
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.004
        if (p.life <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.life = 1
          p.color = colors[Math.floor(Math.random() * colors.length)]
        }
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `rgba(${p.color},${p.opacity * p.life})`)
        gradient.addColorStop(1, `rgba(${p.color},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })
      animId = requestAnimationFrame(loop)
    }
    loop()

    const tl = gsap.timeline()
    tl.fromTo(titleRef.current,
      { opacity: 0, scale: 3, filter: 'blur(40px)', rotateX: 20 },
      { opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0, duration: 1.6, ease: 'power4.out' }, 0.2
    )
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.2)
    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.5)
    tl.fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.7)
    tl.call(() => {}, [], 1.0)

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 90%' } }
      )
    })

    gsap.fromTo(leaderRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: leaderRef.current, start: 'top 85%' } })
    rowsRef.current.forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.5, delay: i * 0.08,
          scrollTrigger: { trigger: leaderRef.current, start: 'top 80%' } })
    })

    return () => cancelAnimationFrame(animId)
  }, [startMusic])

  const handleCardEnter = (i: number) => {
    setHoveredCard(i)
    playHover()
    const card = cardsRef.current[i]
    gsap.to(card, { y: -12, scale: 1.03, duration: 0.3, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-img'), { scale: 1.15, filter: 'brightness(0.7) saturate(1.5)', duration: 0.6, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-neon'), { opacity: 1, duration: 0.3 })
    gsap.to(card.querySelector('.card-btn'), { opacity: 1, y: 0, duration: 0.3 })
    gsap.to(card.querySelector('.card-scan'), { scaleX: 1, duration: 0.5, ease: 'power3.out' })
  }

  const handleCardLeave = (i: number) => {
    setHoveredCard(null)
    const card = cardsRef.current[i]
    gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-img'), { scale: 1, filter: 'brightness(0.5) saturate(0.8)', duration: 0.6, ease: 'power2.out' })
    gsap.to(card.querySelector('.card-neon'), { opacity: 0, duration: 0.3 })
    gsap.to(card.querySelector('.card-btn'), { opacity: 0, y: 10, duration: 0.2 })
    gsap.to(card.querySelector('.card-scan'), { scaleX: 0, duration: 0.3 })
  }

  return (
    <main style={{ background: '#050508', minHeight: '100vh', overflow: 'hidden' }}>
      <Cursor />
      <Header />
      <audio ref={audioRef} src="/arena-music.mp3" loop preload="auto"
  onCanPlayThrough={() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
    }
  }}
/>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />

        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80" alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.12) saturate(2) hue-rotate(200deg)' }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,39,0.15) 0%, transparent 70%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(5,5,8,0.8) 70%, #050508 100%)',
          }} />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(201,162,39,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        {[
          { pos: 'top-8 left-8', d: 'M0 20 L0 0 L20 0' },
          { pos: 'top-8 right-8', d: 'M40 20 L40 0 L20 0' },
          { pos: 'bottom-8 left-8', d: 'M0 20 L0 40 L20 40' },
          { pos: 'bottom-8 right-8', d: 'M40 20 L40 40 L20 40' },
        ].map(({ pos, d }, i) => (
          <div key={i} className={`absolute ${pos} pointer-events-none`} style={{ zIndex: 3 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d={d} stroke="rgba(201,162,39,0.6)" strokeWidth="2" />
            </svg>
          </div>
        ))}

        {/* Status bar — sound toggle a sinistra, countdown a destra */}
        <div className="absolute top-24 left-6 md:left-20 right-6 md:right-20 flex justify-between items-center"
          style={{ zIndex: 10 }}>
          <div className="flex items-center gap-3">
            {/* Sound toggle */}
            <button onClick={toggleSound}
              className="flex items-center gap-2 px-3 py-1.5 transition-all duration-300 hover:scale-105"
              style={{
                background: soundOn ? 'rgba(201,162,39,0.15)' : 'rgba(0,0,0,0.6)',
                border: `1px solid ${soundOn ? 'rgba(201,162,39,0.6)' : 'rgba(201,162,39,0.2)'}`,
                backdropFilter: 'blur(10px)',
                boxShadow: soundOn ? '0 0 12px rgba(201,162,39,0.3)' : 'none',
              }}>
              {soundOn
                ? <Volume2 size={12} className="text-gold" />
                : <VolumeX size={12} style={{ color: 'rgba(201,162,39,0.4)' }} />
              }
              <span className="font-body uppercase hidden md:block"
                style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: soundOn ? '#C9A227' : 'rgba(201,162,39,0.4)' }}>
                {soundOn ? 'SOUND ON' : 'SOUND OFF'}
              </span>
            </button>

            {/* Online */}
            <div className="flex items-center gap-2 px-3 py-1.5"
              style={{ background: 'rgba(68,255,136,0.1)', border: '1px solid rgba(68,255,136,0.3)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-body text-green-400 uppercase hidden md:block"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>SERVER ONLINE</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5"
              style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.2)' }}>
              <Users size={10} className="text-gold" />
              <span className="font-body text-gold" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>247 ONLINE</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 px-4 py-2"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,162,39,0.2)', backdropFilter: 'blur(10px)' }}>
            <span className="font-body text-silver/50 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>NEXT BATTLE</span>
            <CountdownTimer />
          </div>
        </div>

        {/* Contenuto */}
        <div className="relative text-center px-6 max-w-6xl mx-auto" style={{ zIndex: 5 }}>
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2" style={{
            background: 'rgba(201,162,39,0.1)',
            border: '1px solid rgba(201,162,39,0.4)',
            boxShadow: '0 0 20px rgba(201,162,39,0.15)',
          }}>
            <Sword size={12} className="text-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>Arena Voire · Season 01 · Live</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          <div ref={titleRef} style={{ opacity: 0, perspective: '800px' }}>
            <h1 className="font-display mb-2" style={{
              fontSize: 'clamp(5rem, 16vw, 15rem)',
              lineHeight: '0.85',
              letterSpacing: '-0.02em',
              color: '#FAF9F6',
              textShadow: `
                0 0 20px rgba(201,162,39,0.9),
                0 0 40px rgba(201,162,39,0.6),
                0 0 80px rgba(201,162,39,0.3),
                5px 5px 0px rgba(139,58,58,0.9),
                10px 10px 0px rgba(139,58,58,0.5)
              `,
              display: 'block',
            }}>
              <GlitchText text="ARENA" />
            </h1>
            <h2 className="font-display" style={{
              fontSize: 'clamp(2rem, 6vw, 6rem)',
              lineHeight: '1',
              letterSpacing: '0.2em',
              WebkitTextStroke: '2px rgba(201,162,39,0.7)',
              color: 'transparent',
              textShadow: '0 0 40px rgba(201,162,39,0.4)',
              display: 'block',
            }}>
              VOIRE
            </h2>
          </div>

          <p ref={subtitleRef} className="font-body mt-8 mb-12 max-w-lg mx-auto"
            style={{ opacity: 0, fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(250,249,246,0.55)' }}>
            Sfide reali. CFU reali.
            <br />
            <span style={{ color: '#C9A227' }}>Entra in partita e dimostra quanto vali.</span>
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center" style={{ opacity: 0 }}>
            <Link href="#sfide"
              className="group relative font-body text-noir px-14 py-5 uppercase tracking-widest text-xs font-bold overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C9A227, #E8D48A)', boxShadow: '0 0 30px rgba(201,162,39,0.5)' }}
              onClick={playClick}>
              <span className="relative z-10">⚔ Entra in Arena</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </Link>
            <Link href="#leaderboard"
              className="font-body px-14 py-5 uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105"
              style={{ border: '1px solid rgba(201,162,39,0.5)', color: '#C9A227', background: 'rgba(201,162,39,0.05)' }}>
              🏆 Leaderboard
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex justify-center mt-16 w-full max-w-2xl mx-auto" style={{ opacity: 0 }}>
            {[
              { end: 247, label: 'Players', color: '#C9A227', glow: 'rgba(201,162,39,0.4)' },
              { end: 3, label: 'Live ora', color: '#FF4444', glow: 'rgba(255,68,68,0.4)' },
              { end: 1840, label: 'CFU dati', color: '#44AAFF', glow: 'rgba(68,170,255,0.4)' },
            ].map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 py-6"
                style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <AnimatedCounter end={s.end} color={s.color} glow={s.glow} />
                <span className="font-body text-silver/40 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.3em' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 5 }}>
          <span className="font-body text-gold/40 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.3em' }}>SCROLL</span>
          <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(201,162,39,0.2)' }}>
            <div className="w-full h-full bg-gold" style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* SFIDE */}
      <section id="sfide" className="py-32 px-6 md:px-20 relative" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#FF4444' }}>
                  Sfide attive ora
                </span>
              </div>
              <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
                Scegli la tua <span style={{ color: '#C9A227' }}>battaglia.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sfide.map((sfida, i) => {
              const Icon = sfida.icon
              const fillPct = (sfida.partecipanti / sfida.maxPartecipanti) * 100
              return (
                <div key={i}
                  ref={el => { if (el) cardsRef.current[i] = el }}
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    opacity: 0,
                    border: `1px solid ${sfida.colore}30`,
                    background: '#0A0A0A',
                    boxShadow: hoveredCard === i ? `0 0 40px ${sfida.neon}30, 0 0 80px ${sfida.neon}15` : 'none',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={() => handleCardEnter(i)}
                  onMouseLeave={() => handleCardLeave(i)}
                  onClick={playClick}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img className="card-img w-full h-full object-cover" src={sfida.img} alt=""
                      style={{ filter: 'brightness(0.5) saturate(0.8)', transition: 'transform 0.6s, filter 0.6s' }} />
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.92) 100%)`,
                    }} />
                  </div>
                  <div className="card-neon absolute inset-0 pointer-events-none" style={{
                    opacity: 0,
                    background: `radial-gradient(circle at 30% 50%, ${sfida.neon}18, transparent 70%)`,
                  }} />
                  <div className="card-scan absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
                    style={{ background: `linear-gradient(to right, transparent, ${sfida.colore}, transparent)`, transform: 'scaleX(0)', transformOrigin: 'left' }} />

                  <div className="relative z-10 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 flex items-center justify-center" style={{
                          background: `${sfida.colore}20`,
                          border: `2px solid ${sfida.colore}50`,
                          boxShadow: `0 0 20px ${sfida.neon}30`,
                        }}>
                          <Icon size={24} style={{ color: sfida.colore }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: sfida.colore }}>
                              {sfida.tipo}
                            </span>
                            {sfida.live && (
                              <div className="flex items-center gap-1 px-2 py-0.5" style={{ background: 'rgba(255,68,68,0.15)', border: '1px solid rgba(255,68,68,0.4)' }}>
                                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                <span className="font-body text-red-400" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>LIVE</span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-display text-ivory text-2xl" style={{ letterSpacing: '-0.02em' }}>
                            {sfida.titolo}
                          </h3>
                        </div>
                      </div>
                      <div className="px-3 py-1 font-body uppercase" style={{
                        fontSize: '0.5rem', letterSpacing: '0.2em',
                        color: sfida.colore, border: `1px solid ${sfida.colore}50`, background: `${sfida.colore}10`,
                      }}>
                        {sfida.difficulty}
                      </div>
                    </div>

                    <p className="font-body text-silver/60 text-sm mb-8 leading-relaxed">{sfida.descrizione}</p>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-body text-silver/40 uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>Partecipanti</span>
                        <span className="font-body" style={{ fontSize: '0.6rem', color: sfida.colore }}>{sfida.partecipanti}/{sfida.maxPartecipanti}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full transition-all duration-700" style={{
                          width: `${fillPct}%`,
                          background: `linear-gradient(to right, ${sfida.colore}, ${sfida.colore}aa)`,
                          boxShadow: `0 0 10px ${sfida.neon}`,
                        }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-6">
                        {[{ l: 'Durata', v: sfida.durata }, { l: 'Premio', v: sfida.cfu }].map((item, j) => (
                          <div key={j}>
                            <div className="font-body text-silver/30 uppercase mb-1" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>{item.l}</div>
                            <div className="font-body text-xs font-medium" style={{ color: sfida.colore }}>{item.v}</div>
                          </div>
                        ))}
                      </div>
                      <button className="card-btn flex items-center gap-2 px-6 py-3 font-body text-xs uppercase tracking-widest font-bold"
                        style={{ opacity: 0, transform: 'translateY(10px)', background: sfida.colore, color: '#0A0A0A', boxShadow: `0 0 20px ${sfida.neon}50` }}>
                        {sfida.live ? '⚔ Partecipa' : '🔒 Info'}
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="py-32 px-6 md:px-20 relative" style={{ background: '#050508' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(170,68,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '100% 80px',
        }} />

        <div ref={leaderRef} className="max-w-5xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Crown size={14} style={{ color: '#C9A227' }} />
                <span className="font-body text-gold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>Hall of Fame</span>
              </div>
              <h2 className="font-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
                Leaderboard.
              </h2>
            </div>
            <div className="hidden md:flex" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              {['Tutti', 'Architettura', 'Automotive', 'Gioielleria'].map((f) => (
                <button key={f} onClick={() => { setActiveFilter(f); playClick() }}
                  className="px-5 py-3 font-body uppercase transition-all duration-200"
                  style={{
                    fontSize: '0.55rem', letterSpacing: '0.15em',
                    color: activeFilter === f ? '#C9A227' : 'rgba(142,142,147,0.4)',
                    background: activeFilter === f ? 'rgba(201,162,39,0.08)' : 'transparent',
                    borderBottom: activeFilter === f ? '2px solid #C9A227' : '2px solid transparent',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Podio top 3 */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {leaderboard.slice(0, 3).map((row, i) => (
              <div key={i} className="relative overflow-hidden text-center p-6 cursor-default transition-all duration-300 hover:scale-105"
                style={{
                  order: i === 0 ? 2 : i === 1 ? 1 : 3,
                  border: `1px solid ${row.color}30`,
                  background: `linear-gradient(135deg, ${row.color}08, rgba(5,5,8,0.95))`,
                  boxShadow: `0 0 30px ${row.color}15`,
                  transform: i === 0 ? 'translateY(-8px)' : 'none',
                }}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: row.color }} />
                <div className="text-3xl mb-3">{row.badge}</div>
                <img src={row.img} alt={row.nome} className="w-14 h-14 rounded-full mx-auto mb-3 object-cover"
                  style={{ border: `2px solid ${row.color}`, boxShadow: `0 0 15px ${row.color}40` }} />
                <div className="font-body text-ivory text-sm font-medium mb-1">{row.nome}</div>
                <div className="font-body text-silver/40 text-xs mb-3">{row.corso}</div>
                <div className="font-display text-2xl" style={{ color: row.color, textShadow: `0 0 15px ${row.color}` }}>{row.cfu}</div>
                <div className="font-body text-xs uppercase mt-1" style={{ color: row.color, letterSpacing: '0.15em', fontSize: '0.5rem' }}>{row.level}</div>
              </div>
            ))}
          </div>

          {/* Lista */}
          {leaderboard.filter(r => activeFilter === 'Tutti' || r.corso === activeFilter).slice(3).map((row, i) => (
            <div key={row.rank}
              ref={el => { if (el) rowsRef.current[i] = el }}
              className="flex items-center gap-5 py-4 border-b cursor-default transition-all duration-200"
              style={{
                opacity: 0,
                borderColor: 'rgba(255,255,255,0.04)',
                background: hoveredRow === i ? `${row.color}08` : 'transparent',
              }}
              onMouseEnter={() => { setHoveredRow(i); playLeaderboardHover() }}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <span className="font-display w-8 shrink-0 text-center" style={{ fontSize: '1.5rem', lineHeight: 1, color: 'rgba(255,255,255,0.15)' }}>
                {row.rank}
              </span>
              <img src={row.img} alt={row.nome} className="w-9 h-9 rounded-full object-cover shrink-0"
                style={{ border: `1px solid ${row.color}40` }} />
              <div className="flex-1 min-w-0">
                <div className="font-body text-ivory text-sm" style={{ color: hoveredRow === i ? row.color : undefined, transition: 'color 0.2s' }}>{row.nome}</div>
                <div className="font-body text-silver/30 text-xs">{row.corso}</div>
              </div>
              <div className="font-display text-xl shrink-0" style={{ color: row.color }}>{row.cfu}</div>
              <div className="flex items-center gap-1 shrink-0">
                <Flame size={11} style={{ color: row.streak > 10 ? '#C9A227' : 'rgba(255,255,255,0.2)' }} />
                <span className="font-body text-xs text-silver/40">{row.streak}d</span>
              </div>
              <span className="font-body px-2 py-0.5 shrink-0" style={{
                fontSize: '0.5rem', letterSpacing: '0.15em',
                color: row.color, border: `1px solid ${row.color}30`, background: `${row.color}10`,
              }}>{row.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 px-6 md:px-20 relative overflow-hidden text-center" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-10 px-5 py-2.5" style={{
            border: '1px solid rgba(201,162,39,0.4)',
            background: 'rgba(201,162,39,0.08)',
            boxShadow: '0 0 30px rgba(201,162,39,0.1)',
          }}>
            <Shield size={12} className="text-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>Accesso richiesto</span>
          </div>

          <h2 className="font-display text-ivory mb-4" style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
            textShadow: '0 0 60px rgba(201,162,39,0.2)',
          }}>
            Solo studenti
            <br />
            <span style={{ color: '#C9A227', textShadow: '0 0 30px rgba(201,162,39,0.6)' }}>Voire</span> possono giocare.
          </h2>
          <p className="font-body mb-14 text-lg" style={{ color: 'rgba(250,249,246,0.5)' }}>
            Il primo accesso si ottiene superando il test d'ingresso.
          </p>
          <Link href="/ammissioni/test-ingresso"
            className="group relative inline-block font-body text-noir px-16 py-6 uppercase tracking-widest text-xs font-bold overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #C9A227, #E8D48A)',
              boxShadow: '0 0 40px rgba(201,162,39,0.5), 0 0 80px rgba(201,162,39,0.2)',
            }}
            onClick={playClick}>
            <span className="relative z-10">⚔ Inizia la tua partita</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </Link>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  )
}