import { usePrefersReducedMotion } from '../lib/useMotion.js'

const layers = [
  { name: 'Frontend', detail: 'React · state · routes' },
  { name: 'API', detail: 'REST · auth · logic' },
  { name: 'Database', detail: 'MongoDB · MySQL' },
]

export default function ArchitectureVisual() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:max-w-none">
      <div
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgb(201_164_108/0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_80px_rgb(0_0_0_/_0.45)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 flex-1 rounded-md bg-elevated px-3 py-1 text-center font-mono text-[11px] text-faint">
            app.product / stack
          </span>
        </div>

        <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[104px_1fr]">
          <aside className="border-r border-line bg-canvas/40 px-3 py-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
              Layer
            </p>
            <div className="space-y-2">
              {['UI', 'API', 'Data'].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-md px-2 py-1.5 text-[11px] ${
                    i === 0 ? 'bg-accent-dim text-accent' : 'text-mute'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <div className="relative px-4 py-5 sm:px-5">
            <ol className="space-y-3">
              {layers.map((layer, i) => (
                <li key={layer.name}>
                  <div className="rounded-xl border border-line bg-elevated/80 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-ink">{layer.name}</p>
                      <span className="text-[11px] text-faint">{layer.detail}</span>
                    </div>
                  </div>
                  {i < layers.length - 1 && (
                    <div className="relative mx-auto h-6 w-px bg-line" aria-hidden="true">
                      <span
                        className={`absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent ${
                          reduced ? 'top-2' : 'animate-[pulse-soft_2.4s_ease-in-out_infinite]'
                        }`}
                        style={reduced ? undefined : { animationDelay: `${i * 0.45}s` }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-center text-[11px] text-faint">
              Frontend → API → Database
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
