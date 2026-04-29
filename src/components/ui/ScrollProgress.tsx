import { useScrollProgress } from '../../hooks/useIntersection'

/**
 * Thin amber progress bar fixed at the top of the viewport.
 * Reflects the user's reading progress through the page.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-amber to-gold transition-none"
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    />
  )
}
