import { Link } from 'react-router-dom'

// variant = color scheme (border / text / fill color)
const variants = {
  primary: {
    base: 'border-accent text-accent',
    fill: 'bg-accent',
  },
  secondary: {
    base: 'border-border text-primary',
    fill: 'bg-primary',
  },
}

// animStyle = hover behavior of the fill layer
const animStyles = {
  'fill-up': {
    fill: 'translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0',
    text: 'transition-colors duration-300 group-hover:text-background',
  },
  solid: {
    fill: 'translate-y-full group-hover:translate-y-0',
    text: 'group-hover:text-background',
  },
}

export default function Button({
  children,
  variant = 'primary',
  animStyle = 'fill-up',
  href,
  type = 'button',
  className = '',
  showArrow = true,
  ...props
}) {
  const scheme = variants[variant] ?? variants.primary
  const anim = animStyles[animStyle] ?? animStyles['fill-up']

  const classes = [
    'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-sm font-medium',
    scheme.base,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span
        aria-hidden="true"
        className={['absolute inset-0 -z-10 rounded-full', scheme.fill, anim.fill]
          .filter(Boolean)
          .join(' ')}
      />
      <span className={['relative z-10 inline-flex items-center gap-2', anim.text].join(' ')}>
        <span>{children}</span>
        {showArrow && <span aria-hidden="true">→</span>}
      </span>
    </>
  )

  if (href) {
    if (href.startsWith('/#')) {
      const hash = href.slice(1)
      return (
        <Link to={{ pathname: '/', hash }} className={classes} data-cursor="expand" {...props}>
          {content}
        </Link>
      )
    }

    if (href.startsWith('#')) {
      return (
        <a href={href} className={classes} data-cursor="expand" {...props}>
          {content}
        </a>
      )
    }

    if (href.startsWith('/')) {
      return (
        <Link to={href} className={classes} data-cursor="expand" {...props}>
          {content}
        </Link>
      )
    }

    return (
      <a href={href} className={classes} data-cursor="expand" {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} data-cursor="expand" {...props}>
      {content}
    </button>
  )
}
