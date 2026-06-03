import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function ContactSuccess() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return undefined

      const circle = root.querySelector('[data-success-circle]')
      const check = root.querySelector('[data-success-check]')
      const copy = root.querySelector('[data-success-copy]')

      if (prefersReducedMotion()) {
        gsap.set([circle, check, copy], { opacity: 1, clearProps: 'all' })
        return undefined
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        circle,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)' },
      )
        .fromTo(
          check,
          { strokeDashoffset: 52 },
          { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' },
          '-=0.1',
        )
        .fromTo(copy, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.15')

      return () => tl.kill()
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className="rounded-2xl border border-accent/30 bg-accent/10 p-10 text-center"
      data-cursor="hide"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
        <svg
          className="h-9 w-9 text-accent"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <circle
            data-success-circle
            cx="24"
            cy="24"
            r="22"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.35"
          />
          <path
            data-success-check
            d="M14 24.5 21 31.5 34 17"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="52"
            strokeDashoffset="52"
          />
        </svg>
      </div>
      <div data-success-copy>
        <p className="text-lg font-medium text-primary">Thank you!</p>
        <p className="mt-2 text-secondary">
          Your submission has been received. We&apos;ll be in touch soon.
        </p>
      </div>
    </div>
  )
}
