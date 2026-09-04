import { ArrowRight } from 'lucide-react'
import ArchitectureVisual from '../components/ArchitectureVisual.jsx'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/portfolio.js'

export default function Hero() {
  const { hero } = site

  return (
    <section id="home" className="bg-grid bg-noise relative overflow-hidden pt-24 sm:pt-28">
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {hero.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-4 max-w-[18ch] text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
                {hero.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
                {hero.supporting}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Primary technologies">
                {hero.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-line bg-surface/80 px-3 py-1 text-[12px] text-mute"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight size={16} />
                </Button>
                <Button href={hero.secondaryCta.href} variant="secondary">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
            {site.available && (
              <Reveal delay={0.26}>
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-mute">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                  </span>
                  {site.availability}
                </p>
              </Reveal>
            )}
          </div>
          <Reveal delay={0.12} className="lg:pl-4">
            <ArchitectureVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
