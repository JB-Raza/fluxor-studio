import { useEffect, useRef } from 'react'
import { refreshScrollTriggers } from '../../lib/scrollTriggers'

// Single swap-point between placeholder gradients and real assets.
export default function Media({
  type = 'image',
  src,
  poster,
  alt = '',
  aspect,
  placeholder = 'from-violet-900/40 to-background',
  className = '',
  objectFit = 'cover',
  onLoaded,
}) {
  const notified = useRef(false)

  const handleLoaded = () => {
    if (notified.current) return
    notified.current = true
    refreshScrollTriggers()
    onLoaded?.()
  }

  useEffect(() => {
    notified.current = false
  }, [src])

  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br ${placeholder} ${className}`}
        style={aspect ? { aspectRatio: aspect } : undefined}
        aria-hidden="true"
      />
    )
  }

  const fitClass =
    objectFit === 'cover'
      ? 'object-cover'
      : objectFit === 'contain'
        ? 'object-contain'
        : ''

  if (type === 'video') {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleLoaded}
        className={[fitClass, 'h-full w-full', className].filter(Boolean).join(' ')}
        style={aspect ? { aspectRatio: aspect } : undefined}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={handleLoaded}
      className={[fitClass, 'h-full w-full', className].filter(Boolean).join(' ')}
      style={aspect ? { aspectRatio: aspect } : undefined}
    />
  )
}
