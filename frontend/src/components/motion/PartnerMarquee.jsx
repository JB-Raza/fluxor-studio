import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'

// Steady, continuous partner strip. Each item shows the partner name;
// on hover the name fades out and its logo scales 0 → 1 in place.
function PartnerItem({ name, logo }) {
  return (
    <div
      className="group relative flex h-12 shrink-0 items-center justify-center"
      style={{ minWidth: '12rem' }}
    >
      <span className="whitespace-nowrap text-sm font-medium uppercase tracking-widest text-secondary transition-opacity duration-300 ease-out group-hover:opacity-0">
        {name}
      </span>
      <img
        src={logo}
        alt={name}
        loading="lazy"
        className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-auto max-w-[140px] -translate-x-1/2 -translate-y-1/2 scale-0 object-contain transition-transform duration-500 ease-out group-hover:scale-150"
      />
    </div>
  )
}

export default function PartnerMarquee({ items, className = '', speed = 1.1 }) {
  const trackRef = useRef(null)
  const track = [...items, ...items]

  useGSAP(
    () => {
      const el = trackRef.current
      if (!el || prefersReducedMotion()) return undefined

      const half = el.scrollWidth / 2
      const offset = { x: 0 }

      const tick = () => {
        offset.x -= speed
        if (offset.x <= -half) offset.x += half
        gsap.set(el, { x: offset.x })
      }

      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        gsap.set(el, { clearProps: 'x' })
      }
    },
    { scope: trackRef, dependencies: [items.length, speed] },
  )

  if (prefersReducedMotion()) {
    return (
      <div className={['overflow-hidden', className].filter(Boolean).join(' ')}>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 px-6">
          {items.map((item) => (
            <PartnerItem key={item.name} name={item.name} logo={item.logo} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={['overflow-hidden', className].filter(Boolean).join(' ')}>
      <div ref={trackRef} className="flex w-max gap-12 will-change-transform">
        {track.map((item, index) => (
          <PartnerItem key={`${item.name}-${index}`} name={item.name} logo={item.logo} />
        ))}
      </div>
    </div>
  )
}
