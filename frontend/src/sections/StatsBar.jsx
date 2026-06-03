import { useCountUp } from '../hooks/useCountUp'
import { stats } from '../data/stats'

const R = 26
const C = 2 * Math.PI * R

function StatItem({ value, suffix, label }) {
  const { ref, display, progress } = useCountUp(value, { suffix })

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
      <div className="flex items-center gap-4">
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r={R} fill="none" stroke="var(--color-border)" strokeWidth="3" />
          <circle
            cx="32"
            cy="32"
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
          />
        </svg>
        <p className="text-4xl font-medium tabular-nums text-primary md:text-5xl">
          {display}
        </p>
      </div>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  )
}

export default function StatsBar() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-16 md:grid-cols-4">
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  )
}
