import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { gsap, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'
import { footerContent } from '../../data/footer'
import { siteName } from '../../data/nav'

function FooterLink({ href, label, external }) {
  const className = 'text-sm text-secondary transition-colors hover:text-primary'

  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        data-footer-link
        className={className}
        {...(external || href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {label}
      </a>
    )
  }

  if (href.startsWith('/#')) {
    return (
      <Link
        to={{ pathname: '/', hash: href.replace('/#', '#') }}
        data-footer-link
        className={className}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link to={href} data-footer-link className={className}>
      {label}
    </Link>
  )
}

export default function Footer() {
  const footerRef = useRef(null)
  const wordmarkRef = useRef(null)

  useGSAP(
    () => {
      const footer = footerRef.current
      const wordmark = wordmarkRef.current
      if (!footer) return undefined

      const cleanups = []

      if (wordmark && !prefersReducedMotion()) {
        gsap.set(wordmark, { clipPath: 'inset(100% 0 0 0)' })
        const wm = gsap.to(wordmark, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: wordmark,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })
        cleanups.push(() => wm.kill())
      }

      const links = gsap.utils.toArray(footer.querySelectorAll('[data-footer-link]'))
      if (links.length && !prefersReducedMotion()) {
        gsap.set(links, { opacity: 0, y: 12 })
        const lt = gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer.querySelector('[data-footer-grid]'),
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
        cleanups.push(() => lt.kill())
      }

      return () => cleanups.forEach((fn) => fn())
    },
    { scope: footerRef },
  )

  return (
    <footer ref={footerRef} className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
        <div
          data-footer-grid
          className="grid gap-10 border-b border-border pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <p className="text-lg font-semibold tracking-[0.12em] text-primary">
              {footerContent.brand.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary">
              {footerContent.brand.tagline}
            </p>
            <div className="mt-5">
              <Button href={footerContent.cta.href} variant="primary" showArrow={false}>
                {footerContent.cta.label}
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {footerContent.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-footer-link
                  className="text-xs uppercase tracking-[0.14em] text-secondary transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {footerContent.columns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      external={link.href.startsWith('http') || link.href.startsWith('mailto:')}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          ref={wordmarkRef}
          className="overflow-hidden py-10"
          aria-hidden="true"
        >
          <p className="select-none text-center text-[clamp(3rem,16vw,12rem)] font-bold leading-none tracking-tighter text-primary/[0.06]">
            {siteName}
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-secondary">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerContent.legal.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                data-footer-link
                className="text-xs text-secondary transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
