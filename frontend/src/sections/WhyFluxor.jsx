import { useRef } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import { gsap, useGSAP } from '../lib/gsap'
import { ease, prefersReducedMotion } from '../lib/motion'
import { differentiators, whyFluxorSection } from '../data/differentiators'
import DifferentiatorCard from './DifferentiatorCard'

export default function WhyFluxor() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || prefersReducedMotion()) return undefined

      const cards = gsap.utils.toArray(section.querySelectorAll('[data-diff-card]'))
      const numerals = gsap.utils.toArray(section.querySelectorAll('[data-diff-numeral]'))
      const cleanups = []

      cards.forEach((card, index) => {
        const fromY = index % 2 === 0 ? -55 : 55
        const tween = gsap.fromTo(
          card,
          { opacity: 0, rotateY: fromY, transformPerspective: 1000 },
          {
            opacity: 1,
            rotateY: 0,
            duration: 0.9,
            ease: ease.out,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
        cleanups.push(() => tween.kill())
      })

      numerals.forEach((num) => {
        const p = gsap.fromTo(
          num,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: num.closest('[data-diff-card]'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
        cleanups.push(() => p.kill())
      })

      return () => cleanups.forEach((fn) => fn())
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="why"
      ref={sectionRef}
      className="scroll-mt-24 border-y border-border bg-surface/50 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel>{whyFluxorSection.label}</SectionLabel>
        <AnimatedHeading
          as="h2"
          className="mt-4 max-w-4xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
        >
          {whyFluxorSection.headline}
        </AnimatedHeading>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <DifferentiatorCard
              key={item.number}
              number={item.number}
              title={item.title}
              body={item.body}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
