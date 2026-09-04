import ContactForm from '../components/ContactForm.jsx'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/portfolio.js'

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Have something worth building?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
              Tell me what you&apos;re building, where you&apos;re stuck, and what you&apos;re trying to
              achieve.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
            >
              {site.email}
            </a>
            {site.available && (
              <p className="mt-6 text-sm text-mute">{site.availability}</p>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
