export default function Marquee({ items, className = '', speed = 40 }) {
  const track = [...items, ...items]

  return (
    <div className={['overflow-hidden', className].filter(Boolean).join(' ')}>
      <div
        className="flex w-max animate-marquee gap-12"
        style={{ '--marquee-duration': `${speed}s` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shrink-0 text-sm font-medium uppercase tracking-widest text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
