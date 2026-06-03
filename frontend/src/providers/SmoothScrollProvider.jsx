import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import {
  computeScrollProgress,
  setScrollProgress,
  setScrollVelocity,
} from '../lib/scroll'

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const updateProgress = () => setScrollProgress(computeScrollProgress())

    if (prefersReducedMotion()) {
      updateProgress()
      const onScroll = () => updateProgress()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      ScrollTrigger.refresh()
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    updateProgress()

    lenis.on('scroll', (event) => {
      ScrollTrigger.update()
      setScrollVelocity(event.velocity ?? 0)
      setScrollProgress(computeScrollProgress())
    })

    gsap.ticker.lagSmoothing(0)
    const onTick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return children
}
