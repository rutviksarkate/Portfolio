import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import { proof } from '../data/portfolio.js'
import cn from '../lib/cn.js'

export default function ProofBar() {
  return (
    <section className="border-y border-line bg-surface/60">
      <Container className="py-14 lg:py-16">
        <Reveal>
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {proof.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute lg:text-base">
            {proof.supporting}
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {proof.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <div
                className={cn(
                  'h-full rounded-[14px] border px-4 py-5 sm:px-5',
                  item.featured
                    ? 'border-accent/30 bg-accent-dim'
                    : 'border-line bg-canvas/50',
                )}
              >
                <p
                  className={cn(
                    'font-semibold tracking-tight',
                    item.featured
                      ? 'text-3xl text-accent sm:text-4xl'
                      : 'text-xl text-ink sm:text-2xl',
                  )}
                >
                  {item.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-mute sm:text-sm">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
