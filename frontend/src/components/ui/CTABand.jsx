import AnimatedHeading from './AnimatedHeading'
import Button from './Button'
import Reveal from './Reveal'

// Reusable closing call-to-action band for the inner pages.
export default function CTABand({
  title = "Let's Make Something Impossible to Ignore.",
  subtext,
  cta = { label: "Let's Create", href: '/contact' },
}) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface/50 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <AnimatedHeading
          as="h2"
          className="text-3xl font-medium tracking-tight text-primary md:text-5xl"
        >
          {title}
        </AnimatedHeading>
        {subtext && (
          <Reveal className="mx-auto mt-6 max-w-xl">
            <p className="text-lg text-secondary">{subtext}</p>
          </Reveal>
        )}
        <Reveal className="mt-10 flex justify-center">
          <Button variant="primary" href={cta.href}>
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
