import { useState } from 'react'
import { hitosHistoricos } from '../../data/historia'
import SectionHeader from '../ui/SectionHeader'
import AnimatedSection from '../ui/AnimatedSection'

/**
 * Interactive timeline of Cerritos' history.
 * Clicking a dot/card expands that era's detail panel.
 */
export default function HistoriaSection() {
  const [activeId, setActiveId] = useState<string>(hitosHistoricos[0].id)
  const active = hitosHistoricos.find((h) => h.id === activeId)!

  return (
    <section
      id="historia"
      className="py-24 md:py-32 bg-gradient-to-b from-paper to-cream"
      aria-label="Historia del territorio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Parte 1"
            title="El mapa del corazón: lo que nos hace Cerritos"
            subtitle="Un territorio que emergió entre los ríos Otún, Consota y La Vieja, testigo de siglos de historia."
          />
        </AnimatedSection>

        {/* ── Timeline rail ─────────────────────────────────── */}
        <AnimatedSection delay={200}>
          <div className="relative mb-10 overflow-x-auto pb-4" role="tablist" aria-label="Épocas históricas">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sepia/30 to-transparent" />

            <div className="flex justify-between min-w-[600px] md:min-w-0 relative z-10 px-4 pt-2 pb-6">
              {hitosHistoricos.map((hito, i) => {
                const isActive = hito.id === activeId
                return (
                  <button
                    key={hito.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${hito.id}`}
                    onClick={() => setActiveId(hito.id)}
                    className={`flex flex-col items-center gap-3 group transition-all duration-300 focus-visible:outline-none`}
                  >
                    {/* Dot */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
                        transition-all duration-300 border-2
                        ${isActive
                          ? 'scale-110 shadow-lg border-amber bg-ink text-amber'
                          : 'border-parchment bg-cream text-ink-muted group-hover:border-sepia group-hover:scale-105'
                        }`}
                    >
                      {hito.icono}
                    </div>

                    {/* Label */}
                    <div className="text-center max-w-[120px]">
                      <div
                        className={`font-sans text-[10px] uppercase tracking-wider transition-colors
                          ${isActive ? 'text-amber' : 'text-ink-muted group-hover:text-sepia'}`}
                      >
                        {hito.epoca}
                      </div>
                      <div
                        className={`font-body text-xs font-semibold leading-tight mt-0.5 sm:block
                          ${isActive ? 'text-ink' : 'text-ink-muted'}`}
                      >
                        {hito.titulo.split(' ').slice(0, 4).join(' ')}
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="w-1 h-1 rounded-full bg-amber" />
                    )}

                    {/* Progress number */}
                    <span className="sr-only">
                      Paso {i + 1} de {hitosHistoricos.length}: {hito.titulo}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Active era detail panel ────────────────────────── */}
        <AnimatedSection delay={350}>
          <div
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-label={active.titulo}
            key={active.id}
            className="bg-paper rounded-2xl border border-sepia/15 overflow-hidden shadow-sm
                       grid md:grid-cols-2 gap-0 transition-all duration-500"
          >
            {/* Visual accent side */}
            <div
              className="p-10 md:p-14 flex flex-col justify-center"
              style={{ backgroundColor: `${active.color}10`, borderRight: `1px solid ${active.color}20` }}
            >
              <div className="text-6xl mb-6" aria-hidden="true">{active.icono}</div>
              <span
                className="font-sans text-xs uppercase tracking-widest mb-2"
                style={{ color: active.color }}
              >
                {active.epoca}
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">
                {active.titulo}
              </h3>
              <div className="h-px w-12 bg-sepia/30 mb-4" />

              {/* Navigation arrows */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    const idx = hitosHistoricos.findIndex((h) => h.id === activeId)
                    if (idx > 0) setActiveId(hitosHistoricos[idx - 1].id)
                  }}
                  disabled={hitosHistoricos[0].id === activeId}
                  className="px-4 py-2 rounded-lg border border-sepia/20 font-sans text-sm text-ink-muted
                             hover:border-amber hover:text-amber disabled:opacity-30 disabled:cursor-not-allowed
                             transition-colors"
                  aria-label="Era anterior"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => {
                    const idx = hitosHistoricos.findIndex((h) => h.id === activeId)
                    if (idx < hitosHistoricos.length - 1) setActiveId(hitosHistoricos[idx + 1].id)
                  }}
                  disabled={hitosHistoricos[hitosHistoricos.length - 1].id === activeId}
                  className="px-4 py-2 rounded-lg border border-sepia/20 font-sans text-sm text-ink-muted
                             hover:border-amber hover:text-amber disabled:opacity-30 disabled:cursor-not-allowed
                             transition-colors"
                  aria-label="Era siguiente"
                >
                  Siguiente →
                </button>
              </div>
            </div>

            {/* Text content */}
            <div className="p-10 md:p-14 flex items-center">
              <p className="font-body text-lg md:text-xl text-ink-soft leading-[1.9]">
                {active.descripcion}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Context quote ─────────────────────────────────── */}
        <AnimatedSection delay={500}>
          <blockquote className="mt-12 text-center">
            <p className="font-accent italic text-xl md:text-2xl text-ink-muted max-w-3xl mx-auto leading-relaxed">
              «Es Cerritos para muchos, un territorio de comunidades de contrastes donde habita
              una comunidad grande por su historia y su gente.»
            </p>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  )
}
