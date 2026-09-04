import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { process } from '../data/portfolio.js'

export default function Process() {
  return (
    <section className="border-t border-line bg-surface/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="From idea to shipped product."
          subtitle="A practical path from messy requirements to something people can use."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.06}>
              <article className="relative h-full overflow-hidden rounded-[14px] border border-line bg-canvas p-6">
                <span className="font-mono text-3xl font-semibold text-accent/35">{step.step}</span>
                {i < process.length - 1 && (
                  <span
                    className="absolute right-4 top-8 hidden h-px w-8 bg-line lg:block"
                    aria-hidden="true"
                  />
                )}
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
