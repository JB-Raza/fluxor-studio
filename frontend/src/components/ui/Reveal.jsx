import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { ease, prefersReducedMotion, scrollTriggerConfig } from '../../lib/motion'

export default function Reveal({
  children,
  className = '',
  y = 48,
  x = 0,
  delay = 0,
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const Component = Tag

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return undefined

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, x: 0, y: 0 })
        return undefined
      }

      const tween = gsap.from(el, {
        opacity: 0,
        y,
        x,
        duration: 0.9,
        delay,
        ease: ease.out,
        scrollTrigger: {
          trigger: el,
          ...scrollTriggerConfig(),
        },
      })

      return () => tween.kill()
    },
    { scope: ref },
  )

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
