interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

/**
 * Reusable section heading block with optional eyebrow label and subtitle.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const textColor = light ? 'text-cream' : 'text-ink'
  const mutedColor = light ? 'text-parchment' : 'text-ink-muted'
  const eyebrowColor = light ? 'text-gold' : 'text-sepia'
  const dividerColor = light ? 'bg-gold/40' : 'bg-sepia/30'
  const align = centered ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 mb-12 ${align}`}>
      {eyebrow && (
        <span
          className={`font-sans text-xs uppercase tracking-[0.2em] font-medium ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`font-display text-4xl md:text-5xl leading-tight ${textColor} text-shadow-warm`}
      >
        {title}
      </h2>

      <div className={`w-16 h-[2px] rounded-full ${dividerColor}`} />

      {subtitle && (
        <p
          className={`font-body text-lg md:text-xl max-w-2xl leading-relaxed ${mutedColor}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
