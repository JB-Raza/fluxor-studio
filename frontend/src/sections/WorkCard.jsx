import Tag from '../components/ui/Tag'
import { useTilt } from '../hooks/useTilt'

export default function WorkCard({ title, tags, placeholder, index, horizontal = false }) {
  const tiltRef = useTilt({ max: 6 })

  return (
    <article
      data-cursor="view"
      data-work-card
      className={[
        'group',
        horizontal ? 'w-[80vw] shrink-0 sm:w-[60vw] lg:w-[42vw]' : 'h-full',
      ].join(' ')}
    >
      <div
        ref={tiltRef}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 group-hover:border-accent/40 [transform-style:preserve-3d]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            data-work-media
            className={`absolute inset-0 scale-125 bg-gradient-to-br ${placeholder}`}
          />
          <div className="absolute inset-0 flex items-end p-6">
            <span className="text-7xl font-light leading-none text-primary/10">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="text-xl font-medium text-primary md:text-2xl">{title}</h3>
          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
