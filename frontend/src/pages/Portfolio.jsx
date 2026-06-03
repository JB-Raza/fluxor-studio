import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'

export default function Portfolio() {
  usePageMeta(pageMeta.portfolio)

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 pt-24">
      <p className="text-secondary">Portfolio page — coming in a later phase.</p>
    </main>
  )
}
