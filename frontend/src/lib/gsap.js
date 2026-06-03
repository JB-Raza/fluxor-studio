import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  toggleActions: 'play none none none',
})

export { gsap, ScrollTrigger }
export { useGSAP } from '@gsap/react'
