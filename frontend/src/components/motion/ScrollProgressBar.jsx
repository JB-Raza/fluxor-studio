import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-accent will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
