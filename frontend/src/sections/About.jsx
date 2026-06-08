import { useRef } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { splitText } from '../hooks/useSplitText'
import { aboutMedia } from '../data/assets'
import { aboutSection } from '../data/stats'
import StatsBar from './StatsBar'

export default function About() {
  const sectionRef = useRef(null)
  const wordmarkRef = useRef(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return undefined

      const cleanups = []

      // Parallax giant FLUXOR wordmark behind the copy.
      if (wordmarkRef.current && !prefersReducedMotion()) {
        const p = gsap.fromTo(
          wordmarkRef.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
        cleanups.push(() => p.kill())
      }

      // Line-mask reveal for each paragraph.
      const paras = section.querySelectorAll('[data-about-para]')
      paras.forEach((para) => {
        if (prefersReducedMotion()) {
          gsap.set(para, { opacity: 1 })
          return
        }
        const { targets, revert } = splitText(para, 'lines')
        gsap.set(targets, { yPercent: 110 })
        const tween = gsap.to(targets, {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: para, start: 'top 88%' },
        })
        cleanups.push(() => {
          tween.kill()
          revert()
        })
      })

      return () => cleanups.forEach((fn) => fn())
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <span
        ref={wordmarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 text-center text-[22vw] font-bold leading-none tracking-tighter text-primary/[0.03]"
      >
        FLUXOR
      </span>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel>{aboutSection.label}</SectionLabel>
        <AnimatedHeading
          as="h2"
          className="mt-4 max-w-4xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
        >
          {aboutSection.headline}
        </AnimatedHeading>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(220px,280px)_1fr] lg:items-start">
          <Reveal className="mx-auto w-full max-w-[280px] lg:mx-0">
            <img
              src={aboutMedia.portrait}
              alt={aboutMedia.portraitAlt}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover object-top"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {aboutSection.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                data-about-para
                className="text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <StatsBar />

        <Reveal className="mt-12">
          <Button variant="secondary" href={aboutSection.cta.href}>
            {aboutSection.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
