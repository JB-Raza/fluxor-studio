import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export function useCountUp(value, { suffix = '', duration = 2, scrub = false } = {}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const [progress, setProgress] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (prefersReducedMotion()) {
      setDisplay(value)
      setProgress(1)
      return undefined
    }

    // Scrubbed: the number ticks as you scroll *through* the section.
    if (scrub) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        end: 'top 35%',
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress)
          setDisplay(Math.round(value * self.progress))
        },
      })
      return () => trigger.kill()
    }

    const counter = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true
        gsap.to(counter, {
          val: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplay(Math.round(counter.val))
            setProgress(counter.val / value)
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value, duration, scrub])

  return { ref, display: `${display}${suffix}`, progress }
}
