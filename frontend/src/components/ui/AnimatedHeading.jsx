import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { ease, prefersReducedMotion, scrollTriggerConfig } from '../../lib/motion'

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export default function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className = '',
  splitBy = 'words',
  trigger = true,
}) {
  const ref = useRef(null)
  const Component = headingTags.includes(Tag) ? Tag : 'h2'

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return undefined

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 })
        return undefined
      }

      // Always create word wrappers so lines break between whole words,
      // even when animating individual characters.
      const types = splitBy === 'chars' ? 'words, chars' : splitBy
      const split = new SplitType(el, { types })
      const targets =
        splitBy === 'chars' ? split.chars : split.words ?? split.lines

      gsap.set(targets, { opacity: 0, y: 24 })

      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: ease.out,
        scrollTrigger: trigger
          ? {
              trigger: el,
              ...scrollTriggerConfig({ start: 'top 85%' }),
            }
          : undefined,
      })

      return () => {
        tween.kill()
        split.revert()
      }
    },
    { scope: ref, dependencies: [children, splitBy, trigger] },
  )

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
