import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

// 3D perspective tilt that follows the cursor over a card.
export function useTilt({ max = 8 } = {}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return undefined

      gsap.set(el, { transformPerspective: 800, transformStyle: 'preserve-3d' })
      const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' })
      const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' })

      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        rotY(px * max * 2)
        rotX(-py * max * 2)
      }

      const onLeave = () => {
        rotX(0)
        rotY(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: ref, dependencies: [max] },
  )

  return ref
}
