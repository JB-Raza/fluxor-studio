import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger } from './lib/gsap'
import { prefersReducedMotion } from './lib/motion'
import { prefetchMediaWhenIdle } from './lib/prefetchMedia'
import { serviceVideos, workVideos } from './data/assets'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  // The location actually rendered by <Routes>. We hold it on the old page
  // until the curtain covers the screen, so the new page never flashes.
  const [displayLocation, setDisplayLocation] = useState(location)
  const displayedPathRef = useRef(location.pathname)
  const curtainRef = useRef(null)

  // Warm the hover-video cache in the background once the page has loaded,
  // so the first hover is instant without delaying first paint.
  useEffect(() => {
    prefetchMediaWhenIdle([
      ...Object.values(workVideos),
      ...Object.values(serviceVideos),
    ])
  }, [])

  useEffect(() => {
    // Same page (hash/search change only): swap instantly, no curtain.
    if (location.pathname === displayedPathRef.current) {
      displayedPathRef.current = location.pathname
      setDisplayLocation(location)
      return undefined
    }

    const swap = () => {
      displayedPathRef.current = location.pathname
      setDisplayLocation(location)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    if (prefersReducedMotion()) {
      swap()
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return undefined
    }

    const curtain = curtainRef.current
    if (!curtain) {
      swap()
      return undefined
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    tl.set(curtain, { visibility: 'visible', pointerEvents: 'auto' })
    tl.fromTo(
      curtain,
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: 0.42 },
    )
    tl.add(swap)
    tl.set(curtain, { transformOrigin: 'top center' })
    tl.to(curtain, { scaleY: 0, duration: 0.42 })
    tl.set(curtain, {
      visibility: 'hidden',
      pointerEvents: 'none',
      transformOrigin: 'bottom center',
      scaleY: 0,
    })
    tl.add(() => ScrollTrigger.refresh())

    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[100] bg-background will-change-transform"
        style={{ transform: 'scaleY(0)' }}
      />
    </>
  )
}
