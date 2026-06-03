// Single swap-point between placeholder gradients (now) and real assets (later).
export default function Media({
  type = 'image',
  src,
  poster,
  alt = '',
  aspect = '4/3',
  placeholder = 'from-violet-900/40 to-background',
  className = '',
}) {
  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br ${placeholder} ${className}`}
        style={{ aspectRatio: aspect }}
        aria-hidden="true"
      />
    )
  }

  if (type === 'video') {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className={className}
        style={{ aspectRatio: aspect }}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={{ aspectRatio: aspect }}
    />
  )
}
