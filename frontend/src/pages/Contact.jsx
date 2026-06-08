import { useCallback, useRef } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'
import { contactSection } from '../data/contact'
import { footerContent } from '../data/footer'
import { processSteps } from '../data/process'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../sections/ContactForm'

const EMAIL = 'hello@fluxor.studio'

export default function Contact() {
  usePageMeta(pageMeta.contact)
  const formWrapRef = useRef(null)

  const onFieldFocus = useCallback((event) => {
    const wrap = formWrapRef.current
    const target = event.target
    if (!wrap || !target?.getBoundingClientRect) return

    const wrapRect = wrap.getBoundingClientRect()
    const fieldRect = target.getBoundingClientRect()
    const x = ((fieldRect.left + fieldRect.width / 2 - wrapRect.left) / wrapRect.width) * 100
    const y = ((fieldRect.top + fieldRect.height / 2 - wrapRect.top) / wrapRect.height) * 100

    wrap.style.setProperty('--focus-x', `${x}%`)
    wrap.style.setProperty('--focus-y', `${y}%`)
    wrap.style.setProperty('--focus-opacity', '1')
  }, [])

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        label={contactSection.label}
        title={contactSection.headline}
        subtext={contactSection.subtext}
      />

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-16">
          {/* Info sidebar */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <SectionLabel>Reach Us</SectionLabel>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-4 block text-2xl font-medium text-primary transition-colors hover:text-accent md:text-3xl"
              >
                {EMAIL}
              </a>
              <p className="mt-3 text-secondary">
                We reply to every serious brief within one business day.
              </p>
            </Reveal>

            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                Follow
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {footerContent.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary transition-colors hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                What Happens Next
              </p>
              <ol className="mt-4 space-y-4">
                {processSteps.slice(0, 3).map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="text-sm font-medium text-accent">{step.step}</span>
                    <span className="text-sm leading-relaxed text-secondary">
                      <span className="text-primary">{step.title}.</span> {step.body}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Form */}
          <div
            ref={formWrapRef}
            className="relative rounded-3xl border border-border bg-surface/40 p-6 md:p-10"
            style={{
              '--focus-x': '50%',
              '--focus-y': '30%',
              '--focus-opacity': '0.4',
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500"
              style={{
                opacity: 'var(--focus-opacity)',
                background:
                  'radial-gradient(ellipse 60% 50% at var(--focus-x) var(--focus-y), rgba(124, 92, 252, 0.18), transparent 70%)',
              }}
            />
            <div className="relative">
              <ContactForm onFieldFocus={onFieldFocus} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
