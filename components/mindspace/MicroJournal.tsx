'use client'
import { useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { mindspacePrompts } from '@/content/mindspace-prompts'

interface JournalEntry {
  date: string
  prompt: string
  content: string
}

export default function MicroJournal() {
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null)
  const [entries, setEntries] = useState<JournalEntry[]>([
    { date: '23 Maggio', prompt: mindspacePrompts[0], content: 'Ho scoperto che la luce naturale cambia completamente la percezione degli spazi...' },
    { date: '22 Maggio', prompt: mindspacePrompts[1], content: 'Concentrato. Ma con una punta di ansia per la revisione di venerdì.' },
    { date: '21 Maggio', prompt: mindspacePrompts[2], content: 'Gestire il tempo tra progettazione e teoria è la sfida più grande.' },
  ])

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const prompt = mindspacePrompts[dayOfYear % mindspacePrompts.length]

  const handleSave = () => {
    if (!content.trim()) return
    const newEntry: JournalEntry = {
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long' }),
      prompt,
      content,
    }
    setEntries(prev => [newEntry, ...prev])
    setSaved(true)
    setTimeout(() => { setSaved(false); setContent('') }, 2000)
  }

  return (
    <div className="border p-6 flex flex-col gap-5" style={{ borderColor: 'rgba(44,44,46,0.6)', background: '#1C1C1E' }}>
      <h4 className="font-display text-ivory text-lg" style={{ letterSpacing: '-0.01em' }}>Diario</h4>

      {/* Prompt */}
      <div className="border-l-2 pl-4" style={{ borderColor: '#C9A227' }}>
        <p className="font-display text-silver/70 italic leading-relaxed" style={{ fontSize: '0.95rem' }}>
          "{prompt}"
        </p>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={5}
          maxLength={500}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Scrivi qui..."
          className="w-full px-4 py-3 font-body text-sm text-ivory outline-none resize-none transition-colors duration-300"
          style={{
            background: '#0A0A0A',
            border: '1px solid rgba(44,44,46,0.6)',
            borderRadius: '2px',
            color: '#FAF9F6',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#C9A227' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(44,44,46,0.6)' }}
        />
        <span className="absolute bottom-3 right-3 font-body text-silver/30 text-xs">{content.length}/500</span>
      </div>

      {/* Bottone salva */}
      <button onClick={handleSave} disabled={!content.trim() || saved}
        className="flex items-center justify-center gap-2 py-3 font-body uppercase tracking-widest text-xs transition-all duration-300"
        style={{
          background: saved ? 'rgba(201,162,39,0.1)' : '#C9A227',
          color: saved ? '#C9A227' : '#0A0A0A',
          border: saved ? '1px solid #C9A227' : 'none',
        }}>
        {saved ? <><Check size={12} /> Salvato.</> : 'Salva'}
      </button>

      {/* Storico */}
      <div>
        <button onClick={() => setHistoryOpen(!historyOpen)}
          className="flex items-center gap-2 w-full font-body uppercase transition-colors duration-200 hover:text-ivory"
          style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8E8E93' }}>
          {historyOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          I tuoi ultimi 7 giorni
        </button>

        {historyOpen && (
          <div className="mt-4 flex flex-col gap-2">
            {entries.slice(0, 7).map((entry, i) => (
              <div key={i} className="border p-3 cursor-pointer transition-colors duration-200"
                style={{ borderColor: expandedEntry === i ? 'rgba(201,162,39,0.3)' : 'rgba(44,44,46,0.4)' }}
                onClick={() => setExpandedEntry(expandedEntry === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <span className="font-body text-silver/50 text-xs">{entry.date}</span>
                  <span className="font-body text-silver/30 text-xs">{entry.content.slice(0, 40)}...</span>
                </div>
                {expandedEntry === i && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(44,44,46,0.3)' }}>
                    <p className="font-display text-silver/50 italic text-xs mb-2">"{entry.prompt}"</p>
                    <p className="font-body text-ivory/70 text-sm leading-relaxed">{entry.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}