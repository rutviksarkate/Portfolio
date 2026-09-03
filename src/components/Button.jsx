import cn from '../lib/cn.js'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none'

const variants = {
  primary:
    'bg-accent text-canvas hover:bg-accent-strong px-5 py-2.5 text-sm lg:px-6 lg:py-3 lg:text-base',
  secondary:
    'border border-line bg-transparent text-ink hover:bg-elevated px-5 py-2.5 text-sm lg:px-6 lg:py-3 lg:text-base',
  ghost:
    'text-mute hover:text-ink px-3 py-2 text-sm',
}

export default function Button({
  variant = 'primary',
  href,
  className,
  children,
  ...rest
}) {
  const classes = cn(base, variants[variant], className)

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
