import { Link } from 'react-router-dom'
import cn from '../lib/cn.js'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none'

const variants = {
  primary:
    'bg-cream text-canvas hover:bg-ink px-5 py-2.5 text-sm lg:px-6 lg:py-[0.7rem]',
  secondary:
    'border border-line bg-transparent text-ink hover:border-line-strong hover:bg-elevated px-5 py-2.5 text-sm lg:px-6 lg:py-[0.7rem]',
  ghost: 'text-mute hover:text-ink px-3 py-2 text-sm',
}

function isInternal(href) {
  return href.startsWith('/') || href.startsWith('#')
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
    const isFile = Boolean(rest.download)
    if (!isFile && isInternal(href)) {
      return (
        <Link to={href} className={classes} {...rest}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className={classes}
        {...(isFile || href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...rest}
      >
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
