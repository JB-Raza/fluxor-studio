import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'
import { navCta, navLinks, siteName } from '../../data/nav'
import Button from '../ui/Button'
import Magnetic from '../motion/Magnetic'

function NavItem({ link, onNavigate }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const closeTimer = useRef(null)
  const hasChildren = Boolean(link.children?.length)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  useGSAP(
    () => {
      const panel = panelRef.current
      if (!panel || !hasChildren) return undefined

      if (!open) {
        gsap.set(panel, { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0% round 12px)' })
        return undefined
      }

      if (prefersReducedMotion()) {
        gsap.set(panel, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)' })
        return undefined
      }

      const items = panel.querySelectorAll('[data-dropdown-item]')
      const tl = gsap.timeline()
      tl.set(panel, { autoAlpha: 1 })
        .fromTo(
          panel,
          { clipPath: 'inset(0% 0% 100% 0% round 12px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 0.4, ease: 'power3.out' },
        )
        .fromTo(
          items,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power3.out' },
          '-=0.2',
        )

      return () => tl.kill()
    },
    { dependencies: [open, hasChildren] },
  )

  if (!hasChildren) {
    const isHash = link.href.startsWith('/#')
    const className =
      'text-sm text-secondary transition-colors hover:text-primary'

    if (isHash) {
      return (
        <Link
          to={{ pathname: '/', hash: link.href.replace('/#', '#') }}
          className={className}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      )
    }

    return (
      <Link to={link.href} className={className} onClick={onNavigate}>
        {link.label}
      </Link>
    )
  }

  const openNow = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }

  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 220)
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-secondary transition-colors hover:text-primary"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {link.label}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>
      <div
        ref={panelRef}
        className="invisible absolute left-0 top-full z-50 mt-3 min-w-[240px] rounded-xl border border-border bg-surface/95 py-2 shadow-xl backdrop-blur-md"
        style={{ clipPath: 'inset(0% 0% 100% 0% round 12px)' }}
      >
        {link.children.map((child) => (
          <Link
            key={child.href}
            to={child.href}
            data-dropdown-item
            className="block px-4 py-2.5 text-sm text-secondary transition-colors hover:bg-background hover:text-primary"
            onClick={() => {
              setOpen(false)
              onNavigate?.()
            }}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const headerRef = useRef(null)
  const barRef = useRef(null)
  const mobilePanelRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const lastScroll = useRef(0)
  const hidden = useRef(false)

  useGSAP(
    () => {
      const panel = mobilePanelRef.current
      if (!panel) return undefined

      const items = panel.querySelectorAll('[data-mobile-item]')

      if (prefersReducedMotion()) {
        gsap.set(panel, { height: mobileOpen ? 'auto' : 0, autoAlpha: mobileOpen ? 1 : 0 })
        gsap.set(items, { opacity: 1, y: 0 })
        return undefined
      }

      const tl = gsap.timeline()

      if (mobileOpen) {
        tl.set(panel, { autoAlpha: 1 })
          .to(panel, { height: 'auto', duration: 0.4, ease: 'power3.out' })
          .fromTo(
            items,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.32, stagger: 0.05, ease: 'power3.out' },
            '-=0.18',
          )
      } else {
        tl.to(items, {
          y: -8,
          opacity: 0,
          duration: 0.2,
          stagger: 0.03,
          ease: 'power2.in',
        })
          .to(panel, { height: 0, duration: 0.32, ease: 'power3.inOut' }, '-=0.05')
          .set(panel, { autoAlpha: 0 })
      }

      return () => tl.kill()
    },
    { dependencies: [mobileOpen] },
  )

  useGSAP(
    () => {
      const header = headerRef.current
      const bar = barRef.current
      if (!header || !bar) return undefined

      if (prefersReducedMotion()) {
        gsap.set(bar, { backgroundColor: 'rgba(11, 11, 15, 0.9)' })
        return undefined
      }

      ScrollTrigger.create({
        start: 0,
        end: 280,
        scrub: 0.5,
        onUpdate: (self) => {
          const opacity = self.progress * 0.92
          gsap.set(bar, {
            backgroundColor: `rgba(11, 11, 15, ${opacity})`,
            borderBottomColor: `rgba(35, 35, 45, ${self.progress})`,
          })
        },
      })

      const onScroll = () => {
        const y = window.scrollY
        const delta = y - lastScroll.current

        if (mobileOpen) {
          lastScroll.current = y
          return
        }

        if (delta > 4 && y > 120 && !hidden.current) {
          hidden.current = true
          gsap.to(header, { yPercent: -100, duration: 0.45, ease: 'power3.inOut' })
        } else if (delta < -4 && hidden.current) {
          hidden.current = false
          gsap.to(header, { yPercent: 0, duration: 0.45, ease: 'power3.out' })
        }

        lastScroll.current = y
      }

      window.addEventListener('scroll', onScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    },
    { scope: headerRef, dependencies: [mobileOpen] },
  )

  useEffect(() => {
    setMobileOpen(false)
    hidden.current = false
    gsap.set(headerRef.current, { yPercent: 0 })
  }, [location.pathname])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40 will-change-transform">
      <div
        ref={barRef}
        className={[
          'border-b border-transparent backdrop-blur-md transition-[border-color] duration-300',
          mobileOpen ? 'border-border' : '',
        ].join(' ')}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-lg font-semibold tracking-[0.2em] text-primary"
          >
            {siteName}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic strength={0.35}>
              <Button variant="primary" href={navCta.href} showArrow>
                {navCta.label}
              </Button>
            </Magnetic>
          </div>

          <button
            type="button"
            className="rounded-lg border border-border px-3 py-2 text-sm text-primary lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        <div
          ref={mobilePanelRef}
          className="invisible overflow-hidden lg:hidden"
          style={{ height: 0 }}
        >
          <div className="border-t border-border px-6 py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} data-mobile-item className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-widest text-accent">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block text-secondary hover:text-primary"
                        onClick={closeMobile}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : link.href.startsWith('/#') ? (
                  <Link
                    key={link.label}
                    to={{ pathname: '/', hash: link.href.replace('/#', '#') }}
                    data-mobile-item
                    className="text-secondary hover:text-primary"
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    data-mobile-item
                    className="text-secondary hover:text-primary"
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div data-mobile-item className="mt-4">
                <Button variant="primary" href={navCta.href} className="w-full">
                  {navCta.label}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
