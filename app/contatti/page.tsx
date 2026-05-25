'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contatti = [
  {
    icon: Mail,
    titolo: 'Email',
    valore: 'info@voire.edu',
    sub: 'Risposta entro 24 ore',
    colore: '#C9A227',
  },
  {
    icon: Phone,
    titolo: 'Telefono',
    valore: '+39 02 1234 5678',
    sub: 'Lun–Ven 9:00–18:00',
    colore: '#1B4332',
  },
  {
    icon: MapPin,
    titolo: 'Sede principale',
    valore: 'Via Montenapoleone 8',
    sub: 'Milano, 20121',
    colore: '#8B3A3A',
  },
  {
    icon: Clock,
    titolo: 'Orari supporto',
    valore: 'Lun–Ven 9:00–20:00',
    sub: 'Sab 10:00–14:00',
    colore: '#C9A227',
  },
]

export default function ContattiPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    nome: '', email: '', corso: '', messaggio: '',
  })

useEffect(() => {
  const tryInit = (attempts = 0) => {
    if (typeof window !== 'undefined' && (window as any).L) {
      ;(window as any).__mapInit?.()
    } else if (attempts < 20) {
      setTimeout(() => tryInit(attempts + 1), 300)
    }
  }
  tryInit()
}, [])

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
    )

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })

    gsap.fromTo(formRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    gsap.fromTo('.success-msg',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }

  return (
    <main className="bg-noir min-h-screen">
      <Cursor />
      <Header />

      {/* Hero */}
      <div className="relative pt-48 pb-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(0.5)' }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.8) 80%, #0A0A0A 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,162,39,0.08) 0%, transparent 70%)'
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div ref={titleRef} className="max-w-7xl mx-auto relative z-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              Contatti
            </span>
          </div>
          <h1 className="font-display text-ivory mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.02', letterSpacing: '-0.03em' }}>
            Parliamo.
            <br />
            <span className="text-gold italic">Siamo qui.</span>
          </h1>
          <p className="font-body text-silver text-xl leading-relaxed max-w-2xl">
            Hai domande sul test, sui corsi o sui finanziamenti? Il nostro team risponde entro 24 ore.
          </p>
        </div>
      </div>

      {/* Cards contatto */}
      <div className="px-6 md:px-20 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {contatti.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                ref={el => { if (el) cardsRef.current[i] = el }}
                className="border border-smoke p-8 group hover:border-gold/30 transition-colors duration-500"
                style={{ opacity: 0 }}
              >
                <div className="w-10 h-10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${c.colore}15`, border: `1px solid ${c.colore}30` }}>
                  <Icon size={18} style={{ color: c.colore }} />
                </div>
                <p className="font-body text-silver/40 uppercase mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                  {c.titolo}
                </p>
                <p className="font-body text-ivory text-sm font-medium mb-1 group-hover:text-gold transition-colors duration-300">
                  {c.valore}
                </p>
                <p className="font-body text-silver/40 text-xs">{c.sub}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form + info */}
      <div className="py-24 px-6 md:px-20 border-t border-smoke"
        style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0A0A0A 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* Testo sinistra */}
          <div>
            <h2 className="font-display text-ivory mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Di cosa hai bisogno?
            </h2>

            <div className="flex flex-col gap-8">
              {[
                { titolo: 'Informazioni sui corsi', testo: 'Piano di studi, docenti, tirocini, modalità esami.' },
                { titolo: 'Test d\'ingresso', testo: 'Come prepararsi, quando prenotare, cosa aspettarsi.' },
                { titolo: 'Finanziamenti', testo: 'Borse, piani aziendali, rate, Gift Card.' },
                { titolo: 'Supporto tecnico', testo: 'Problemi con la piattaforma, accesso, materiali.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-1 bg-gold/20 shrink-0 group-hover:bg-gold transition-colors duration-300" />
                  <div>
                    <h4 className="font-display text-ivory text-lg mb-1 group-hover:text-gold transition-colors duration-300"
                      style={{ letterSpacing: '-0.01em' }}>
                      {item.titolo}
                    </h4>
                    <p className="font-body text-silver/60 text-sm">{item.testo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form destra */}
          <div>
            {!sent ? (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ opacity: 0 }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nome}
                      onChange={e => setForm({ ...form, nome: e.target.value })}
                      className="w-full bg-graphite border border-smoke text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                      placeholder="Il tuo nome"
                      style={{ background: 'rgba(28,28,30,0.8)' }}
                    />
                  </div>
                  <div>
                    <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-graphite border border-smoke text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                      placeholder="la@tua.email"
                      style={{ background: 'rgba(28,28,30,0.8)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                    Corso di interesse
                  </label>
                  <select
                    value={form.corso}
                    onChange={e => setForm({ ...form, corso: e.target.value })}
                    className="w-full border border-smoke text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors duration-300"
                    style={{ background: 'rgba(28,28,30,0.8)' }}
                  >
                    <option value="">Seleziona un corso</option>
                    <option value="architettura">Architettura</option>
                    <option value="automotive">Automotive Design</option>
                    <option value="gioielleria">Gioielleria</option>
                    <option value="generale">Informazioni generali</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-silver/40 uppercase block mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                    Messaggio
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.messaggio}
                    onChange={e => setForm({ ...form, messaggio: e.target.value })}
                    className="w-full border border-smoke text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors duration-300 resize-none"
                    placeholder="Cosa vorresti sapere?"
                    style={{ background: 'rgba(28,28,30,0.8)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 font-body text-noir bg-gold py-5 uppercase tracking-widest text-xs hover:bg-goldLight transition-all duration-300 hover:scale-105"
                >
                  <Send size={14} />
                  Invia messaggio
                </button>
              </form>
            ) : (
              <div className="success-msg flex flex-col items-center justify-center h-full gap-6 py-20 text-center" style={{ opacity: 0 }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,162,39,0.1)', border: '2px solid rgba(201,162,39,0.4)' }}>
                  <Send size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-ivory text-2xl" style={{ letterSpacing: '-0.01em' }}>
                  Messaggio inviato.
                </h3>
                <p className="font-body text-silver/60 text-sm leading-relaxed max-w-sm">
                  Ti risponderemo entro 24 ore all'indirizzo <span className="text-gold">{form.email}</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

 {/* Sedi */}
<div className="py-40 px-6 md:px-20 bg-noir border-t border-smoke">
  <div className="max-w-7xl mx-auto">
    <div className="mb-16">
      <span className="font-body text-gold uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
        Le nostre sedi
      </span>
      <h2 className="font-display text-ivory mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
        Dove ci trovi.
      </h2>
      <p className="font-body text-silver/50 max-w-xl">
        Sedi fisiche Voire in rosso. Accademie di Belle Arti convenzionate in tutto il territorio nazionale.
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-16 items-start">

      {/* Mappa Leaflet */}
      <div className="w-full lg:w-1/2 relative overflow-hidden border border-smoke/30"
        style={{ height: '600px' }}>
        <div id="mappa-italia" style={{ height: '100%', width: '100%', background: '#0A0A0A' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.__mapInit = function() {
                  if (document.getElementById('mappa-italia') && !window.__mapLoaded) {
                    window.__mapLoaded = true;
                    var map = L.map('mappa-italia', {
                      center: [42.5, 12.5],
                      zoom: 5,
                      zoomControl: false,
                      attributionControl: false,
                    });

                    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
                      maxZoom: 10,
                    }).addTo(map);

                    var sedeIcon = L.divIcon({
                      html: '<div style="width:14px;height:14px;border-radius:50%;background:#8B3A3A;border:2px solid rgba(139,58,58,0.4);box-shadow:0 0 12px rgba(139,58,58,0.6);"></div>',
                      className: '',
                      iconSize: [14, 14],
                      iconAnchor: [7, 7],
                    });

                    var accIcon = L.divIcon({
                      html: '<div style="width:8px;height:8px;border-radius:50%;background:#C9A227;opacity:0.85;box-shadow:0 0 6px rgba(201,162,39,0.4);"></div>',
                      className: '',
                      iconSize: [8, 8],
                      iconAnchor: [4, 4],
                    });

                   var sedi = [
  { lat: 45.4654, lng: 9.1866, nome: 'Milano', tipo: 'Sede principale' },
  { lat: 41.9028, lng: 12.4964, nome: 'Roma', tipo: 'Sede secondaria' },
  { lat: 43.7696, lng: 11.2558, nome: 'Firenze', tipo: 'Centro esami' },
  { lat: 40.3515, lng: 18.1750, nome: 'Lecce', tipo: 'Sede Sud Italia' },
];

                    var accademie = [
                      { lat: 45.0703, lng: 7.6869, nome: 'Torino' },
                      { lat: 44.4056, lng: 8.9463, nome: 'Genova' },
                      { lat: 45.4408, lng: 12.3155, nome: 'Venezia' },
                      { lat: 45.6495, lng: 13.7768, nome: 'Trieste' },
                      { lat: 44.4949, lng: 11.3426, nome: 'Bologna' },
                      { lat: 44.0770, lng: 10.0989, nome: 'Carrara' },
                      { lat: 43.1107, lng: 12.3908, nome: 'Perugia' },
                      { lat: 40.8518, lng: 14.2681, nome: 'Napoli' },
                      { lat: 41.1171, lng: 16.8719, nome: 'Bari' },
                      { lat: 41.4621, lng: 15.5444, nome: 'Foggia' },
                      { lat: 38.9107, lng: 16.5874, nome: 'Catanzaro' },
                      { lat: 38.1113, lng: 15.6470, nome: 'Reggio Calabria' },
                      { lat: 38.1157, lng: 13.3615, nome: 'Palermo' },
                      { lat: 37.5079, lng: 15.0830, nome: 'Catania' },
                      { lat: 40.7259, lng: 8.5556, nome: 'Sassari' },
                      { lat: 39.2238, lng: 9.1217, nome: 'Cagliari' },
                      { lat: 45.5415, lng: 10.2118, nome: 'Brescia' },
                      { lat: 45.4384, lng: 10.9916, nome: 'Verona' },
                      { lat: 45.4064, lng: 11.8768, nome: 'Padova' },
                    ];

                    sedi.forEach(function(s) {
                      L.marker([s.lat, s.lng], { icon: sedeIcon })
                        .bindPopup('<b style="color:#FAF9F6;font-family:sans-serif">' + s.nome + '</b><br><span style="color:#C9A227;font-size:11px">' + s.tipo + '</span>')
                        .addTo(map);
                    });

                    accademie.forEach(function(a) {
                      L.marker([a.lat, a.lng], { icon: accIcon })
                        .bindPopup('<span style="color:#FAF9F6;font-family:sans-serif;font-size:12px">' + a.nome + '</span><br><span style="color:#C9A227;font-size:10px">Accademia convenzionata</span>')
                        .addTo(map);
                    });
                  }
                };
              }
            `
          }}
        />
      </div>

      {/* Lista sedi */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full" style={{ background: '#8B3A3A' }} />
            <span className="font-body uppercase text-silver/50" style={{ fontSize: '0.6rem', letterSpacing: '0.25em' }}>
              Sedi fisiche Voire
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { città: 'Milano', tipo: 'Sede principale', indirizzo: 'Via Montenapoleone 8, 20121' },
{ città: 'Roma', tipo: 'Sede secondaria', indirizzo: 'Via Condotti 12, 00187' },
{ città: 'Firenze', tipo: 'Centro esami', indirizzo: 'Via Tornabuoni 5, 50123' },
{ città: 'Lecce', tipo: 'Sede Sud Italia', indirizzo: 'Via Trinchese 15, 73100' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4 p-5 border border-smoke/50 hover:border-gold/30 transition-colors duration-300 group">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: '#8B3A3A' }} />
                <div>
                  <h3 className="font-display text-ivory text-lg group-hover:text-gold transition-colors duration-300" style={{ letterSpacing: '-0.01em' }}>
                    {s.città}
                  </h3>
                  <p className="font-body text-gold/70 text-xs uppercase tracking-widest mb-1">{s.tipo}</p>
                  <p className="font-body text-silver/50 text-sm">{s.indirizzo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full" style={{ background: '#C9A227' }} />
            <span className="font-body uppercase text-silver/50" style={{ fontSize: '0.6rem', letterSpacing: '0.25em' }}>
              Accademie convenzionate — 20 sedi
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Torino', 'Genova', 'Venezia', 'Trieste',
              'Bologna', 'Carrara', 'Perugia', 'Napoli',
              'Bari', 'Foggia', 'Lecce', 'Catanzaro',
              'Reggio Calabria', 'Palermo', 'Catania',
              'Sassari', 'Cagliari', 'Brescia', 'Verona', 'Padova',
            ].map((città, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-smoke/20">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#C9A227', opacity: 0.6 }} />
                <span className="font-body text-silver/50 text-xs">{città}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />
</main>
  )
}