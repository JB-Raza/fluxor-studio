// Shared motion vocabulary so every section feels cohesive.
export const ease = {
  out: 'power3.out',
  inOut: 'power4.inOut',
  expo: 'expo.out',
  soft: 'power2.out',
  none: 'none',
}

export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
}

export const stagger = {
  tight: 0.03,
  base: 0.08,
  loose: 0.14,
}

export const scrollReveal = {
  start: 'top 88%',
  toggleActions: 'play none none none',
}

export function scrollTriggerConfig(overrides = {}) {
  return { ...scrollReveal, ...overrides }
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
