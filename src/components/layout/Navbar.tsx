import { useState } from 'react'
import { Menu, X, BookOpen } from 'lucide-react'
import { useScrolledPast } from '../../hooks/useIntersection'

const NAV_LINKS = [
  { href: '#semilla',        label: 'Semilla' },
  { href: '#historia',       label: 'Territorio' },
  { href: '#recuerdos',      label: 'Recuerdos' },
  { href: '#protagonistas',  label: 'Protagonistas' },
  { href: '#galeria',        label: 'Galería' },
  { href: '#comunidad',      label: 'Comunidad' },
]

/**
 * Sticky top navigation.
 * – Transparent on the hero, transitions to a warm dark background on scroll.
 * – Full responsive: collapses to a hamburger on mobile.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolledPast(80)

  const handleNavClick = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md shadow-lg shadow-ink/20'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Navegación principal"
      >
        {/* Logo / brand */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-amber rounded"
        >
          <BookOpen
            size={20}
            className="text-amber group-hover:scale-110 transition-transform"
          />
          <span className="font-display text-sm text-cream/90 hidden sm:block leading-tight">
            Cerritos<br />
            <span className="text-gold text-xs font-normal">Memoria Viva</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`font-sans text-sm tracking-wide transition-colors duration-200 hover:text-amber
                  ${scrolled ? 'text-cream/70' : 'text-cream/60'}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-cream/80 hover:text-amber transition-colors p-2 -mr-2"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-ink/97 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 pb-6 pt-2 gap-1 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left py-3 font-sans text-base text-cream/70 hover:text-amber
                           border-b border-cream/10 last:border-0 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
