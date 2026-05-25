'use client'
import Link from 'next/link'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

const colonne = [
  {
    titolo: 'Università',
    links: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Visione e metodo', href: '#' },
      { label: 'Accreditamento', href: '#' },
      { label: 'Sedi fisiche', href: '/contatti' },
      { label: 'Docenti', href: '/docenti' },
    ],
  },
  {
    titolo: 'Corsi',
    links: [
      { label: 'Architettura', href: '/corsi/architettura' },
      { label: 'Automotive Design', href: '/corsi/automotive-design' },
      { label: 'Gioielleria', href: '/corsi/gioielleria' },
      { label: 'Portfolio studenti', href: '/portfolio-studenti' },
    ],
  },
  {
    titolo: 'Ammissioni',
    links: [
      { label: "Test d'ingresso", href: '/ammissioni/test-ingresso' },
      { label: 'Borse di studio', href: '/ammissioni/borse-di-studio' },
      { label: 'Finanziamenti aziendali', href: '/ammissioni/finanziamenti-aziendali' },
      { label: 'Gift Card', href: '/ammissioni/gift-card' },
      { label: 'Prova gratuita', href: '/ammissioni/prova-gratuita' },
      { label: 'Tasse e costi', href: '/tasse-e-costi' },
    ],
  },
  {
    titolo: 'Studenti',
    links: [
      { label: 'Area Studente', href: '#' },
      { label: 'Arena — Sfide', href: '/arena' },
      { label: 'Mindspace', href: '/mindspace' },
      { label: 'Magazine', href: '/magazine' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-noir border-t border-smoke px-6 md:px-20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <span className="font-display text-ivory text-3xl tracking-[0.2em] font-light">VOIRE</span>
          <p className="font-body text-silver text-sm mt-2" style={{ letterSpacing: '0.1em' }}>
            L'università online che ti sceglie.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {colonne.map((col) => (
            <div key={col.titolo}>
              <h4 className="font-body text-ivory uppercase mb-6" style={{ fontSize: '0.65rem', letterSpacing: '0.25em' }}>
                {col.titolo}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-silver text-sm hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-smoke pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-silver" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            © 2026 Voire. Tutti i diritti riservati. Riconosciuta MIUR.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy', href: '#' },
              { label: 'Cookie', href: '#' },
              { label: 'Termini', href: '#' },
              { label: 'Codice etico', href: '#' },
            ].map((item) => (
              <Link key={item.label} href={item.href}
                className="font-body text-silver hover:text-gold transition-colors duration-300"
                style={{ fontSize: '0.72rem' }}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <Link href="#" className="text-silver hover:text-gold transition-colors duration-300">
              <Instagram size={16} />
            </Link>
            <Link href="#" className="text-silver hover:text-gold transition-colors duration-300">
              <Linkedin size={16} />
            </Link>
            <Link href="#" className="text-silver hover:text-gold transition-colors duration-300">
              <Youtube size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}