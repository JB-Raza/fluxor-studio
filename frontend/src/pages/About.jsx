import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'
import { aboutSection } from '../data/stats'
import { differentiators, whyFluxorSection } from '../data/differentiators'
import { processSection, processSteps } from '../data/process'
import { aboutMedia } from '../data/assets'
import PageHero from '../components/ui/PageHero'
import CTABand from '../components/ui/CTABand'
import SectionLabel from '../components/ui/SectionLabel'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Reveal from '../components/ui/Reveal'
import StatsBar from '../sections/StatsBar'

export default function About() {
  usePageMeta(pageMeta.about)

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        label="About Us"
        title="The Visual Agency Behind the Magic."
        subtext={pageMeta.about.description}
      />

      {/* Origin story */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(260px,360px)_1fr] lg:items-start">
          <Reveal className="mx-auto w-full max-w-[360px] lg:mx-0">
            <img
              src={aboutMedia.portrait}
              alt={aboutMedia.portraitAlt}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover object-top"
            />
          </Reveal>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <AnimatedHeading
              as="h2"
              className="mt-4 max-w-3xl text-2xl font-medium tracking-tight text-primary md:text-4xl"
            >
              {aboutSection.headline}
            </AnimatedHeading>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {aboutSection.body.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={index * 0.05}>
                  <p className="leading-relaxed text-secondary">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <StatsBar />
        </div>
      </section>

      {/* Values / differentiators */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{whyFluxorSection.label}</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
          >
            What We Stand For.
          </AnimatedHeading>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {differentiators.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/40">
                  <span className="text-3xl font-light text-accent">{item.number}</span>
                  <h3 className="mt-4 text-xl font-medium text-primary md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-secondary">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="border-t border-border bg-surface/50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{processSection.label}</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-primary md:text-5xl"
          >
            {processSection.headline}
          </AnimatedHeading>

          <ol className="mt-12 space-y-px">
            {processSteps.map((step) => (
              <Reveal key={step.step} as="li" y={32}>
                <div className="grid gap-4 border-t border-border py-8 md:grid-cols-[120px_1fr] md:gap-10">
                  <span className="text-4xl font-light text-accent md:text-5xl">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-primary md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTABand
        title="Want to Build Something With Us?"
        subtext="We're always up for a brief that scares us a little. Let's talk."
        cta={{ label: 'Start a Project', href: '/contact' }}
      />
    </main>
  )
}
