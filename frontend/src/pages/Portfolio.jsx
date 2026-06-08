import { useMemo, useRef, useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'
import { workItems } from '../data/work'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import PageHero from '../components/ui/PageHero'
import CTABand from '../components/ui/CTABand'
import WorkCard from '../sections/WorkCard'

const FILTERS = ['All', 'CGI', 'VFX', '3D', 'Motion', 'Product']

function matchesFilter(item, filter) {
  if (filter === 'All') return true
  return item.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
}

export default function Portfolio() {
  usePageMeta(pageMeta.portfolio)

  const [active, setActive] = useState('All')
  const gridRef = useRef(null)

  const filtered = useMemo(
    () => workItems.filter((item) => matchesFilter(item, active)),
    [active],
  )

  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid || prefersReducedMotion()) return undefined

      const cards = grid.querySelectorAll('[data-portfolio-card]')
      const tween = gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
      )

      return () => tween.kill()
    },
    { scope: gridRef, dependencies: [active] },
  )

  return (
    <main>
      <PageHero
        label="Work"
        title="Work That Refuses to Blend In."
        subtext={pageMeta.portfolio.description}
      />

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => {
              const on = active === filter
              return (
                <button
                  key={filter}
                  type="button"
                  data-cursor="expand"
                  onClick={() => setActive(filter)}
                  className={[
                    'rounded-full border px-5 py-2 text-sm font-medium transition-colors',
                    on
                      ? 'border-accent bg-accent text-background'
                      : 'border-border text-secondary hover:border-accent/50 hover:text-primary',
                  ].join(' ')}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          <div
            ref={gridRef}
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            {filtered.map((item, index) => (
              <div key={item.id} data-portfolio-card className="h-full">
                <WorkCard
                  title={item.title}
                  tags={item.tags}
                  placeholder={item.placeholder}
                  video={item.video}
                  poster={item.poster}
                  index={index}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-secondary">
              No projects in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <CTABand
        title="Got a Project That Deserves the Same?"
        subtext="Tell us what you're building. We'll show you how to make it impossible to ignore."
      />
    </main>
  )
}
