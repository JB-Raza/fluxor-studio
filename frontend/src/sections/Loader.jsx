import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

const STORAGE_KEY = 'fluxor-loader-seen'
const WORDMARK = 'FLUXOR'

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(STORAGE_KEY))
  const [percent, setPercent] = useState(0)
  const overlayRef = useRef(null)
  const counterRef = useRef(null)
  const wordmarkRef = useRef(null)

  const finish = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
    onComplete?.()
    ScrollTrigger.refresh()
  }

  useGSAP(
    () => {
      if (!visible) return undefined

      const reduced = prefersReducedMotion()
      const counter = { val: 0 }
      const letters = wordmarkRef.current?.querySelectorAll('span')

      if (reduced) {
        setPercent(100)
        finish()
        return undefined
      }

      gsap.set(letters, { yPercent: 120, opacity: 0 })

      const tl = gsap.timeline({ onComplete: finish })

      tl.to(counter, {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => setPercent(Math.round(counter.val)),
      })
        // counter slides out, FLUXOR assembles
        .to(counterRef.current, { yPercent: -120, opacity: 0, duration: 0.5, ease: 'power3.in' })
        .to(
          letters,
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
          '-=0.1',
        )
        .to(letters, { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.in' }, '+=0.35')
        // curtain wipes up to reveal the hero
        .to(
          overlayRef.current,
          { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
          '-=0.2',
        )

      return () => tl.kill()
    },
    { dependencies: [visible] },
  )

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      aria-live="polite"
      aria-busy="true"
    >
      <p
        ref={counterRef}
        className="text-6xl font-light tabular-nums text-primary md:text-8xl"
      >
        {percent}
        <span className="text-accent">%</span>
      </p>

      <div
        ref={wordmarkRef}
        aria-hidden="true"
        className="absolute flex overflow-hidden text-5xl font-semibold tracking-[0.3em] text-primary md:text-7xl"
      >
        {WORDMARK.split('').map((char, index) => (
          <span key={`${char}-${index}`} className="inline-block">
            {char}
          </span>
        ))}
      </div>

      <p className="absolute bottom-10 text-sm uppercase tracking-[0.3em] text-secondary">
        Loading the impossible
      </p>
    </div>
  )
}
