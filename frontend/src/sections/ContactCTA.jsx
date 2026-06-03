import { useRef, useCallback } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Reveal from '../components/ui/Reveal'
import { gsap, useGSAP } from '../lib/gsap'
import { ease, prefersReducedMotion, scrollTriggerConfig } from '../lib/motion'
import { contactSection } from '../data/contact'
import ContactForm from './ContactForm'

export default function ContactCTA() {
  const sectionRef = useRef(null)

  const onFieldFocus = useCallback((event) => {
    const section = sectionRef.current
    const target = event.target
    if (!section || !target?.getBoundingClientRect) return

    const sectionRect = section.getBoundingClientRect()
    const fieldRect = target.getBoundingClientRect()
    const x =
      ((fieldRect.left + fieldRect.width / 2 - sectionRect.left) / sectionRect.width) *
      100
    const y =
      ((fieldRect.top + fieldRect.height / 2 - sectionRect.top) / sectionRect.height) *
      100

    section.style.setProperty('--focus-x', `${x}%`)
    section.style.setProperty('--focus-y', `${y}%`)
    section.style.setProperty('--focus-opacity', '1')
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const fields = gsap.utils.toArray(section.querySelectorAll('[data-contact-field]'))
      if (!section) return undefined

      if (prefersReducedMotion()) {
        gsap.set(fields, { opacity: 1, y: 0 })
        return undefined
      }

      gsap.set(fields, { opacity: 0, y: 28 })

      const tween = gsap.to(fields, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: ease.out,
        scrollTrigger: {
          trigger: section.querySelector('[data-contact-form]'),
          ...scrollTriggerConfig({ start: 'top 82%' }),
        },
      })

      return () => tween.kill()
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
      style={{
        '--focus-x': '72%',
        '--focus-y': '48%',
        '--focus-opacity': '0.55',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--focus-opacity)',
          background:
            'radial-gradient(ellipse 55% 45% at var(--focus-x) var(--focus-y), rgba(124, 92, 252, 0.16), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionLabel>{contactSection.label}</SectionLabel>
            <AnimatedHeading
              as="h2"
              splitBy="chars"
              className="mt-4 text-3xl font-medium tracking-tight text-primary md:text-5xl"
            >
              {contactSection.headline}
            </AnimatedHeading>
            <Reveal className="mt-6">
              <p className="text-lg text-secondary">{contactSection.subtext}</p>
            </Reveal>
            <Reveal className="mt-8">
              <a
                href={contactSection.alternateCta.href}
                className="text-sm text-accent transition-colors hover:text-accent-hover"
              >
                Prefer a call? {contactSection.alternateCta.label} →
              </a>
            </Reveal>
          </div>

          <div data-contact-form>
            <ContactForm onFieldFocus={onFieldFocus} />
          </div>
        </div>
      </div>
    </section>
  )
}
