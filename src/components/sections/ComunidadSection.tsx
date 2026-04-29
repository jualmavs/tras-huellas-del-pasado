import { useState, useId } from 'react'
import { Send, MessageCircle, Heart } from 'lucide-react'
import type { Comentario } from '../../types'
import AnimatedSection from '../ui/AnimatedSection'
import SectionHeader from '../ui/SectionHeader'

// ─── Seed comments (pre-populated so section isn't empty on first load) ───────
const SEED_COMMENTS: Comentario[] = [
  {
    id: 'c1',
    nombre: 'Don José',
    mensaje: 'Cuando usted se va a enriquecer, no necesita matar a nadie ni matarse trabajando. Así decían de Don Pepe Calle en la fonda. ¡Qué recuerdos tan bonitos trae este proyecto!',
    fecha: 'Noviembre 2025',
    categoria: 'La Fonda Central',
  },
  {
    id: 'c2',
    nombre: 'Comunidad Villegas',
    mensaje: 'El tren era nuestra conexión con el mundo. Los domingos toda la vereda se llenaba de alegría. Gracias por no dejar morir estos recuerdos.',
    fecha: 'Noviembre 2025',
    categoria: 'El Ferrocarril',
  },
]

// ─── POLL component ───────────────────────────────────────────────────────────
const POLL_OPTIONS = [
  { id: 'tren',   label: 'El ferrocarril y las marranitas',      emoji: '🚂' },
  { id: 'fonda',  label: 'La Fonda Central y Don Pepe Calle',    emoji: '🏘️' },
  { id: 'agua',   label: 'Los pozos y el río Consota',           emoji: '💧' },
  { id: 'juegos', label: 'Los juegos de la infancia',            emoji: '🪁' },
  { id: 'navidad',label: 'La solidaridad en Navidades',          emoji: '🕯️' },
]

function Poll() {
  const [voted, setVoted] = useState<string | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>({
    tren: 24, fonda: 18, agua: 12, juegos: 31, navidad: 20,
  })

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)

  const handleVote = (id: string) => {
    if (voted) return
    setVoted(id)
    setVotes((v) => ({ ...v, [id]: v[id] + 1 }))
  }

  return (
    <div className="bg-paper rounded-2xl border border-sepia/15 p-8">
      <div className="flex items-center gap-2 mb-2">
        <Heart size={16} className="text-amber" />
        <h3 className="font-display text-xl text-ink">¿Qué recuerdo te llegó más al corazón?</h3>
      </div>
      <p className="font-body text-sm text-ink-muted mb-6 italic">
        {voted ? `Gracias por votar · ${totalVotes + 1} personas han participado` : 'Selecciona el que más te emocionó'}
      </p>

      <ul className="space-y-3 list-none">
        {POLL_OPTIONS.map((opt) => {
          const pct = Math.round(((votes[opt.id] ?? 0) / (totalVotes || 1)) * 100)
          const isWinner = voted && Object.entries(votes).sort((a,b) => b[1]-a[1])[0][0] === opt.id

          return (
            <li key={opt.id}>
              <button
                onClick={() => handleVote(opt.id)}
                disabled={!!voted}
                className={`w-full text-left rounded-xl overflow-hidden border transition-all duration-300
                  ${voted === opt.id
                    ? 'border-amber/50 bg-amber/8'
                    : voted
                      ? 'border-sepia/10 bg-cream/50 cursor-default'
                      : 'border-sepia/15 hover:border-sepia/35 hover:bg-cream/80 cursor-pointer'
                  }`}
                aria-label={`Votar por: ${opt.label}`}
                aria-pressed={voted === opt.id}
              >
                <div className="relative px-4 py-3 flex items-center justify-between gap-3">
                  {/* Progress bar behind */}
                  {voted && (
                    <div
                      className="absolute inset-0 rounded-xl transition-all duration-700 opacity-10"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: isWinner ? '#D4890A' : '#8B6914',
                      }}
                    />
                  )}

                  <span className="relative flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">{opt.emoji}</span>
                    <span className="font-body text-sm text-ink">{opt.label}</span>
                  </span>

                  {voted && (
                    <span className={`relative font-sans text-xs font-medium shrink-0
                      ${isWinner ? 'text-amber' : 'text-ink-muted'}`}>
                      {pct}%
                    </span>
                  )}
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── Comment card ─────────────────────────────────────────────────────────────
function CommentCard({ c }: { c: Comentario }) {
  return (
    <article className="bg-paper rounded-xl border border-sepia/10 p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sepia/15 flex items-center justify-center
                         font-display text-sm text-sepia shrink-0">
            {c.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-ink">{c.nombre}</p>
            {c.categoria && (
              <span className="font-sans text-[10px] uppercase tracking-wider text-amber">
                {c.categoria}
              </span>
            )}
          </div>
        </div>
        <time className="font-sans text-xs text-ink-muted shrink-0">{c.fecha}</time>
      </div>
      <p className="font-body text-base text-ink-soft leading-relaxed">{c.mensaje}</p>
    </article>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ComunidadSection() {
  const formId = useId()
  const [comments, setComments] = useState<Comentario[]>(SEED_COMMENTS)
  const [nombre, setNombre]   = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cat, setCat]         = useState('')
  const [status, setStatus]   = useState<'idle' | 'success' | 'error'>('idle')
  const [loading, setLoading] = useState(false)

  const CATEGORIAS = [
    'El Ferrocarril', 'La Fonda Central', 'El Agua', 'La Escuela',
    'Los Juegos', 'La Energía', 'Cómo se Pobló', 'Otro recuerdo',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !mensaje.trim()) {
      setStatus('error')
      return
    }

    setLoading(true)
    // Simulated async submit (replace with real API call)
    await new Promise((r) => setTimeout(r, 800))

    const newComment: Comentario = {
      id:        `c${Date.now()}`,
      nombre:    nombre.trim(),
      mensaje:   mensaje.trim(),
      fecha:     new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }),
      categoria: cat || undefined,
    }

    setComments((prev) => [newComment, ...prev])
    setNombre('')
    setMensaje('')
    setCat('')
    setStatus('success')
    setLoading(false)

    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section
      id="comunidad"
      className="py-24 md:py-32 bg-ink"
      aria-label="Comunidad y comentarios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="El libro que no acaba"
            title="Tu voz también importa"
            subtitle="Comparte tus propios recuerdos de Cerritos. Este libro vive y crece contigo."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Left: form ──────────────────────────────────── */}
          <AnimatedSection direction="left" delay={200}>
            <div className="bg-cream/5 rounded-2xl border border-cream/10 p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle size={18} className="text-amber" />
                <h3 className="font-display text-xl text-cream">Añadir un recuerdo</h3>
              </div>

              <form onSubmit={handleSubmit} noValidate aria-label="Formulario de recuerdo">
                {/* Name */}
                <div className="mb-5">
                  <label
                    htmlFor={`${formId}-nombre`}
                    className="block font-sans text-xs uppercase tracking-widest text-cream/50 mb-2"
                  >
                    Tu nombre
                  </label>
                  <input
                    id={`${formId}-nombre`}
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="¿Cómo te llamas?"
                    maxLength={80}
                    required
                    className="w-full bg-cream/5 border border-cream/15 rounded-xl px-4 py-3
                               font-body text-base text-cream placeholder-cream/30
                               focus:outline-none focus:border-amber/50 transition-colors"
                    aria-required="true"
                  />
                </div>

                {/* Category */}
                <div className="mb-5">
                  <label
                    htmlFor={`${formId}-cat`}
                    className="block font-sans text-xs uppercase tracking-widest text-cream/50 mb-2"
                  >
                    Categoría (opcional)
                  </label>
                  <select
                    id={`${formId}-cat`}
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="w-full bg-cream/5 border border-cream/15 rounded-xl px-4 py-3
                               font-body text-base text-cream focus:outline-none focus:border-amber/50
                               transition-colors"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="">— Elige una categoría —</option>
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label
                    htmlFor={`${formId}-mensaje`}
                    className="block font-sans text-xs uppercase tracking-widest text-cream/50 mb-2"
                  >
                    Tu recuerdo
                  </label>
                  <textarea
                    id={`${formId}-mensaje`}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Cuéntanos una historia, un recuerdo, una anécdota de Cerritos o Estación Villegas…"
                    rows={5}
                    maxLength={600}
                    required
                    className="w-full bg-cream/5 border border-cream/15 rounded-xl px-4 py-3
                               font-body text-base text-cream placeholder-cream/30 resize-none
                               focus:outline-none focus:border-amber/50 transition-colors"
                    aria-required="true"
                  />
                  <div className="text-right mt-1 font-sans text-xs text-cream/25">
                    {mensaje.length}/600
                  </div>
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <p role="status" className="mb-4 font-body text-sm text-green-light">
                    ¡Gracias! Tu recuerdo ha sido añadido.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="mb-4 font-body text-sm text-rust-light">
                    Por favor completa tu nombre y mensaje.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                             bg-amber text-ink font-sans text-sm font-medium
                             hover:bg-amber-dark transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Guardando…</span>
                  ) : (
                    <>
                      <Send size={15} />
                      Compartir mi recuerdo
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* ── Right: poll + comments ───────────────────────── */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={300}>
              <Poll />
            </AnimatedSection>

            <AnimatedSection delay={450}>
              <div>
                <h3 className="font-display text-lg text-cream mb-4">
                  Recuerdos de la comunidad
                </h3>
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1" aria-live="polite">
                  {comments.map((c) => (
                    <CommentCard key={c.id} c={c} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
