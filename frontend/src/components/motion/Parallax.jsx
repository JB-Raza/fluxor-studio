import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'

// Scroll-linked parallax. `speed` > 0 moves slower (recedes), creating depth.
export default function Parallax({
  children,
  speed = 1,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const Component = Tag

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return undefined

      const tween = gsap.fromTo(
        el,
        { yPercent: -speed * 8 },
        {
          yPercent: speed * 8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      return () => tween.kill()
    },
    { scope: ref, dependencies: [speed] },
  )

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
