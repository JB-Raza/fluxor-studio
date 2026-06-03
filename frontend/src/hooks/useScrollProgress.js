import { useEffect, useState } from 'react'
import { subscribeScrollProgress } from '../lib/scroll'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => subscribeScrollProgress(setProgress), [])

  return progress
}
