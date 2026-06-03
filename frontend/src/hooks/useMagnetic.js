import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

// Pulls an element toward the cursor while hovered, springs back on leave.
export function useMagnetic({ strength = 0.4 } = {}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return undefined

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        xTo(relX * strength)
        yTo(relY * strength)
      }

      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: ref, dependencies: [strength] },
  )

  return ref
}
