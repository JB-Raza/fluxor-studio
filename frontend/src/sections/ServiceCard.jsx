export default function ServiceCard({ title, headline, body, index }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/40">
      <span className="text-sm font-medium text-accent">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="mt-2 text-xs font-medium uppercase tracking-widest text-secondary">
        {title}
      </p>
      <h3 className="mt-4 text-xl font-medium text-primary md:text-2xl">
        {headline}
      </h3>
      <p className="mt-4 text-secondary leading-relaxed">{body}</p>
    </article>
  )
}
