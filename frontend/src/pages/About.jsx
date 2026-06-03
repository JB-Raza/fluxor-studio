import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'

export default function About() {
  usePageMeta(pageMeta.about)

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 pt-24">
      <p className="text-secondary">About page — coming in a later phase.</p>
    </main>
  )
}
