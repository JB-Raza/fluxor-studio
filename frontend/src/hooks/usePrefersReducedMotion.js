import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
