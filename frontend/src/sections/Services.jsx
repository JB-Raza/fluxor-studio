import { useRef, useState } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Reveal from '../components/ui/Reveal'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { services, servicesSection } from '../data/services'
import ServiceCard from './ServiceCard'

function num(i) {
  return String(i + 1).padStart(2, '0')
}

export default function Services() {
  const pinRef = useRef(null)
  const rowsRef = useRef(null)
  const numeralRef = useRef(null)
  const glowRef = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const pin = pinRef.current
      const rows = rowsRef.current
      if (!pin || !rows) return undefined

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion()) return undefined

        const items = gsap.utils.toArray(rows.querySelectorAll('[data-service-row]'))
        let current = -1

        const setActiveIndex = (idx) => {
          if (idx === current) return
          current = idx
          setActive(idx)

          items.forEach((item, i) => {
            const on = i === idx
            gsap.to(item, {
              opacity: on ? 1 : 0.3,
              scale: on ? 1 : 0.96,
              x: on ? 0 : -8,
              duration: 0.5,
              ease: 'power3.out',
            })
            const line = item.querySelector('[data-service-line]')
            if (line) gsap.to(line, { scaleX: on ? 1 : 0, duration: 0.5, ease: 'power3.out' })
          })

          // Giant numeral crossfade + subtle background hue drift.
          gsap.fromTo(
            numeralRef.current,
            { opacity: 0, yPercent: 12 },
            { opacity: 0.07, yPercent: 0, duration: 0.5, ease: 'power3.out' },
          )
          gsap.to(glowRef.current, {
            filter: `hue-rotate(${idx * 28}deg)`,
            duration: 0.8,
            ease: 'power2.out',
          })
        }

        const st = gsap.to(
          {},
          {
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${items.length * window.innerHeight * 0.7}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  items.length - 1,
                  Math.floor(self.progress * items.length),
                )
                setActiveIndex(idx)
              },
            },
          },
        )

        setActiveIndex(0)

        return () => st.kill()
      })

      return () => mm.revert()
    },
    { scope: pinRef },
  )

  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-border bg-surface/50"
    >
      <div className="px-6 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{servicesSection.label}</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-4xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
          >
            {servicesSection.headline}
          </AnimatedHeading>
          <Reveal className="mt-6 max-w-2xl">
            <p className="text-lg text-secondary">{servicesSection.subtext}</p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: pinned scrub list */}
      <div ref={pinRef} className="relative mt-16 hidden overflow-hidden lg:block">
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-12 items-center gap-8 px-6 py-5 md:py-10">
          {/* Left: glow + content circle (same dimensions) */}
          <div className="col-span-5 flex justify-center">
            <div className="relative aspect-square h-[min(52vmin,560px)] w-[min(52vmin,560px)] max-w-full">
              <div
                ref={glowRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-accent/10 blur-[120px]"
              />
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-full border border-border/40 bg-surface/30 px-6 text-center backdrop-blur-sm">
                <span
                  ref={numeralRef}
                  aria-hidden="true"
                  className="text-[clamp(3rem,12vmin,6rem)] font-semibold leading-none text-primary"
                  style={{ opacity: 0.12 }}
                >
                  {num(active)}
                </span>
                <div className="flex max-w-[72%] flex-col items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {services[active].title}
                  </p>
                  <h3 className="text-balance text-base font-medium leading-snug text-primary xl:text-lg">
                    {services[active].headline}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Scrubbed list */}
          <div ref={rowsRef} className="col-span-7 space-y-5">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                data-service-row
                className="scroll-mt-24 border-l-2 border-border pl-5"
              >
                <div className="flex items-baseline gap-3.5">
                  <span className="text-xs font-medium text-accent">{num(index)}</span>
                  <h4 className="text-lg font-medium text-primary md:text-xl">
                    {service.headline}
                  </h4>
                </div>
                <div
                  data-service-line
                  className="mt-2.5 h-px w-full origin-left bg-accent"
                  style={{ transform: 'scaleX(0)' }}
                />
                <p className="mt-2.5 max-w-xl text-sm text-secondary leading-relaxed">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion: alternating slide-in grid */}
      <div className="px-6 py-16 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              x={index % 2 === 0 ? -40 : 40}
              y={24}
              delay={index * 0.04}
              className="h-full"
            >
              <div className="h-full scroll-mt-24">
                <ServiceCard
                  title={service.title}
                  headline={service.headline}
                  body={service.body}
                  index={index}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
