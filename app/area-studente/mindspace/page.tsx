'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import {
  LayoutDashboard, BookOpen, FileCheck, MessageSquare,
  Briefcase, Image, Sword, CreditCard, User, Wind
} from 'lucide-react'
import BreathingCircle from '@/components/mindspace/BreathingCircle'
import FocusTimer from '@/components/mindspace/FocusTimer'
import MicroJournal from '@/components/mindspace/MicroJournal'
import SoundPlayer from '@/components/mindspace/SoundPlayer'
import DailyQuote from '@/components/mindspace/DailyQuote'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/area-studente' },
  { icon: BookOpen, label: 'Lezioni', href: '#' },
  { icon: FileCheck, label: 'Esami', href: '#' },
  { icon: MessageSquare, label: 'Revisioni', href: '#' },
  { icon: Briefcase, label: 'Tirocinio', href: '#' },
  { icon: Image, label: 'Portfolio', href: '#' },
  { icon: Sword, label: 'Arena', href: '/arena' },
  { icon: Wind, label: 'Mindspace', href: '/area-studente/mindspace', active: true },
  { icon: CreditCard, label: 'Pagamenti', href: '#' },
  { icon: User, label: 'Profilo', href: '#' },
]

export default function MindspaceDashboard() {
  const mainRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const colLeftRef = useRef<HTMLDivElement>(null)
  const colRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
    gsap.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 })
    gsap.fromTo(colLeftRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.3 })
    gsap.fromTo(colRightRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
  }, [])

  return (
    <main className="min-h-screen flex" style={{ background: '#0A0A0A' }}>
      <Cursor />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
        style={{ width: '260px', background: 'rgba(8,8,12,0.95)', borderRight: '1px solid rgba(201,162,39,0.08)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center px-6 py-8 border-b" style={{ borderColor: 'rgba(201,162,39,0.08)' }}>
          <Link href="/" className="font-display text-ivory tracking-[0.2em] hover:text-gold transition-colors duration-300"
            style={{ fontSize: '1.3rem' }}>
            VOIRE
          </Link>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon
            return (
              <Link key={i} href={item.href}
                className="flex items-center gap-4 px-5 py-3.5 transition-all duration-200 group"
                style={{
                  color: (item as any).active ? '#C9A227' : '#8E8E93',
                  background: (item as any).active ? 'rgba(201,162,39,0.06)' : 'transparent',
                  borderLeft: (item as any).active ? '2px solid #C9A227' : '2px solid transparent',
                }}>
                <Icon size={17} className="shrink-0" />
                <span className="font-body uppercase whitespace-nowrap group-hover:text-ivory transition-colors duration-200"
                  style={{ fontSize: '0.62rem', letterSpacing: '0.15em' }}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
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
      </aside>

      {/* Contenuto principale */}
      <div ref={mainRef} className="flex-1 flex flex-col" style={{ marginLeft: '260px', opacity: 0 }}>

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 border-b"
          style={{ background: 'rgba(8,8,12,0.95)', borderColor: 'rgba(201,162,39,0.08)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <Wind size={18} className="text-gold" />
            <h1 className="font-display text-ivory text-xl" style={{ letterSpacing: '-0.01em' }}>
              Mindspace
            </h1>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 border"
            style={{ borderColor: 'rgba(201,162,39,0.2)', background: 'rgba(201,162,39,0.05)' }}>
            <Wind size={12} className="text-gold" />
            <span className="font-body text-gold uppercase tracking-widest" style={{ fontSize: '0.6rem' }}>
              Il tuo spazio
            </span>
          </div>
        </header>

        <div className="p-8 overflow-auto">

          {/* Titolo */}
          <div ref={titleRef} className="mb-10" style={{ opacity: 0 }}>
            <h2 className="font-display text-ivory text-3xl mb-2" style={{ letterSpacing: '-0.02em' }}>
              Mindspace
            </h2>
            <p className="font-body text-silver/50">Il tuo spazio. Prenditi il tempo che meriti.</p>
          </div>

          {/* Griglia 2 colonne */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Colonna sinistra 3/5 */}
            <div ref={colLeftRef} className="lg:col-span-3 flex flex-col gap-6" style={{ opacity: 0 }}>

              {/* Respirazione */}
              <div className="border p-8" style={{ borderColor: 'rgba(44,44,46,0.6)', background: '#1C1C1E' }}>
                <h4 className="font-display text-ivory text-lg mb-6" style={{ letterSpacing: '-0.01em' }}>
                  Respirazione
                </h4>
                <BreathingCircle />
              </div>

              {/* Focus Timer */}
              <FocusTimer />

              {/* Micro Journal */}
              <MicroJournal />

            </div>

            {/* Colonna destra 2/5 */}
            <div ref={colRightRef} className="lg:col-span-2 flex flex-col gap-6" style={{ opacity: 0 }}>

              {/* Sound Player */}
              <SoundPlayer />

              {/* Daily Quote */}
              <DailyQuote sector="architecture" />

              {/* Link pubblica */}
              <div className="border p-6 text-center" style={{ borderColor: 'rgba(44,44,46,0.4)' }}>
                <p className="font-body text-silver/40 text-xs mb-4">
                  Condividi Mindspace con qualcuno
                </p>
                <Link href="/mindspace"
                  className="font-body text-gold uppercase tracking-widest hover:text-goldLight transition-colors duration-200"
                  style={{ fontSize: '0.6rem' }}>
                  Versione pubblica →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}