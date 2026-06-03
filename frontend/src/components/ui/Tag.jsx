export default function Tag({ children, className = '' }) {
  return (
    <span
      className={[
        'inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs text-secondary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
