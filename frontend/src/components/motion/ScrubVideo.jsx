import { useRef } from 'react'
import { ScrollTrigger, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'

// A <video> whose currentTime is driven by scroll (Apple-style render reveal).
// Falls back to a gradient placeholder when no src is provided yet.
export default function ScrubVideo({
  src,
  poster,
  className = '',
  placeholder = 'from-violet-900/40 to-background',
  aspect = '16/9',
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const video = ref.current
      if (!video || !src || prefersReducedMotion()) return undefined

      let trigger
      const setup = () => {
        const dur = video.duration
        if (!dur) return
        trigger = ScrollTrigger.create({
          trigger: video,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            video.currentTime = dur * self.progress
          },
        })
      }

      if (video.readyState >= 1) setup()
      else video.addEventListener('loadedmetadata', setup, { once: true })

      return () => {
        trigger?.kill()
        video.removeEventListener('loadedmetadata', setup)
      }
    },
    { scope: ref, dependencies: [src] },
  )

  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br ${placeholder} ${className}`}
        style={{ aspectRatio: aspect }}
        aria-hidden="true"
      />
    )
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ aspectRatio: aspect }}
    />
  )
}
