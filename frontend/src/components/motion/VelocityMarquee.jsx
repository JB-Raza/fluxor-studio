import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { getScrollVelocity } from '../../lib/scroll'
import { prefersReducedMotion } from '../../lib/motion'

// Seamless loop + scroll-velocity boost + skew for a "speed" feel.
export default function VelocityMarquee({
  items,
  className = '',
  duration = 35,
}) {
  const trackRef = useRef(null)
  const track = [...items, ...items]

  useGSAP(
    () => {
      const el = trackRef.current
      if (!el) return undefined

      if (prefersReducedMotion()) {
        gsap.set(el, { x: 0, skewX: 0 })
        return undefined
      }

      const half = el.scrollWidth / 2
      const offset = { x: 0 }
      const skewTo = gsap.quickTo(el, 'skewX', { duration: 0.35, ease: 'power3.out' })

      const tick = () => {
        const velocity = getScrollVelocity()
        const boost = Math.min(Math.abs(velocity) * 0.015, 4)
        offset.x -= 0.35 + boost

        if (offset.x <= -half) offset.x += half
        if (offset.x > 0) offset.x -= half

        gsap.set(el, { x: offset.x })
        skewTo(velocity * 0.06)
      }

      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        gsap.set(el, { clearProps: 'x,skewX' })
      }
    },
    { scope: trackRef, dependencies: [items.length, duration] },
  )

  if (prefersReducedMotion()) {
    return (
      <div className={['overflow-hidden', className].filter(Boolean).join(' ')}>
        <div className="flex flex-wrap justify-center gap-6 px-6 py-2">
          {items.map((item) => (
            <span
              key={item}
              className="text-sm font-medium uppercase tracking-widest text-secondary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={['overflow-hidden', className].filter(Boolean).join(' ')}>
      <div
        ref={trackRef}
        className="flex w-max gap-12 will-change-transform"
        aria-hidden="true"
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shrink-0 text-sm font-medium uppercase tracking-widest text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
