import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'
import { pageMeta } from '../data/nav'
import { usePageMeta } from '../hooks/usePageMeta'
import Loader from '../sections/Loader'
import Hero from '../sections/Hero'
import SocialProof from '../sections/SocialProof'
import SelectedWork from '../sections/SelectedWork'
import Services from '../sections/Services'
import About from '../sections/About'
import WhyFluxor from '../sections/WhyFluxor'
import Process from '../sections/Process'
import Testimonials from '../sections/Testimonials'
import ContactCTA from '../sections/ContactCTA'

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(
    () => Boolean(sessionStorage.getItem('fluxor-loader-seen')),
  )
  const location = useLocation()

  usePageMeta(pageMeta.home)

  useEffect(() => {
    if (!loaderDone) return undefined

    const hash = location.hash.replace('#', '')
    if (!hash) return undefined

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      ScrollTrigger.refresh()
    }, 100)

    return () => window.clearTimeout(timer)
  }, [loaderDone, location.hash])

  useEffect(() => {
    if (!loaderDone) return undefined

    const onLoad = () => ScrollTrigger.refresh()
    ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => window.removeEventListener('load', onLoad)
  }, [loaderDone])

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />
      <main
        id="main-content"
        tabIndex={-1}
        className={loaderDone ? '' : 'overflow-hidden max-h-screen'}
      >
        <Hero started={loaderDone} />
        <SocialProof />
        <SelectedWork />
        <Services />
        <About />
        <WhyFluxor />
        <Process />
        <Testimonials />
        <ContactCTA />
      </main>
    </>
  )
}
