'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const esercizi = [
  {
    nome: 'Collo',
    durata: 30,
    istruzione: 'Ruota lentamente la testa a destra, poi a sinistra. 3 volte per lato.',
    svg: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="25" r="12" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="60" y1="37" x2="60" y2="80" stroke="#C9A227" strokeWidth="1.5" />
        <path d="M35 55 Q60 45 85 55" stroke="#C9A227" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
        <path d="M40 50 Q60 40 80 50" stroke="rgba(201,162,39,0.4)" strokeWidth="1" fill="none" />
        <path d="M45 45 L40 50 L47 52" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <path d="M75 45 L80 50 L73 52" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <line x1="45" y1="80" x2="35" y2="110" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="75" y1="80" x2="85" y2="110" stroke="#C9A227" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    nome: 'Spalle e Polsi',
    durata: 60,
    istruzione: 'Apri le braccia, ruota i polsi verso l\'esterno. Ripeti 5 volte.',
    svg: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="20" r="10" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="60" y1="30" x2="60" y2="65" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="60" y1="45" x2="20" y2="55" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="60" y1="45" x2="100" y2="55" stroke="#C9A227" strokeWidth="1.5" />
        <circle cx="20" cy="55" r="4" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="55" r="4" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <path d="M14 49 A8 8 0 0 1 26 49" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <path d="M94 49 A8 8 0 0 1 106 49" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <path d="M23 46 L26 49 L22 51" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <path d="M103 46 L106 49 L102 51" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <line x1="45" y1="65" x2="35" y2="100" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="75" y1="65" x2="85" y2="100" stroke="#C9A227" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    nome: 'Schiena',
    durata: 90,
    istruzione: 'Seduto, ruota il busto a destra tenendo i piedi a terra. Tieni 10 secondi. Ripeti a sinistra.',
    svg: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="18" r="10" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="60" y1="28" x2="60" y2="70" stroke="#C9A227" strokeWidth="1.5" />
        <path d="M60 45 Q85 40 90 55" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <path d="M87 52 L90 55 L86 57" stroke="#C9A227" strokeWidth="1.5" fill="none" />
        <line x1="60" y1="45" x2="30" y2="55" stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" />
        <rect x="40" y="72" width="40" height="8" rx="2" stroke="#C9A227" strokeWidth="1" fill="none" />
        <line x1="48" y1="70" x2="40" y2="100" stroke="#C9A227" strokeWidth="1.5" />
        <line x1="72" y1="70" x2="80" y2="100" stroke="#C9A227" strokeWidth="1.5" />
      </svg>
    ),
  },
]

interface StretchingGuideProps {
  onComplete?: () => void
  started?: boolean
}

export default function StretchingGuide({ onComplete, started = false }: StretchingGuideProps) {
  const [currentEx, setCurrentEx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(esercizi[0].durata)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const svgRef = useRef<HTMLDivElement>(null)
  const totalDuration = esercizi.reduce((acc, e) => acc + e.durata, 0)

  useEffect(() => {
    if (started && !isActive) setIsActive(true)
  }, [started])

  useEffect(() => {
    if (!isActive) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const next = currentEx + 1
          if (next >= esercizi.length) {
            setIsActive(false)
            onComplete?.()
            return 0
          }
          if (svgRef.current) {
            gsap.fromTo(svgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
          }
          setCurrentEx(next)
          setTotalElapsed(te => te + esercizi[currentEx].durata)
          return esercizi[next].durata
        }
        setTotalElapsed(te => te + 1)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive, currentEx, onComplete])

  const ex = esercizi[currentEx]
  const circumference = 2 * Math.PI * 28
  const dashOffset = circumference * (1 - timeLeft / ex.durata)

  return (
    <div className="flex flex-col gap-6 items-center">

      {/* Barra progresso totale */}
      <div className="w-full h-px" style={{ background: 'rgba(44,44,46,0.4)' }}>
        <div className="h-full transition-all duration-1000"
          style={{
            width: `${(totalElapsed / totalDuration) * 100}%`,
            background: 'linear-gradient(to right, #C9A227, #E8D48A)',
          }} />
      </div>

      {/* Indicatori esercizi */}
      <div className="flex gap-4">
        {esercizi.map((e, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i < currentEx ? '#C9A227' : i === currentEx ? '#C9A227' : 'transparent', border: `1px solid ${i <= currentEx ? '#C9A227' : 'rgba(44,44,46,0.6)'}` }} />
            <span className="font-body text-xs" style={{ fontSize: '0.5rem', color: i === currentEx ? '#C9A227' : '#8E8E93' }}>{e.nome}</span>
          </div>
        ))}
      </div>

      {/* Illustrazione SVG */}
      <div ref={svgRef} className="flex items-center justify-center p-6 border"
        style={{ borderColor: 'rgba(201,162,39,0.2)', background: 'rgba(10,10,10,0.5)' }}>
        {ex.svg}
      </div>

      {/* Timer cerchio */}
      <div className="relative flex items-center justify-center">
        <svg width="70" height="70" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(44,44,46,0.4)" strokeWidth="2" />
          <circle cx="35" cy="35" r="28" fill="none" stroke="#C9A227" strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 35 35)"
            style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div className="absolute font-mono text-gold text-sm font-bold">{timeLeft}s</div>
      </div>

      {/* Istruzione */}
      <p className="font-body text-silver/70 text-sm text-center leading-relaxed max-w-xs">
        {ex.istruzione}
      </p>

      {!isActive && totalElapsed === 0 && (
        <button onClick={() => setIsActive(true)}
          className="w-full py-3 font-body uppercase tracking-widest text-xs"
          style={{ background: '#C9A227', color: '#0A0A0A' }}>
          Inizia
        </button>
      )}
    </div>
  )
}