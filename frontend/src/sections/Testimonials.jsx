import { useRef, useState } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Reveal from '../components/ui/Reveal'
import VelocityMarquee from '../components/motion/VelocityMarquee'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { testimonials, testimonialsSection } from '../data/testimonials'
import TestimonialCard from './TestimonialCard'

const authorMarquee = testimonials.map((t) => t.author)

export default function Testimonials() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const quoteRef = useRef(null)
  const slidesRef = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const pin = pinRef.current
      const slides = slidesRef.current
      const quote = quoteRef.current
      if (!pin || !slides) return undefined

      const mm = gsap.matchMedia()
      const cleanups = []

      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion()) return undefined

        const items = gsap.utils.toArray(slides.querySelectorAll('[data-testimonial-slide]'))

        if (quote) {
          const qp = gsap.fromTo(
            quote,
            { yPercent: -15, opacity: 0.04 },
            {
              yPercent: 15,
              opacity: 0.07,
              ease: 'none',
              scrollTrigger: {
                trigger: pin,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
          cleanups.push(() => qp.kill())
        }

        gsap.set(items, { opacity: 0, pointerEvents: 'none' })
        gsap.set(items[0], { opacity: 1, pointerEvents: 'auto' })

        const st = gsap.to(
          {},
          {
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${items.length * window.innerHeight * 0.55}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  items.length - 1,
                  Math.floor(self.progress * items.length),
                )
                setActive(idx)
                items.forEach((item, i) => {
                  gsap.to(item, {
                    opacity: i === idx ? 1 : 0,
                    duration: 0.35,
                    overwrite: true,
                  })
                  item.style.pointerEvents = i === idx ? 'auto' : 'none'
                })
              },
            },
          },
        )
        cleanups.push(() => st.kill())

        return undefined
      })

      return () => {
        mm.revert()
        cleanups.forEach((fn) => fn())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="scroll-mt-24 border-y border-border bg-surface/50"
    >
      <div className="px-6 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{testimonialsSection.label}</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
          >
            {testimonialsSection.headline}
          </AnimatedHeading>
        </div>
      </div>

      {/* Desktop: scroll cross-fade carousel */}
      {!reducedMotion && (
      <div ref={pinRef} className="relative mt-16 hidden overflow-hidden lg:block">
        <span
          ref={quoteRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-8 select-none font-serif text-[18rem] leading-none text-primary"
          style={{ opacity: 0.05 }}
        >
          &ldquo;
        </span>

        <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-20">
          <div ref={slidesRef} className="relative min-h-[320px]">
            {testimonials.map((item, index) => (
              <div
                key={item.author}
                data-testimonial-slide
                className="absolute inset-0"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <TestimonialCard
                  quote={item.quote}
                  author={item.author}
                  avatar={item.avatar}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  index === active ? 'w-8 bg-accent' : 'w-1.5 bg-border',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

        <VelocityMarquee
          items={authorMarquee}
          className="border-t border-border py-6"
        />
      </div>
      )}

      {/* Grid — mobile, or all breakpoints when reduced motion */}
      <div className={`px-6 py-16 ${reducedMotion ? '' : 'lg:hidden'}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.08} className="h-full">
              <TestimonialCard
                quote={item.quote}
                author={item.author}
                avatar={item.avatar}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
