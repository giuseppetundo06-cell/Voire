'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronDown, ChevronUp, Volume2, VolumeX } from 'lucide-react'

const workOptions = [25, 45, 60]
const shortBreakOptions = [5, 10]
const longBreakOptions = [15, 20, 30]

type TimerPhase = 'work' | 'short' | 'long'

export default function FocusTimer() {
  const [workMin, setWorkMin] = useState(25)
  const [shortMin, setShortMin] = useState(5)
  const [longMin, setLongMin] = useState(15)
  const [isRunning, setIsRunning] = useState(false)
  const [phase, setPhase] = useState<TimerPhase>('work')
  const [seconds, setSeconds] = useState(25 * 60)
  const [cycles, setCycles] = useState(0)
  const [configOpen, setConfigOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const totalForPhase = (p: TimerPhase) => {
    if (p === 'work') return workMin * 60
    if (p === 'short') return shortMin * 60
    return longMin * 60
  }

  const playTone = useCallback(() => {
    if (!soundOn) return
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 528
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.5)
    } catch (e) { }
  }, [soundOn])

  const nextPhase = useCallback(() => {
    playTone()
    setCycles(prev => {
      const newCycles = prev + 1
      if (newCycles % 4 === 0) {
        setPhase('long')
        setSeconds(longMin * 60)
      } else if (phase === 'work') {
        setPhase('short')
        setSeconds(shortMin * 60)
      } else {
        setPhase('work')
        setSeconds(workMin * 60)
      }
      return newCycles
    })
  }, [phase, workMin, shortMin, longMin, playTone])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) { nextPhase(); return 0 }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, nextPhase])

  const reset = () => {
    setIsRunning(false)
    setPhase('work')
    setSeconds(workMin * 60)
    setCycles(0)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const phaseColors: Record<TimerPhase, string> = {
    work: '#C9A227',
    short: '#8E8E93',
    long: '#E8D48A',
  }

  const phaseLabels: Record<TimerPhase, string> = {
    work: 'Lavoro',
    short: 'Pausa breve',
    long: 'Pausa lunga',
  }

  return (
    <div className="border p-6" style={{ borderColor: 'rgba(44,44,46,0.6)', background: '#1C1C1E' }}>
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-display text-ivory text-lg" style={{ letterSpacing: '-0.01em' }}>Focus Timer</h4>
        <div className="flex items-center gap-3">
          <span className="font-body uppercase text-xs" style={{ color: phaseColors[phase], fontSize: '0.55rem', letterSpacing: '0.2em' }}>
            {phaseLabels[phase]}
          </span>
          <button onClick={() => setSoundOn(!soundOn)} className="transition-colors duration-200"
            style={{ color: soundOn ? '#C9A227' : '#8E8E93' }}>
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="text-center mb-6">
        <div className="font-mono mb-4"
          style={{ fontSize: '4rem', letterSpacing: '0.05em', color: phaseColors[phase], textShadow: `0 0 20px ${phaseColors[phase]}40` }}>
          {mm}:{ss}
        </div>

        {/* Indicatori cicli */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => {
            const completed = Math.floor(cycles / 4) > 0 && i < 4
            const current = (cycles % 4) === i && phase === 'work'
            return (
              <div key={i} className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: completed ? '#C9A227' : current ? '#C9A227' : 'transparent',
                  border: `1px solid ${completed || current ? '#C9A227' : 'rgba(44,44,46,0.6)'}`,
                  boxShadow: current ? '0 0 8px rgba(201,162,39,0.5)' : 'none',
                }} />
            )
          })}
        </div>
      </div>

      {/* Bottoni */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => setIsRunning(!isRunning)}
          className="flex-1 py-3 font-body uppercase tracking-widest text-xs transition-all duration-300"
          style={{
            background: isRunning ? 'transparent' : '#C9A227',
            color: isRunning ? '#C9A227' : '#0A0A0A',
            border: isRunning ? '1px solid #C9A227' : 'none',
          }}>
          {isRunning ? 'Pausa' : 'Inizia'}
        </button>
        <button onClick={reset}
          className="px-6 py-3 font-body uppercase tracking-widest text-xs transition-colors duration-200"
          style={{ color: '#8E8E93' }}>
          Reset
        </button>
      </div>

      {/* Config accordion */}
      <button onClick={() => setConfigOpen(!configOpen)}
        className="flex items-center gap-2 w-full font-body uppercase transition-colors duration-200 hover:text-ivory"
        style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8E8E93' }}>
        {configOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        Configurazione
      </button>

      {configOpen && (
        <div className="mt-4 pt-4 border-t flex flex-col gap-4" style={{ borderColor: 'rgba(44,44,46,0.4)' }}>
          {[
            { label: 'Lavoro', options: workOptions, val: workMin, set: setWorkMin },
            { label: 'Pausa breve', options: shortBreakOptions, val: shortMin, set: setShortMin },
            { label: 'Pausa lunga', options: longBreakOptions, val: longMin, set: setLongMin },
          ].map((row) => (
            <div key={row.label}>
              <p className="font-body text-silver/40 uppercase mb-2" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>{row.label}</p>
              <div className="flex gap-2">
                {row.options.map(opt => (
                  <button key={opt}
                    onClick={() => { row.set(opt); if (!isRunning && row.label === 'Lavoro') setSeconds(opt * 60) }}
                    disabled={isRunning}
                    className="px-3 py-1.5 font-body text-xs transition-all duration-200"
                    style={{
                      background: row.val === opt ? '#C9A227' : 'transparent',
                      color: row.val === opt ? '#0A0A0A' : '#8E8E93',
                      border: row.val === opt ? 'none' : '1px solid rgba(44,44,46,0.6)',
                      fontSize: '0.6rem',
                    }}>
                    {opt}m
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}