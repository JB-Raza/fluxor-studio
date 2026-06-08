import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'
import { services, servicesSection } from '../data/services'
import PageHero from '../components/ui/PageHero'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

const GRADIENTS = [
  'from-violet-900/50 to-background',
  'from-indigo-900/50 to-background',
  'from-purple-900/50 to-background',
  'from-blue-900/50 to-background',
  'from-fuchsia-900/50 to-background',
  'from-cyan-900/40 to-background',
]

function num(i) {
  return String(i + 1).padStart(2, '0')
}

export default function Services() {
  usePageMeta(pageMeta.services)
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return undefined
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <main>
      <PageHero
        label="Services"
        title={servicesSection.headline}
        subtext={servicesSection.subtext}
      />

      <section className="px-6 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col">
          {services.map((service, index) => {
            const reversed = index % 2 === 1
            return (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-28 border-t border-border py-16 md:py-24"
              >
                <div
                  className={[
                    'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
                    reversed ? 'lg:[&>*:first-child]:order-last' : '',
                  ].join(' ')}
                >
                  <Reveal x={reversed ? 40 : -40} y={24}>
                    <div>
                      <span className="text-sm font-medium text-accent">{num(index)}</span>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                        {service.title}
                      </p>
                      <h2 className="mt-4 text-2xl font-medium tracking-tight text-primary md:text-4xl">
                        {service.headline}
                      </h2>
                      <p className="mt-5 max-w-xl leading-relaxed text-secondary">
                        {service.body}
                      </p>
                      <div className="mt-8">
                        <Button variant="secondary" href="/contact">
                          Start a {service.title} Project
                        </Button>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal x={reversed ? -40 : 40} y={24}>
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
                    >
                      <span className="absolute bottom-4 right-6 text-[7rem] font-light leading-none text-primary/10">
                        {num(index)}
                      </span>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CTABand
        title="Not Sure Which Service You Need?"
        subtext="Tell us the goal — we'll map the right mix of CGI, VFX, and 3D to get you there."
      />
    </main>
  )
}
