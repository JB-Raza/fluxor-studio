import { useEffect, useRef, useState } from 'react'
import { refreshScrollTriggers } from '../../lib/scrollTriggers'

const REVEAL_IN_MS = 950
const REVEAL_OUT_MS = 550
const CLOSED = 'circle(0% at 50% 50%)'
const OPEN = 'circle(150% at 50% 50%)'

// Performance-first video with a circular reveal.
// Default: static poster (or gradient). On hover/focus (pointer devices) the
// video lazy-loads, then a circle expands to reveal it playing. On hover-out the
// circle closes back to the poster and the video resets to frame 0. Touch /
// no-hover devices reveal when the clip scrolls into view.
export default function HoverVideo({
  src,
  poster,
  placeholder = 'from-violet-900/40 to-background',
  alt = '',
  className = '',
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const resetTimer = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [active, setActive] = useState(false)
  const [ready, setReady] = useState(false)
  const [canHover, setCanHover] = useState(true)

  const reveal = active && ready

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  // Touch / no-hover devices: activate while in view.
  useEffect(() => {
    if (canHover) return undefined
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true)
        setActive(entry.isIntersecting)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [canHover])

  // Play while active+ready; pause + reset (after the circle closes) otherwise.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return undefined

    if (reveal) {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current)
        resetTimer.current = null
      }
      const p = v.play()
      if (p?.catch) p.catch(() => {})
    } else {
      v.pause()
      resetTimer.current = window.setTimeout(() => {
        if (videoRef.current) videoRef.current.currentTime = 0
      }, REVEAL_OUT_MS)
    }

    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current)
        resetTimer.current = null
      }
    }
  }, [reveal])

  const activate = () => {
    if (!canHover) return
    setShouldLoad(true)
    setActive(true)
  }
  const deactivate = () => {
    if (!canHover) return
    setActive(false)
  }

  return (
    <div
      ref={containerRef}
      className={['relative h-full w-full overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
    >
      {/* Static layer — always present beneath the circular video reveal. */}
      {poster ? (
        <img
          src={poster}
          alt={alt}
          loading="lazy"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full bg-gradient-to-br ${placeholder}`}
        />
      )}

      {shouldLoad && src && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => {
            setReady(true)
            refreshScrollTriggers()
          }}
          className="absolute inset-0 h-full w-full object-cover will-change-[clip-path]"
          style={{
            clipPath: reveal ? OPEN : CLOSED,
            WebkitClipPath: reveal ? OPEN : CLOSED,
            transition: `clip-path ${reveal ? REVEAL_IN_MS : REVEAL_OUT_MS}ms ease, -webkit-clip-path ${reveal ? REVEAL_IN_MS : REVEAL_OUT_MS}ms ease`,
          }}
        />
      )}
    </div>
  )
}
