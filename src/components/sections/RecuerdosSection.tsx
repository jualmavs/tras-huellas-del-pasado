import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { recuerdos } from '../../data/recuerdos'
import SectionHeader from '../ui/SectionHeader'
import AnimatedSection from '../ui/AnimatedSection'

/**
 * Core section of the site — the eight memory chapters.
 * Left column: category selector tabs.
 * Right panel: quotes from the elderly with animated entry.
 */
export default function RecuerdosSection() {
  const [activeId, setActiveId] = useState<string>(recuerdos[0].id)
  const [citaIdx, setCitaIdx] = useState(0)

  const active = recuerdos.find((r) => r.id === activeId)!

  const selectRecuerdo = (id: string) => {
    setActiveId(id)
    setCitaIdx(0)
  }

  const prevCita = () => setCitaIdx((i) => Math.max(0, i - 1))
  const nextCita = () => setCitaIdx((i) => Math.min(active.citas.length - 1, i + 1))

  return (
    <section
      id="recuerdos"
      className="py-24 md:py-32 bg-ink"
      aria-label="Recuerdos de Estación Villegas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Parte 2"
            title="Recuerdos de Estación Villegas"
            subtitle="Las voces de nuestros mayores, guardadas para siempre."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── Category tabs (left) ────────────────────────── */}
          <AnimatedSection direction="left" delay={150} className="lg:col-span-1">
            <nav aria-label="Categorías de recuerdos">
              <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 list-none">
                {recuerdos.map((r) => (
                  <li key={r.id} className="shrink-0">
                    <button
                      onClick={() => selectRecuerdo(r.id)}
                      aria-pressed={r.id === activeId}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-250
                        font-sans text-sm whitespace-nowrap lg:whitespace-normal flex items-center gap-3
                        ${r.id === activeId
                          ? 'bg-cream/10 border-amber/40 text-cream'
                          : 'bg-cream/5 border-cream/10 text-cream/50 hover:bg-cream/8 hover:text-cream/70 hover:border-cream/20'
                        }`}
                    >
                      <span className="text-xl shrink-0">{r.icono}</span>
                      <span className="leading-tight">{r.categoria}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimatedSection>

          {/* ── Quote panel (right) ─────────────────────────── */}
          <AnimatedSection delay={300} className="lg:col-span-2">
            <article
              key={activeId}
              className="rounded-2xl overflow-hidden h-full"
              style={{ backgroundColor: active.colorBg, border: `1px solid ${active.colorAccent}20` }}
              aria-live="polite"
              aria-label={active.titulo}
            >
              {/* Card header */}
              <div
                className="px-8 py-6 border-b flex items-center gap-4"
                style={{ borderColor: `${active.colorAccent}15` }}
              >
                <span className="text-4xl" aria-hidden="true">{active.icono}</span>
                <div>
                  <h3
                    className="font-display text-2xl md:text-3xl leading-tight"
                    style={{ color: active.colorAccent }}
                  >
                    {active.titulo}
                  </h3>
                  <p className="font-sans text-xs text-ink-muted mt-1 tracking-wide">
                    {active.subtitulo}
                  </p>
                </div>
              </div>

              {/* Quote body */}
              <div className="px-8 py-8 min-h-[260px] flex flex-col justify-between">
                <div>
                  {/* Opening quote mark */}
                  <div
                    className="font-accent text-8xl leading-none mb-2 select-none"
                    style={{ color: active.colorAccent, opacity: 0.25 }}
                    aria-hidden="true"
                  >
                    "
                  </div>

                  <p
                    key={`${activeId}-${citaIdx}`}
                    className="font-body text-lg md:text-xl text-ink-soft leading-[1.9]
                               animate-fade-in"
                  >
                    {active.citas[citaIdx]}
                  </p>

                  <div
                    className="font-accent text-5xl leading-none mt-2 text-right select-none"
                    style={{ color: active.colorAccent, opacity: 0.25 }}
                    aria-hidden="true"
                  >
                    "
                  </div>
                </div>

                {/* ── Navigation controls ───── */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t"
                     style={{ borderColor: `${active.colorAccent}15` }}>

                  {/* Dot indicators */}
                  <div className="flex gap-1.5" role="tablist" aria-label="Citas disponibles">
                    {active.citas.map((_, i) => (
                      <button
                        key={i}
                        role="tab"
                        aria-selected={i === citaIdx}
                        onClick={() => setCitaIdx(i)}
                        className={`h-1.5 rounded-full transition-all duration-300
                          ${i === citaIdx ? 'w-6' : 'w-1.5 opacity-30'}`}
                        style={{ backgroundColor: active.colorAccent }}
                        aria-label={`Cita ${i + 1} de ${active.citas.length}`}
                      />
                    ))}
                  </div>

                  {/* Prev / next */}
                  <div className="flex gap-2">
                    <button
                      onClick={prevCita}
                      disabled={citaIdx === 0}
                      aria-label="Cita anterior"
                      className="p-2 rounded-lg border transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105"
                      style={{
                        borderColor: `${active.colorAccent}25`,
                        color: active.colorAccent,
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextCita}
                      disabled={citaIdx === active.citas.length - 1}
                      aria-label="Cita siguiente"
                      className="p-2 rounded-lg border transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105"
                      style={{
                        borderColor: `${active.colorAccent}25`,
                        color: active.colorAccent,
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>

        {/* ── Bottom attribution ────────────────────────────── */}
        <AnimatedSection delay={600}>
          <p className="mt-12 text-center font-body italic text-cream/30 text-sm">
            Testimonios recopilados con el Grupo de Tercera Edad «La Vida es Bella» de Estación Villegas.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
