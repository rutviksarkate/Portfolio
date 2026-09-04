import cn from '../lib/cn.js'
import Reveal from './Reveal.jsx'

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className,
}) {
  return (
    <Reveal className={cn('mb-12 max-w-2xl lg:mb-16', align === 'center' && 'mx-auto text-center', className)}>
      {label && (
        <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          {label}
        </span>
      )}
      <h2 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.15rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-mute lg:text-[1.05rem]">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
