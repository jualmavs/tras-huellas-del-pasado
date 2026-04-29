import { useState } from 'react'
import { protagonistas } from '../../data/protagonistas'
import type { Protagonista } from '../../types'
import SectionHeader from '../ui/SectionHeader'
import AnimatedSection from '../ui/AnimatedSection'
import { X } from 'lucide-react'

// ─── Single protagonist card ─────────────────────────────────────────────────
function ProtagonistCard({
  p,
  onClick,
}: {
  p: Protagonista
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl border p-6 transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-amber cursor-pointer w-full
        ${p.destacado
          ? 'border-amber/40 bg-gradient-to-br from-amber/10 to-sepia/5 col-span-1 md:col-span-2 lg:col-span-1'
          : 'border-sepia/15 bg-paper hover:border-sepia/30'
        }`}
      aria-label={`Ver detalles de ${p.nombre}`}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center
                   font-display text-xl mb-4 transition-transform duration-300
                   group-hover:scale-110"
        style={{ backgroundColor: p.colorBg, color: p.colorText }}
      >
        {p.iniciales}
      </div>

      {/* Badge for featured */}
      {p.destacado && (
        <span className="absolute top-4 right-4 font-sans text-[10px] uppercase tracking-widest
                         text-amber border border-amber/30 rounded-full px-2 py-0.5 bg-amber/5">
          Autora principal
        </span>
      )}

      <h3 className="font-display text-lg text-ink leading-tight mb-1">
        {p.nombre}
      </h3>
      <p className="font-sans text-xs text-sepia uppercase tracking-wide mb-3">
        {p.rol}
      </p>
      <p className="font-body text-sm text-ink-muted leading-relaxed line-clamp-3">
        {p.descripcion}
      </p>

      <div className="mt-4 font-sans text-xs text-sepia/60 group-hover:text-amber transition-colors">
        Ver aporte →
      </div>
    </button>
  )
}

// ─── Detail modal ─────────────────────────────────────────────────────────────
function ProtagonistModal({
  p,
  onClose,
}: {
  p: Protagonista
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${p.nombre}`}
    >
      <div className="bg-cream rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-float-up">
        {/* Header */}
        <div
          className="px-8 py-6 flex items-start justify-between"
          style={{ backgroundColor: p.colorBg }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl shrink-0"
              style={{ backgroundColor: p.colorBg, color: p.colorText, border: `2px solid ${p.colorText}20` }}
            >
              {p.iniciales}
            </div>
            <div>
              <h2 className="font-display text-xl text-ink leading-tight">{p.nombre}</h2>
              <p className="font-sans text-xs text-sepia uppercase tracking-wide mt-1">{p.rol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink transition-colors p-1 -mr-1 -mt-1 shrink-0"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-5">
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-sepia mb-2">
              Sobre esta persona
            </h3>
            <p className="font-body text-base text-ink-soft leading-relaxed">{p.descripcion}</p>
          </div>

          <div className="h-px bg-sepia/10" />

          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-sepia mb-2">
              Su aporte al proyecto
            </h3>
            <p className="font-body text-base text-ink-soft leading-relaxed">{p.aporte}</p>
          </div>
        </div>

        <div className="px-8 py-4 bg-paper border-t border-sepia/10 flex justify-end">
          <button
            onClick={onClose}
            className="font-sans text-sm text-ink-muted hover:text-amber transition-colors px-4 py-2
                       rounded-lg border border-sepia/20 hover:border-amber/40"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ProtagonistasSection() {
  const [selected, setSelected] = useState<Protagonista | null>(null)

  return (
    <section
      id="protagonistas"
      className="py-24 md:py-32 bg-cream"
      aria-label="Protagonistas del proyecto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Reconocimiento"
            title="Quienes tejieron esta historia"
            subtitle="Cada voz, cada mano, cada corazón que hizo posible este libro de memoria viva."
          />
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {protagonistas.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 100}>
              <ProtagonistCard p={p} onClick={() => setSelected(p)} />
            </AnimatedSection>
          ))}
        </div>

        {/* Dedication note */}
        <AnimatedSection delay={700}>
          <div className="mt-16 rounded-2xl bg-ink p-8 md:p-12 text-center">
            <div className="text-4xl mb-4" aria-hidden="true">✦</div>
            <blockquote>
              <p className="font-accent italic text-xl md:text-2xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
                «Gracias a todos los que han resonado con este proyecto, por ser cocreadores
                e inspiradores de esta aventura. Gracias a quienes han sido, son y serán.»
              </p>
              <footer className="mt-4">
                <cite className="font-sans text-xs text-amber uppercase tracking-widest not-italic">
                  — María Aleja · Noviembre de 2025
                </cite>
              </footer>
            </blockquote>
          </div>
        </AnimatedSection>
      </div>

      {/* Modal */}
      {selected && (
        <ProtagonistModal p={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
