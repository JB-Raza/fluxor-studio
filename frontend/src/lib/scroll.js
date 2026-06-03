// Shared scroll state (updated by Lenis or native scroll in SmoothScrollProvider).
let velocity = 0
let progress = 0
const progressListeners = new Set()

export function setScrollVelocity(value) {
  velocity = value
}

export function getScrollVelocity() {
  return velocity
}

export function computeScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
}

export function setScrollProgress(value) {
  progress = value
  progressListeners.forEach((listener) => listener(value))
}

export function getScrollProgress() {
  return progress
}

export function subscribeScrollProgress(listener) {
  progressListeners.add(listener)
  listener(progress)
  return () => progressListeners.delete(listener)
}
