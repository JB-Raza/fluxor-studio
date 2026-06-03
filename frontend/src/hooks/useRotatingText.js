import { useEffect, useState } from 'react'

export function useRotatingText(items, interval = 2800, enabled = true) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled || items.length <= 1) return undefined

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, interval)

    return () => window.clearInterval(id)
  }, [items.length, interval, enabled])

  return { current: items[index], index }
}
