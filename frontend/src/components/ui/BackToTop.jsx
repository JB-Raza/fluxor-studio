import { useEffect, useState } from 'react'
import RadialBackToTop from './RadialBackToTop'

const SHOW_AFTER = 50

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setVisible(scrollTop > SHOW_AFTER)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className={[
        'fixed bottom-6 right-6 z-40 transition-all duration-300',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      ].join(' ')}
    >
      <RadialBackToTop />
    </div>
  )
}
