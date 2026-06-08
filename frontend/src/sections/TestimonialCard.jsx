import { useTilt } from '../hooks/useTilt'

export default function TestimonialCard({ quote, author, avatar, className = '' }) {
  const tiltRef = useTilt({ max: 4 })

  return (
    <blockquote
      ref={tiltRef}
      className={[
        'flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8 md:p-10',
        '[transform-style:preserve-3d]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="text-lg leading-relaxed text-primary md:text-xl">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-6 flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full border border-border object-cover object-top"
          />
        )}
        <span className="text-sm text-secondary">— {author}</span>
      </footer>
    </blockquote>
  )
}
