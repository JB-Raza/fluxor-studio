export default function ProcessStep({ step, title, body }) {
  return (
    <article data-process-step className="relative flex gap-6 md:gap-8">
      <div className="flex flex-col items-center">
        <span
          data-step-dot
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-secondary transition-colors"
        >
          {step}
        </span>
      </div>
      <div className="pb-12 md:pb-16">
        <h3 data-step-title className="text-xl font-medium text-secondary transition-colors md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-secondary leading-relaxed">{body}</p>
      </div>
    </article>
  )
}
