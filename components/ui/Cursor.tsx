'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      dot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`
    }

    const onEnter = () => cursor.classList.add('scale-[2.5]', 'bg-gold/10')
    const onLeave = () => cursor.classList.remove('scale-[2.5]', 'bg-gold/10')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border border-gold pointer-events-none z-[9999] transition-transform duration-200 ease-out"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-gold pointer-events-none z-[9999]"
      />
    </>
  )
}