import { useTilt } from '../hooks/useTilt'

export default function DifferentiatorCard({ number, title, body, index = 0 }) {
  const tiltRef = useTilt({ max: 5 })

  const onMove = (event) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--spot-x', `${x}%`)
    el.style.setProperty('--spot-y', `${y}%`)
  }

  return (
    <article
      data-diff-card
      data-diff-index={index}
      className="group relative h-full [perspective:1000px]"
    >
      <span
        data-diff-numeral
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 text-[7rem] font-bold leading-none text-primary/[0.04] md:text-[9rem]"
      >
        {number}
      </span>

      <div
        ref={tiltRef}
        onMouseMove={onMove}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 group-hover:border-accent/40 [transform-style:preserve-3d]"
        style={{
          backgroundImage:
            'radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,92,252,0.14), transparent 55%)',
        }}
      >
        <span className="text-3xl font-light text-accent">{number}</span>
        <h3 className="mt-4 text-xl font-medium text-primary">{title}</h3>
        <p className="mt-3 text-secondary leading-relaxed">{body}</p>
      </div>
    </article>
  )
}
