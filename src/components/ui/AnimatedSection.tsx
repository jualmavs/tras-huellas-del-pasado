import { useIntersection } from '../../hooks/useIntersection'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

/**
 * Wraps any section with an intersection-triggered reveal animation.
 * direction controls which axis the element slides in from.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersection({ threshold: 0.12 })

  const base = 'transition-all ease-out duration-700'

  const hiddenStyles: Record<string, string> = {
    up:    'opacity-0 translate-y-8',
    left:  'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    none:  'opacity-0',
  }

  const visibleStyle = 'opacity-100 translate-y-0 translate-x-0'

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${base} ${isVisible ? visibleStyle : hiddenStyles[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
