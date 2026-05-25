'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { mindspaceQuotes, QuoteSector } from '@/content/mindspace-quotes'
import { Copy, Check } from 'lucide-react'

interface DailyQuoteProps {
  sector?: QuoteSector
  animate?: boolean
}

export default function DailyQuote({ sector, animate = false }: DailyQuoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const dayOfMonth = new Date().getDate()
  const sectorQuotes = sector ? mindspaceQuotes.filter(q => q.sector === sector) : mindspaceQuotes
  const quote = sectorQuotes[dayOfMonth % sectorQuotes.length]

  useEffect(() => {
    if (animate && ref.current) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
    }
  }, [animate])

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={ref} className="border p-10 text-center relative"
      style={{
        borderColor: 'rgba(201,162,39,0.4)',
        background: '#0A0A0A',
        opacity: animate ? 0 : 1,
      }}>
      <div className="font-display text-gold/30 mb-4" style={{ fontSize: '4rem', lineHeight: 1 }}>"</div>
      <blockquote className="font-display text-ivory italic mb-6 leading-relaxed"
        style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '-0.01em' }}>
        {quote.quote}
      </blockquote>
      <div className="h-px w-12 bg-gold/40 mx-auto mb-4" />
      <p className="font-body text-gold uppercase tracking-widest mb-8" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>
        {quote.author}
      </p>
      <button onClick={handleCopy}
        className="flex items-center gap-2 mx-auto font-body uppercase text-xs tracking-widest transition-all duration-300 px-6 py-3 border"
        style={{
          borderColor: copied ? '#C9A227' : 'rgba(44,44,46,0.6)',
          color: copied ? '#C9A227' : '#8E8E93',
          background: copied ? 'rgba(201,162,39,0.05)' : 'transparent',
        }}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'Copiata!' : 'Condividi'}
      </button>
    </div>
  )
}