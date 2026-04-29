import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import SectionHeader from '../ui/SectionHeader'

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: string
  alt: string
  caption: string
  categoria: string
  span: 'normal' | 'wide' | 'tall'
}

// Placeholder gallery items — replace src with real image paths in /public/images/
const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1',  alt: 'Estación Villegas años 60',          caption: 'Estación Villegas — Años 60',          categoria: 'Ferrocarril', span: 'wide'   },
  { id: 'g2',  alt: 'Fonda Central de Cerritos',          caption: 'La Fonda Central',                     categoria: 'Fonda',       span: 'normal' },
  { id: 'g3',  alt: 'La carrilera y el tren',             caption: 'Los rieles de la carrilera',           categoria: 'Ferrocarril', span: 'tall'   },
  { id: 'g4',  alt: 'Tanque de agua del ferrocarril',     caption: 'Tanque de agua del ferrocarril',       categoria: 'Ferrocarril', span: 'normal' },
  { id: 'g5',  alt: 'Grupo Vida es Bella',                caption: 'Grupo Tercera Edad «La Vida es Bella»', categoria: 'Comunidad',   span: 'wide'   },
  { id: 'g6',  alt: 'Antigua casa estación en Belmonte',  caption: 'Casa estación en Belmonte',            categoria: 'Patrimonio',  span: 'normal' },
  { id: 'g7',  alt: 'El túnel del ferrocarril abandonado',caption: 'El túnel abandonado',                  categoria: 'Patrimonio',  span: 'normal' },
  { id: 'g8',  alt: 'Reunión comunitaria del proyecto',   caption: 'Reunión de recopilación de memorias',  categoria: 'Comunidad',   span: 'wide'   },
  { id: 'g9',  alt: 'Calles de Estación Villegas',        caption: 'Calles de Estación Villegas hoy',      categoria: 'Comunidad',   span: 'normal' },
]

const CATEGORIAS = ['Todas', 'Ferrocarril', 'Fonda', 'Patrimonio', 'Comunidad']

// Colour palette per item for placeholder backgrounds
const PLACEHOLDER_COLORS: Record<string, string> = {
  Ferrocarril: '#2C1810',
  Fonda:       '#3A2A10',
  Patrimonio:  '#1A2A15',
  Comunidad:   '#101820',
}

// ─── Placeholder image (SVG) when real photos are absent ─────────────────────
function PlaceholderImg({ item }: { item: GalleryItem }) {
  const bg = PLACEHOLDER_COLORS[item.categoria] ?? '#1E130A'
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill={bg} />
      <text
        x="200"
        y="130"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="40"
        fill="#D4890A"
        opacity="0.4"
      >
        {item.categoria === 'Ferrocarril' ? '🚂' :
         item.categoria === 'Fonda'       ? '🏘️' :
         item.categoria === 'Patrimonio'  ? '🏺' : '👥'}
      </text>
      <text
        x="200"
        y="185"
        textAnchor="middle"
        fontSize="13"
        fill="#C8B89A"
        opacity="0.5"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        {item.caption}
      </text>
      <text
        x="200"
        y="210"
        textAnchor="middle"
        fontSize="10"
        fill="#C8B89A"
        opacity="0.3"
        fontFamily="sans-serif"
      >
        Añadir imagen en /public/images/{item.id}.jpg
      </text>
    </svg>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-ink/90 backdrop-blur-md animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <div className="relative max-w-3xl w-full animate-float-up">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-cream/60 hover:text-cream transition-colors"
          aria-label="Cerrar"
        >
          <X size={22} />
        </button>
        <div className="rounded-xl overflow-hidden aspect-video bg-ink-soft">
          <PlaceholderImg item={item} />
        </div>
        <p className="mt-3 text-center font-body italic text-cream/60 text-sm">
          {item.caption}
        </p>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function GaleriaSection() {
  const [cat, setCat]      = useState('Todas')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const filtered = cat === 'Todas'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.categoria === cat)

  return (
    <section
      id="galeria"
      className="py-24 md:py-32 bg-paper"
      aria-label="Galería fotográfica"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Archivo visual"
            title="Galería de imágenes"
            subtitle="Fotografías históricas y del proceso comunitario de recopilación de memorias."
          />
        </AnimatedSection>

        {/* Filter bar */}
        <AnimatedSection delay={200}>
          <div
            className="flex flex-wrap gap-2 justify-center mb-10"
            role="group"
            aria-label="Filtros de categoría"
          >
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={c === cat}
                className={`px-4 py-1.5 rounded-full border font-sans text-sm transition-all duration-200
                  ${c === cat
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-cream text-ink-muted border-sepia/20 hover:border-sepia/50 hover:text-ink'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 80}>
              <button
                className={`group relative w-full overflow-hidden rounded-xl cursor-pointer
                            border border-sepia/10 hover:border-amber/40 transition-all duration-300
                            hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-amber block
                            ${item.span === 'tall' ? 'aspect-[3/4]' : 'aspect-video'}`}
                onClick={() => setLightbox(item)}
                aria-label={`Ver imagen: ${item.alt}`}
              >
                <PlaceholderImg item={item} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300
                                flex items-center justify-center">
                  <ZoomIn
                    size={28}
                    className="text-cream opacity-0 group-hover:opacity-100 transition-all duration-300
                               scale-75 group-hover:scale-100"
                  />
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3
                                bg-gradient-to-t from-ink/80 to-transparent
                                translate-y-2 opacity-0 group-hover:opacity-100
                                group-hover:translate-y-0 transition-all duration-300">
                  <p className="font-body italic text-xs text-cream leading-tight">{item.caption}</p>
                  <span className="font-sans text-[10px] text-amber/70 uppercase tracking-wider">
                    {item.categoria}
                  </span>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA to add photos */}
        <AnimatedSection delay={600}>
          <div className="mt-12 text-center">
            <p className="font-body text-ink-muted text-base italic">
              ¿Tienes fotografías históricas de Cerritos o Estación Villegas?
            </p>
            <a
              href="#comunidad"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('comunidad')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-block mt-3 font-sans text-sm text-amber underline-offset-4
                         hover:underline transition-colors"
            >
              Compártelas con la comunidad →
            </a>
          </div>
        </AnimatedSection>
      </div>

      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
