// Pure-CSS rotor / sawblade — a code-built CGI artifact that spins in-plane
// like a wheel (rotateZ). Bold rim, gear teeth, spokes and a hot core for an
// aggressive feel. One GPU-composited spin animation: zero per-frame JS.
const TEETH = Array.from({ length: 18 })
const SPOKES = Array.from({ length: 8 })

export default function RotorArtifact({ size = 360, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={['pointer-events-none select-none', className].filter(Boolean).join(' ')}
    >
      <div
        className="relative animate-spin [animation-duration:15s] [filter:drop-shadow(0_0_22px_rgba(124,92,252,0.45))] motion-reduce:animate-none"
        style={{ width: size, height: size }}
      >
        {/* Outer rim */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/70" />

        {/* Gear teeth around the rim */}
        {TEETH.map((_, i) => (
          <div
            key={`tooth-${i}`}
            className="absolute inset-0"
            style={{ transform: `rotate(${(360 / TEETH.length) * i}deg)` }}
          >
            <span className="absolute left-1/2 top-0 h-[9%] w-4 -translate-x-1/2 -translate-y-1/2 bg-accent [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
          </div>
        ))}

        {/* Bold spokes from core to rim */}
        {SPOKES.map((_, i) => (
          <div
            key={`spoke-${i}`}
            className="absolute inset-0"
            style={{ transform: `rotate(${(360 / SPOKES.length) * i}deg)` }}
          >
            <span className="absolute left-1/2 top-0 h-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-accent to-accent/0" />
          </div>
        ))}

        {/* Inner rim */}
        <div className="absolute inset-[32%] rounded-full border border-accent/50" />

        {/* Hot core */}
        <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60" />
        <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_26px_9px_rgba(124,92,252,0.6)]" />
      </div>
    </div>
  )
}
