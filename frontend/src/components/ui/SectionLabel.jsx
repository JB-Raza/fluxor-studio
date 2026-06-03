export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={[
        'text-xs font-medium uppercase tracking-[0.2em] text-accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
