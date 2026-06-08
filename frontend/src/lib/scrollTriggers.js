import { ScrollTrigger } from './gsap'

let refreshTimer

export function refreshScrollTriggers(immediate = false) {
  if (immediate) {
    clearTimeout(refreshTimer)
    ScrollTrigger.refresh()
    return
  }

  clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(() => {
    ScrollTrigger.refresh()
  }, 150)
}
