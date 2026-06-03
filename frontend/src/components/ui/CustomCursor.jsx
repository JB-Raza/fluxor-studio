import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'

// Context-aware cursor. Elements opt into states via data-cursor:
//   data-cursor="expand"  → ring grows (buttons / links)
//   data-cursor="view"    → filled "View" label (work cards)
//   data-cursor="hide"    → cursor hidden, native cursor restored (inputs)
// Default is a small color-burn dot in the accent color.
const RADIUS = 8

export default function CustomCursor({ color = '#7c5cfc' }) {
  const dotRef = useRef(null)
  const [mode, setMode] = useState('default')

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || prefersReducedMotion()) return undefined

    const dot = dotRef.current
    if (!dot) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 })

    const moveX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' })
    const moveY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' })

    let visible = false
    const onMove = (event) => {
      if (!visible) {
        visible = true
        gsap.to(dot, { opacity: 1, duration: 0.2 })
      }
      moveX(event.clientX)
      moveY(event.clientY)
    }

    const onLeave = () => {
      visible = false
      gsap.to(dot, { opacity: 0, duration: 0.2 })
    }

    const onOver = (event) => {
      const target = event.target.closest?.('[data-cursor]')
      setMode(target ? target.dataset.cursor : 'default')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  const isExpand = mode === 'expand'
  const isView = mode === 'view'
  const isHide = mode === 'hide'

  const size = isView ? 72 : isExpand ? 44 : RADIUS * 2

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full font-medium uppercase tracking-wider"
      style={{
        width: size,
        height: size,
        fontSize: 11,
        color: isView ? '#0b0b0f' : 'transparent',
        backgroundColor: isView ? color : isExpand ? `${color}1f` : color,
        border: isExpand ? `1.5px solid ${color}` : '0px solid transparent',
        backdropFilter: isExpand ? 'blur(2px)' : 'none',
        WebkitBackdropFilter: isExpand ? 'blur(2px)' : 'none',
        opacity: isHide ? 0 : undefined,
        mixBlendMode: 'normal',
        transition:
          'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.2s ease',
      }}
    >
      {/* Inner dot — gives the expanded ring a focal point so it never looks empty. */}
      <span
        className="absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: color,
          opacity: isExpand ? 1 : 0,
          transform: isExpand ? 'scale(1)' : 'scale(0.4)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      />
      {isView ? 'View' : ''}
    </div>
  )
}
