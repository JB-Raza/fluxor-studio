import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'
import AnimatedHeading from '../components/ui/AnimatedHeading'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

export default function NotFound() {
  usePageMeta(pageMeta.notFound)

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]"
      />
      <div className="relative">
        <p className="text-[clamp(5rem,22vw,12rem)] font-bold leading-none tracking-tighter text-primary/10">
          404
        </p>
        <AnimatedHeading
          as="h1"
          splitBy="chars"
          className="-mt-6 text-3xl font-medium tracking-tight text-primary md:text-5xl"
        >
          This Frame Doesn't Exist.
        </AnimatedHeading>
        <Reveal className="mx-auto mt-6 max-w-md">
          <p className="text-lg text-secondary">
            The page you're looking for got cut in the edit. Let's get you back to
            something worth watching.
          </p>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-4">
          <Button variant="primary" href="/">
            Back to Home
          </Button>
          <Button variant="secondary" href="/portfolio">
            See Our Work
          </Button>
        </Reveal>
      </div>
    </main>
  )
}
