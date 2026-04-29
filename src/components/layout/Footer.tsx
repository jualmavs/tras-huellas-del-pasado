import { BookOpen, Heart } from 'lucide-react'

/**
 * Full-width footer with credits, institutional information and colophon.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-cream/10">

          {/* Brand + mission */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-amber" />
              <span className="font-display text-lg text-cream">
                Tras las Huellas del Pasado
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed text-cream/60">
              Memoria viva del corregimiento de Cerritos – Pereira.<br />
              Un proyecto de recuperación histórica desde la escuela y la comunidad.
            </p>
          </div>

          {/* Credits */}
          <div>
            <h3 className="font-display text-base text-cream mb-4">Protagonistas</h3>
            <ul className="space-y-1 font-body text-sm text-cream/60">
              <li>María Alejandra Alzate Toro — <span className="italic">Docente e investigadora</span></li>
              <li>Luz Nelby Sánchez — <span className="italic">Presidenta Estación Villegas</span></li>
              <li>Libia Elena Dimaté — <span className="italic">Vicepresidenta</span></li>
              <li>Grupo Tercera Edad «La Vida es Bella»</li>
              <li>Laura Rosa Romero</li>
              <li>Estudiantes grado 7° — <span className="italic">2025 y años anteriores</span></li>
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h3 className="font-display text-base text-cream mb-4">Institución</h3>
            <p className="font-body text-sm text-cream/60 leading-relaxed">
              Institución Educativa Comunitario Cerritos<br />
              Cerritos – Pereira, Risaralda, Colombia<br />
              <span className="italic">Noviembre de 2025</span>
            </p>
            <div className="mt-4">
              <p className="font-body text-xs text-cream/40 italic">
                «Gracias a esta hermosa comunidad de Cerritos<br />
                por acogerme durante 20 años.»<br />
                — María Aleja
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs text-cream/30">
            © {year} · Comunidad Cerritos – Pereira · Todos los derechos reservados
          </p>
          <p className="font-sans text-xs text-cream/30 flex items-center gap-1">
            Hecho con <Heart size={10} className="text-amber fill-amber" /> en Cerritos
          </p>
        </div>

      </div>
    </footer>
  )
}
