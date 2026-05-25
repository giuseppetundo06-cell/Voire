'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import BreathingCircle from './BreathingCircle'
import StretchingGuide from './StretchingGuide'
import { Wind, X } from 'lucide-react'

interface ActiveBreakOverlayProps {
  onComplete: () => void
  onSkip: () => void
}

type Tab = 'stretching' | 'breathing'

export default function ActiveBreakOverlay({ onComplete, onSkip }: ActiveBreakOverlayProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<Tab>('stretching')
  const [started, setStarted] = useState(false)
  const [skipCount, setSkipCount] = useState(() => parseInt(localStorage.getItem('voire_skip_count') || '0'))
  const [showSkipMessage, setShowSkipMessage] = useState(false)
  const [skipDisabled, setSkipDisabled] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
      )
    }
  }, [])

  const handleComplete = () => {
    localStorage.setItem('voire_skip_count', '0')
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.8, opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: onComplete,
      })
    }
  }

  const handleSkip = () => {
    const newCount = skipCount + 1
    setSkipCount(newCount)
    localStorage.setItem('voire_skip_count', String(newCount))

    if (newCount >= 3) {
      setSkipDisabled(true)
      setShowSkipMessage(true)
      setTimeout(() => {
        setSkipDisabled(false)
        setShowSkipMessage(false)
      }, 2000)
      return
    }
    onSkip()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)' }}>
      <div ref={cardRef} className="w-full max-w-lg border p-8 mx-4"
        style={{ background: '#1C1C1E', borderColor: '#C9A227' }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Wind size={16} className="text-gold" />
              <h3 className="font-display text-ivory text-xl" style={{ letterSpacing: '-0.01em' }}>
                Pausa Attiva
              </h3>
            </div>
            <p className="font-body text-silver/50 text-sm">3 minuti. Il tuo corpo ti ringrazierà.</p>
          </div>
          <div className="px-3 py-1 font-body uppercase"
            style={{ fontSize: '0.5rem', letterSpacing: '0.2em', background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.3)' }}>
            +0.01 CFU
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6" style={{ borderColor: 'rgba(44,44,46,0.4)' }}>
          {(['stretching', 'breathing'] as Tab[]).map((t) => (
            <button key={t} onClick={() => { if (!started) setTab(t) }}
              className="flex-1 py-3 font-body uppercase transition-all duration-300"
              style={{
                fontSize: '0.6rem', letterSpacing: '0.2em',
                color: tab === t ? '#C9A227' : '#8E8E93',
                borderBottom: tab === t ? '2px solid #C9A227' : '2px solid transparent',
              }}>
              {t === 'stretching' ? 'Stretching' : 'Respirazione'}
            </button>
          ))}
        </div>

        {/* Contenuto */}
        <div className="mb-6 min-h-[200px]">
          {tab === 'stretching' ? (
            <StretchingGuide onComplete={handleComplete} started={started} />
          ) : (
            <BreathingCircle fixedTechnique="box" fixedDuration={2} onComplete={handleComplete} compact />
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3">
          {!started && (
            <button onClick={() => setStarted(true)}
              className="w-full py-4 font-body uppercase tracking-widest text-xs transition-all duration-300"
              style={{ background: '#C9A227', color: '#0A0A0A', boxShadow: '0 0 20px rgba(201,162,39,0.3)' }}>
              Inizia la pausa
            </button>
          )}

          {!skipDisabled && (
            <button onClick={handleSkip}
              className="w-full py-2 font-body text-xs transition-colors duration-200"
              style={{ color: '#8E8E93' }}>
              Salta
            </button>
          )}

          {showSkipMessage && (
            <p className="font-display text-silver/50 italic text-sm text-center">
              Hai saltato 3 pause di fila. Va tutto bene?
            </p>
          )}
        </div>
      </div>
    </div>
  )
}