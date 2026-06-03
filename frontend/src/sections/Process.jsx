import { useRef } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { processSection, processSteps } from '../data/process'
import ProcessStep from './ProcessStep'

export default function Process() {
  const sectionRef = useRef(null)
  const lineFillRef = useRef(null)
  const timelineRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      const fill = lineFillRef.current
      const wrap = timelineRef.current
      if (!root || !fill || !wrap) return undefined

      const steps = gsap.utils.toArray(wrap.querySelectorAll('[data-process-step]'))

      if (prefersReducedMotion()) {
        gsap.set(fill, { scaleY: 1 })
        steps.forEach((s) => activate(s, true))
        return undefined
      }

      function activate(step, on) {
        const dot = step.querySelector('[data-step-dot]')
        const title = step.querySelector('[data-step-title]')
        gsap.to(dot, {
          borderColor: on ? 'var(--color-accent)' : 'var(--color-border)',
          backgroundColor: on ? 'rgba(124,92,252,0.12)' : 'var(--color-background)',
          color: on ? 'var(--color-accent)' : 'var(--color-secondary)',
          scale: on ? 1.08 : 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(title, {
          color: on ? 'var(--color-primary)' : 'var(--color-secondary)',
          duration: 0.3,
        })
      }

      // The line draws as you scroll through the timeline.
      gsap.set(fill, { scaleY: 0, transformOrigin: 'top' })
      const draw = gsap.to(fill, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: true,
        },
      })

      // Each step activates as the line reaches it.
      const triggers = steps.map((step) =>
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => activate(step, self.isActive),
        }),
      )

      return () => {
        draw.kill()
        triggers.forEach((t) => t.kill())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-24 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel>{processSection.label}</SectionLabel>
        <AnimatedHeading
          as="h2"
          className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
        >
          {processSection.headline}
        </AnimatedHeading>

        <div ref={timelineRef} className="relative mt-16 max-w-3xl">
          {/* Timeline rail (behind the dots, aligned to dot centers) */}
          <div className="pointer-events-none absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-border md:left-6">
            <div
              ref={lineFillRef}
              className="absolute inset-0 origin-top bg-accent"
            />
          </div>

          {processSteps.map((step) => (
            <ProcessStep
              key={step.step}
              step={step.step}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
