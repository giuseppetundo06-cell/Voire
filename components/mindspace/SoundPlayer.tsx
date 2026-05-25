'use client'
import { useEffect, useRef, useState } from 'react'
import { TreePine, CloudRain, Coffee, Volume1 } from 'lucide-react'

const ambienti = [
  { id: 'forest', icon: TreePine, nome: 'Foresta di Kyoto', desc: 'Ispirato a Kengo Kuma', freq: 220, type: 'sine' as OscillatorType },
  { id: 'rain', icon: CloudRain, nome: 'Pioggia su Vetro', desc: 'Atelier parigino', freq: 100, type: 'sawtooth' as OscillatorType },
  { id: 'cafe', icon: Coffee, nome: 'Café di Milano', desc: 'Rumore bianco urbano', freq: 150, type: 'square' as OscillatorType },
  { id: 'silence', icon: Volume1, nome: 'Silenzio', desc: 'Bianco a 40Hz', freq: 40, type: 'sine' as OscillatorType },
]

export default function SoundPlayer() {
  const [selected, setSelected] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.3)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)

  const stopAudio = () => {
    oscRef.current?.stop()
    oscRef.current = null
  }

  const playAmbient = (id: string) => {
    if (selected === id) {
      stopAudio()
      setSelected(null)
      return
    }

    stopAudio()

    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
      const ctx = audioCtxRef.current
      const gain = ctx.createGain()
      gain.gain.value = volume * 0.1
      gain.connect(ctx.destination)
      gainRef.current = gain

      const amb = ambienti.find(a => a.id === id)!
      const osc = ctx.createOscillator()
      osc.type = amb.type
      osc.frequency.value = amb.freq
      osc.connect(gain)
      osc.start()
      oscRef.current = osc
      setSelected(id)
    } catch (e) { }
  }

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume * 0.1
  }, [volume])

  useEffect(() => {
    return () => { stopAudio() }
  }, [])

  return (
    <div className="border p-6 flex flex-col gap-5" style={{ borderColor: 'rgba(44,44,46,0.6)', background: '#1C1C1E' }}>
      <h4 className="font-display text-ivory text-lg" style={{ letterSpacing: '-0.01em' }}>Ambienti Sonori</h4>

      <div className="grid grid-cols-2 gap-3">
        {ambienti.map((a) => {
          const Icon = a.icon
          const isSelected = selected === a.id
          return (
            <button key={a.id} onClick={() => playAmbient(a.id)}
              className="flex flex-col items-center gap-2 p-4 transition-all duration-300 text-center"
              style={{
                border: `1px solid ${isSelected ? '#C9A227' : 'rgba(44,44,46,0.6)'}`,
                background: isSelected ? 'rgba(44,44,46,0.8)' : '#1C1C1E',
                boxShadow: isSelected ? '0 0 15px rgba(201,162,39,0.1)' : 'none',
              }}>
              <Icon size={28} style={{ color: isSelected ? '#C9A227' : '#8E8E93' }} />
              <span className="font-body text-xs" style={{ color: isSelected ? '#FAF9F6' : '#8E8E93' }}>
                {a.nome}
              </span>
              <span className="font-body text-xs" style={{ color: '#8E8E93', fontSize: '0.6rem' }}>
                {a.desc}
              </span>
            </button>
          )
        })}
      </div>

      {/* Volume slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-silver/40 uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>Volume</span>
          <span className="font-body text-silver/40 text-xs">{Math.round(volume * 100)}%</span>
        </div>
        <input type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="w-full"
          style={{
            accentColor: '#C9A227',
            background: `linear-gradient(to right, #C9A227 ${volume * 100}%, rgba(44,44,46,0.6) ${volume * 100}%)`,
            height: '2px',
            outline: 'none',
            cursor: 'pointer',
          }} />
      </div>
    </div>
  )
}