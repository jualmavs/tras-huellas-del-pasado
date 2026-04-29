import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    const onScroll = () => {
      if (!parallaxRef.current) return
      parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  const scrollToNext = () =>
    document.getElementById('semilla')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-ink"
      aria-label="Portada principal"
    >
      {/* Parallax background — rieles ELIMINADOS de aquí */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0906] via-[#1E130A] to-[#2C1810]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-sepia/8 blur-[80px] pointer-events-none" />
      </div>

      {/* Locomotora: bottom-[14px] = altura del bloque sticky de rieles */}
      <div className="absolute bottom-[14px] left-0 train-svg pointer-events-none z-20" aria-hidden="true">
        {/* viewBox="0 -60 360 140" da 60px extra arriba → el humo ya no se corta */}
        <svg width="360" height="140" viewBox="0 -60 360 140" fill="none">
          <circle className="smoke-1" cx="52" cy="12" r="8"  fill="#C8B89A" opacity="0.6"  />
          <circle className="smoke-2" cx="60" cy="6"  r="6"  fill="#C8B89A" opacity="0.45" />
          <circle className="smoke-3" cx="46" cy="4"  r="5"  fill="#C8B89A" opacity="0.3"  />
          <rect x="48" y="20" width="8"  height="16" fill="#2C2015" />
          <rect x="44" y="18" width="16" height="4"  rx="1" fill="#3A2A1A" />
          <rect x="20" y="30" width="100" height="30" rx="4" fill="#2A1E10" />
          <rect x="22" y="32" width="96"  height="6"  rx="2" fill="#3D2B1A" />
          <rect x="100" y="22" width="40" height="38" rx="3" fill="#1E140A" />
          <rect x="104" y="26" width="14" height="10" rx="2" fill="#D4890A" opacity="0.7" />
          <rect x="122" y="26" width="14" height="10" rx="2" fill="#D4890A" opacity="0.7" />
          <polygon points="20,60 4,68 20,68" fill="#3A2A1A" />
          <circle cx="44"  cy="62" r="12" fill="#1E130A" stroke="#8B6914" strokeWidth="2"   />
          <circle cx="44"  cy="62" r="5"  fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
          <circle cx="80"  cy="62" r="12" fill="#1E130A" stroke="#8B6914" strokeWidth="2"   />
          <circle cx="80"  cy="62" r="5"  fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
          <circle cx="116" cy="62" r="10" fill="#1E130A" stroke="#8B6914" strokeWidth="1.5" />
          <circle cx="116" cy="62" r="4"  fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
          <circle cx="138" cy="64" r="7"  fill="#1E130A" stroke="#8B6914" strokeWidth="1.5" />
          <line x1="44" y1="62" x2="80" y2="62" stroke="#D4890A" strokeWidth="2" opacity="0.5" />
          <circle cx="22" cy="48" r="5" fill="#D4890A" opacity="0.9" />
          <circle cx="22" cy="48" r="3" fill="#FFC84A" />
          {/* Vagón 1 */}
          <rect x="142" y="58" width="18" height="3"  rx="1" fill="#3A2A1A" />
          <rect x="160" y="32" width="70" height="28" rx="3" fill="#2A1E10" />
          <rect x="162" y="34" width="66" height="5"  rx="1" fill="#3D2B1A" />
          <rect x="168" y="40" width="12" height="8"  rx="1" fill="#D4890A" opacity="0.5" />
          <rect x="186" y="40" width="12" height="8"  rx="1" fill="#D4890A" opacity="0.5" />
          <rect x="204" y="40" width="12" height="8"  rx="1" fill="#D4890A" opacity="0.5" />
          <circle cx="178" cy="64" r="8" fill="#1E130A" stroke="#8B6914" strokeWidth="1.5" />
          <circle cx="178" cy="64" r="3" fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
          <circle cx="212" cy="64" r="8" fill="#1E130A" stroke="#8B6914" strokeWidth="1.5" />
          <circle cx="212" cy="64" r="3" fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
          {/* Vagón 2 */}
          <rect x="230" y="58" width="18" height="3"  rx="1" fill="#3A2A1A" />
          <rect x="248" y="32" width="70" height="28" rx="3" fill="#2A1E10" />
          <rect x="250" y="34" width="66" height="5"  rx="1" fill="#3D2B1A" />
          <rect x="256" y="40" width="12" height="8"  rx="1" fill="#D4890A" opacity="0.5" />
          <rect x="274" y="40" width="12" height="8"  rx="1" fill="#D4890A" opacity="0.5" />
          <rect x="292" y="40" width="12" height="8"  rx="1" fill="#D4890A" opacity="0.5" />
          <circle cx="266" cy="64" r="8" fill="#1E130A" stroke="#8B6914" strokeWidth="1.5" />
          <circle cx="266" cy="64" r="3" fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
          <circle cx="300" cy="64" r="8" fill="#1E130A" stroke="#8B6914" strokeWidth="1.5" />
          <circle cx="300" cy="64" r="3" fill="#2C1810" stroke="#D4890A" strokeWidth="1"   />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-4 sm:px-8 text-center pt-20 pb-36">
        <div className={`mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
          <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-amber/80 border border-amber/25 rounded-full px-5 py-1.5">
            Cerritos · Pereira · Risaralda
          </span>
        </div>
        <h1 className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-[1.05] mb-6 transition-all duration-1000 text-shadow-warm ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
          Tras las huellas
          <br />
          <em className="text-amber not-italic">del pasado</em>
        </h1>
        <p className={`font-body text-xl md:text-2xl text-cream/60 max-w-2xl mx-auto mb-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '500ms' }}>
          Cerritos - Pereira: un viaje a través de la memoria colectiva de una comunidad.
        </p>
        <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '700ms' }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber/40" />
          <span className="text-amber text-sm" aria-hidden="true">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber/40" />
        </div>
        <p className={`font-body italic text-cream/40 text-base md:text-lg max-w-lg mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
          Una historia en construcción, un homenaje a nuestros ancestros y un legado para las futuras generaciones.
        </p>
        <div className={`flex justify-center gap-6 md:gap-16 mt-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1000ms' }}>
          {[
            { value: '8',  label: 'Capítulos de memoria' },
            { value: '20', label: 'Años en comunidad'    },
            { value: '6',  label: 'Protagonistas'        },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-amber">{stat.value}</div>
              <div className="font-sans text-xs text-cream/40 mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón Descubrir */}
      <button
        onClick={scrollToNext}
        aria-label="Ir a la siguiente sección"
        className={`absolute bottom-[130px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/30 hover:text-amber transition-all duration-500 group z-10 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1200ms' }}
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase">Descubrir</span>
        <ChevronDown size={18} className="animate-bounce group-hover:text-amber" />
      </button>

      {/* ── Rieles STICKY ──────────────────────────────────────────────────────
           sticky bottom-0 = pegado al fondo del viewport mientras el hero
           sea visible. Cuando el hero sale de pantalla, desaparecen solos.
           Antes estaban en el parallaxRef (absolute) y desaparecían al scroll.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 left-0 right-0 z-10 pointer-events-none h-[76px]">
        <div className="relative w-full h-full">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-[14px] w-6 h-[5px] rounded-sm"
              style={{
                left: `${(i / 28) * 100}%`,
                backgroundColor: 'rgba(139, 105, 20, 0.45)',
              }}
            />
          ))}
          <div className="absolute bottom-[10px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
          <div className="absolute bottom-[5px]  left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
        </div>
      </div>

    </section>
  )
}