'use client'
import { useState } from 'react'
import Loader from '@/components/ui/Loader'
import Cursor from '@/components/ui/Cursor'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Corsi from '@/components/sections/Corsi'
import Differenziatori from '@/components/sections/Differenziatori'
import AziendePartner from '@/components/sections/AziendePartner'
import Numeri from '@/components/sections/Numeri'
import Testimonianze from '@/components/sections/Testimonianze'
import CtaFinale from '@/components/sections/CtaFinale'
import Newsletter from '@/components/sections/Newsletter'
import Manifesto from '@/components/sections/Manifesto'

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Cursor />
        <Header />
        <Hero />
        <Manifesto text="L'eccellenza qui non si regala. Si conquista." index={0} />
        <Corsi />
        <Manifesto text="Non promettiamo prestigio, lo costruiamo con te." index={1} />
        <Differenziatori />
        <Manifesto text="Non ti promettiamo un posto nelle aziende migliori. Te ne garantiamo l'attenzione." index={2} />
        <AziendePartner />
        <Numeri />
        <Testimonianze />
        <CtaFinale />
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}