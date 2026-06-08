import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { ease, prefersReducedMotion, stagger } from '../lib/motion'
import { splitText } from '../hooks/useSplitText'
import Button from '../components/ui/Button'
import Magnetic from '../components/motion/Magnetic'
import {
  heroCtas,
  heroHeadlineSuffix,
  heroLabels,
  heroSubhead,
  socialProofLine,
} from '../data/nav'
import { useRotatingText } from '../hooks/useRotatingText'
import { heroMedia } from '../data/assets'

export default function Hero({ started = true }) {
  const { current: rotatingLabel, index } = useRotatingText(heroLabels, 2800, started)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const suffixRef = useRef(null)
  const labelRef = useRef(null)
  const glowARef = useRef(null)
  const glowBRef = useRef(null)
  const prevIndex = useRef(index)

  // Entrance: eyebrow/label/subhead/cta/social stagger + headline char reveal.
  useGSAP(
    () => {
      const blocks = sectionRef.current?.querySelectorAll('[data-hero]')
      const suffix = suffixRef.current
      if (!blocks?.length || !suffix) return undefined

      const { targets: chars, revert } = splitText(suffix, 'words, chars')

      if (prefersReducedMotion()) {
        gsap.set([blocks, chars], { opacity: 1, y: 0 })
        return () => revert()
      }

      gsap.set(blocks, { opacity: 0, y: 32 })
      gsap.set(chars, { opacity: 0, yPercent: 110 })

      if (!started) return () => revert()

      const tl = gsap.timeline()
      tl.to(blocks, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: stagger.base,
        ease: ease.out,
      }).to(
        chars,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.7,
          stagger: stagger.tight,
          ease: ease.out,
        },
        '-=0.7',
      )

      return () => {
        tl.kill()
        revert()
      }
    },
    { scope: sectionRef, dependencies: [started] },
  )

  // Scroll-out: hero content recedes (scale/fade/lift) as you scroll past.
  useGSAP(
    () => {
      const content = contentRef.current
      if (!content || prefersReducedMotion()) return undefined

      const tween = gsap.to(content, {
        opacity: 0,
        scale: 0.92,
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => tween.kill()
    },
    { scope: sectionRef },
  )

  // Glow blobs follow the cursor (eased) for parallax depth.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const a = glowARef.current
    const b = glowBRef.current
    if (!a || !b) return undefined

    const ax = gsap.quickTo(a, 'x', { duration: 1.2, ease: 'power3.out' })
    const ay = gsap.quickTo(a, 'y', { duration: 1.2, ease: 'power3.out' })
    const bx = gsap.quickTo(b, 'x', { duration: 1.6, ease: 'power3.out' })
    const by = gsap.quickTo(b, 'y', { duration: 1.6, ease: 'power3.out' })

    const onMove = (event) => {
      const cx = event.clientX / window.innerWidth - 0.5
      const cy = event.clientY / window.innerHeight - 0.5
      ax(cx * 60)
      ay(cy * 60)
      bx(cx * -90)
      by(cy * -90)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Rotating label swap animation.
  useEffect(() => {
    const el = labelRef.current
    if (!el || prevIndex.current === index) return undefined

    if (prefersReducedMotion()) {
      el.textContent = rotatingLabel
      prevIndex.current = index
      return undefined
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, yPercent: 60, rotateX: -40 },
      { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.55, ease: ease.out },
    )

    prevIndex.current = index
    return () => tween.kill()
  }, [index, rotatingLabel])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!prefersReducedMotion() && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            src={heroMedia.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div
          ref={glowARef}
          className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]"
        />
        <div
          ref={glowBRef}
          className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"
        />
      </div>

      <div ref={contentRef} className="relative mx-auto w-full max-w-7xl">
        <p
          data-hero
          className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent"
        >
          Content Creation Studio
        </p>

        <h1 className="max-w-5xl text-4xl font-medium leading-[1.05] tracking-tight text-primary md:text-6xl lg:text-7xl">
          <span
            data-hero
            ref={labelRef}
            className="block text-accent [transform-style:preserve-3d]"
          >
            {rotatingLabel}
          </span>
          <span ref={suffixRef} className="mt-2 block">
            {heroHeadlineSuffix}
          </span>
        </h1>

        <p
          data-hero
          className="mt-8 max-w-2xl text-lg leading-relaxed text-secondary md:text-xl"
        >
          {heroSubhead}
        </p>

        <div data-hero className="mt-10 flex flex-wrap gap-4">
          <Magnetic strength={0.4}>
            <Button variant="primary" href={heroCtas.primary.href}>
              {heroCtas.primary.label}
            </Button>
          </Magnetic>
          <Magnetic strength={0.4}>
            <Button variant="secondary" href={heroCtas.secondary.href}>
              {heroCtas.secondary.label}
            </Button>
          </Magnetic>
        </div>

        <p data-hero className="mt-16 max-w-xl text-sm text-secondary">
          {socialProofLine}
        </p>
      </div>

      <div
        data-hero
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-secondary"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
