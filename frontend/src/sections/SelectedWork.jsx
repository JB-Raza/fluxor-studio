import { useRef } from 'react'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { selectedWorkSection, workItems } from '../data/work'
import WorkCard from './WorkCard'

export default function SelectedWork() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      const pin = pinRef.current
      const track = trackRef.current
      if (!pin || !track) return undefined

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion()) return undefined

        const getDistance = () => track.scrollWidth - window.innerWidth + 96

        // Vertical scroll drives the horizontal track translation.
        const horizontal = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        const cards = track.querySelectorAll('[data-work-card]')
        const cleanups = []

        cards.forEach((card) => {
          const media = card.querySelector('[data-work-media]')

          // In-frame media parallax (footage drifts opposite the scroll).
          if (media) {
            const p = gsap.fromTo(
              media,
              { xPercent: -10 },
              {
                xPercent: 10,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              },
            )
            cleanups.push(() => p.kill())
          }

          // Clip-path reveal as each card enters the viewport.
          const reveal = gsap.fromTo(
            card,
            { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0.4 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: 'left 92%',
                end: 'left 55%',
                scrub: true,
              },
            },
          )
          cleanups.push(() => reveal.kill())
        })

        return () => {
          horizontal.kill()
          cleanups.forEach((fn) => fn())
        }
      })

      return () => mm.revert()
    },
    { scope: pinRef },
  )

  return (
    <section id="work" className="scroll-mt-24">
      <div className="px-6 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{selectedWorkSection.label}</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
          >
            {selectedWorkSection.headline}
          </AnimatedHeading>
          <Reveal className="mt-6 max-w-2xl">
            <p className="text-lg text-secondary">{selectedWorkSection.subtext}</p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: pinned horizontal gallery */}
      <div
        ref={pinRef}
        className="mt-16 hidden items-center overflow-hidden lg:flex lg:h-screen"
      >
        <div ref={trackRef} className="flex gap-8 px-[8vw] will-change-transform">
          {workItems.map((item, index) => (
            <WorkCard
              key={item.id}
              title={item.title}
              tags={item.tags}
              placeholder={item.placeholder}
              video={item.video}
              poster={item.poster}
              index={index}
              horizontal
            />
          ))}
        </div>
      </div>

      {/* Mobile / reduced-motion: responsive grid */}
      <div className="px-6 pb-8 lg:hidden">
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2">
          {workItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} className="h-full">
              <WorkCard
                title={item.title}
                tags={item.tags}
                placeholder={item.placeholder}
                video={item.video}
                poster={item.poster}
                index={index}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Button variant="secondary" href={selectedWorkSection.cta.href}>
              {selectedWorkSection.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
