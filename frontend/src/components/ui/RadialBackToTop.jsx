import { useScrollProgress } from '../../hooks/useScrollProgress'

const RADIUS = 46
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function RadialBackToTop({ className = '' }) {
  const progress = useScrollProgress()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={[
        'group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur-md transition-colors hover:border-accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <span className="relative text-lg text-primary transition-transform duration-200 group-hover:-translate-y-0.5">
        ↑
      </span>
    </button>
  )
}
