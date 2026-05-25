'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

type Technique = 'box' | '478' | 'cardiac'
type Phase = 'inhale' | 'hold' | 'exhale' | 'pause'

interface TechniqueConfig {
  label: string
  name: string
  phases: { inhale: number; hold: number; exhale: number; pause: number }
}

const techniques: Record<Technique, TechniqueConfig> = {
  box: { label: 'Concentrazione', name: 'BOX BREATHING', phases: { inhale: 4, hold: 4, exhale: 4, pause: 4 } },
  '478': { label: 'Rilassamento', name: '4-7-8', phases: { inhale: 4, hold: 7, exhale: 8, pause: 0 } },
  cardiac: { label: 'Equilibrio', name: 'COERENZA CARDIACA', phases: { inhale: 5, hold: 0, exhale: 5, pause: 0 } },
}

const durations = [2, 5, 10]

interface BreathingCircleProps {
  fixedTechnique?: Technique
  fixedDuration?: number
  onComplete?: () => void
  compact?: boolean
}

export default function BreathingCircle({
  fixedTechnique,
  fixedDuration,
  onComplete,
  compact = false,
}: BreathingCircleProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const [selectedTechnique, setSelectedTechnique] = useState<Technique>(fixedTechnique || 'box')
  const [selectedDuration, setSelectedDuration] = useState(fixedDuration || 5)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [phase, setPhase] = useState<Phase>('inhale')
  const [elapsed, setElapsed] = useState(0)

  const tech = techniques[fixedTechnique || selectedTechnique]
  const totalSeconds = (fixedDuration || selectedDuration) * 60

  const phaseLabels: Record<Phase, string> = {
    inhale: 'Inspira',
    hold: 'Tieni',
    exhale: 'Espira',
    pause: 'Pausa',
  }

  const phaseColors: Record<Phase, string> = {
    inhale: '#C9A227',
    hold: '#FAF9F6',
    exhale: '#FAF9F6',
    pause: '#8E8E93',
  }

  const stopSession = useCallback(() => {
    timelineRef.current?.kill()
    setIsRunning(false)
    setElapsed(0)
    setPhase('inhale')
    if (circleRef.current) {
      gsap.to(circleRef.current, { attr: { r: 60 }, duration: 0.5 })
    }
  }, [])

  const runCycle = useCallback((startTime: number) => {
    if (!circleRef.current) return

    const p = tech.phases
    const cycleTime = p.inhale + p.hold + p.exhale + p.pause
    if (cycleTime === 0) return

    const tl = gsap.timeline({
      onComplete: () => {
        const now = Date.now()
        const newElapsed = Math.floor((now - startTime) / 1000)
        setElapsed(newElapsed)

        if (newElapsed >= totalSeconds) {
          setIsRunning(false)
          setIsDone(true)
          setPhase('pause')
          gsap.to(circleRef.current, { attr: { r: 60 }, duration: 0.5 })
          gsap.fromTo(circleRef.current,
            { opacity: 0.5 },
            { opacity: 1, duration: 1.5, ease: 'power2.inOut', yoyo: true, repeat: 1 }
          )
          onComplete?.()
        } else {
          runCycle(startTime)
        }
      }
    })

    timelineRef.current = tl

    if (p.inhale > 0) {
      tl.call(() => setPhase('inhale'))
      tl.to(circleRef.current, { attr: { r: 100 }, duration: p.inhale, ease: 'power2.inOut' })
    }
    if (p.hold > 0) {
      tl.call(() => setPhase('hold'))
      tl.to(circleRef.current, { attr: { r: 100 }, duration: p.hold, ease: 'none' })
    }
    if (p.exhale > 0) {
      tl.call(() => setPhase('exhale'))
      tl.to(circleRef.current, { attr: { r: 60 }, duration: p.exhale, ease: 'power2.inOut' })
    }
    if (p.pause > 0) {
      tl.call(() => setPhase('pause'))
      tl.to(circleRef.current, { attr: { r: 60 }, duration: p.pause, ease: 'none' })
    }
  }, [tech, totalSeconds, onComplete])

  const startSession = useCallback(() => {
    setIsRunning(true)
    setIsDone(false)
    setElapsed(0)
    const startTime = Date.now()

    const interval = setInterval(() => {
      const newElapsed = Math.floor((Date.now() - startTime) / 1000)
      setElapsed(newElapsed)
      if (newElapsed >= totalSeconds) clearInterval(interval)
    }, 1000)

    runCycle(startTime)
  }, [runCycle, totalSeconds])

  useEffect(() => {
    return () => { timelineRef.current?.kill() }
  }, [])

  const progress = Math.min(elapsed / totalSeconds, 1)

  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-4' : 'gap-6'}`}>

      {/* Tabs tecnica */}
      {!fixedTechnique && (
        <div className="flex border-b w-full" style={{ borderColor: 'rgba(44,44,46,0.4)' }}>
          {(Object.entries(techniques) as [Technique, TechniqueConfig][]).map(([key, t]) => (
            <button key={key}
              onClick={() => { if (!isRunning) setSelectedTechnique(key) }}
              disabled={isRunning}
              className="flex-1 py-3 font-body uppercase transition-all duration-300"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: selectedTechnique === key ? '#C9A227' : '#8E8E93',
                borderBottom: selectedTechnique === key ? '2px solid #C9A227' : '2px solid transparent',
                cursor: isRunning ? 'not-allowed' : 'pointer',
              }}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Cerchio SVG */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Cerchio di sfondo */}
          <circle cx="110" cy="110" r="90" fill="none"
            stroke="rgba(44,44,46,0.3)" strokeWidth="1" />
          {/* Cerchio animato */}
          <circle ref={circleRef} cx="110" cy="110" r="60" fill="none"
            stroke="#C9A227" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 8px rgba(201,162,39,0.4))' }} />
        </svg>
        {/* Testo centrale */}
        <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl transition-colors duration-500"
            style={{
              color: isDone ? '#C9A227' : phaseColors[phase],
              letterSpacing: '-0.01em',
            }}>
            {isDone ? 'Fatto.' : phaseLabels[phase]}
          </span>
        </div>
      </div>

      {/* Pill durata */}
      {!fixedDuration && (
        <div className="flex gap-2">
          {durations.map(d => (
            <button key={d}
              onClick={() => { if (!isRunning) setSelectedDuration(d) }}
              disabled={isRunning}
              className="px-4 py-2 font-body uppercase transition-all duration-300"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                background: selectedDuration === d ? '#C9A227' : 'transparent',
                color: selectedDuration === d ? '#0A0A0A' : '#8E8E93',
                border: selectedDuration === d ? 'none' : '1px solid rgba(44,44,46,0.6)',
                cursor: isRunning ? 'not-allowed' : 'pointer',
              }}>
              {d} min
            </button>
          ))}
        </div>
      )}

      {/* Barra progresso */}
      {isRunning && (
        <div className="w-full h-px" style={{ background: 'rgba(44,44,46,0.4)' }}>
          <div className="h-full transition-all duration-1000"
            style={{
              width: `${progress * 100}%`,
              background: 'linear-gradient(to right, #C9A227, #E8D48A)',
              boxShadow: '0 0 8px rgba(201,162,39,0.5)',
            }} />
        </div>
      )}

      {/* Bottone start/stop */}
      <button
        onClick={isRunning ? stopSession : startSession}
        className="w-full py-4 font-body uppercase tracking-widest text-xs transition-all duration-300"
        style={{
          background: isRunning ? 'transparent' : '#C9A227',
          color: isRunning ? '#C9A227' : '#0A0A0A',
          border: isRunning ? '1px solid #C9A227' : 'none',
          boxShadow: isRunning ? 'none' : '0 0 20px rgba(201,162,39,0.3)',
        }}>
        {isRunning ? 'Interrompi' : 'Inizia'}
      </button>
    </div>
  )
}