import SectionLabel from './SectionLabel'
import AnimatedHeading from './AnimatedHeading'
import Reveal from './Reveal'

// Shared hero band for the inner pages — keeps headings/spacing consistent.
export default function PageHero({ label, title, subtext, children }) {
  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-20 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[440px] w-[440px] rounded-full bg-accent/10 blur-[150px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel>{label}</SectionLabel>
        <AnimatedHeading
          as="h1"
          splitBy="chars"
          className="mt-4 max-w-4xl text-4xl font-medium tracking-tight text-primary md:text-6xl"
        >
          {title}
        </AnimatedHeading>
        {subtext && (
          <Reveal className="mt-6 max-w-2xl">
            <p className="text-lg text-secondary">{subtext}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
