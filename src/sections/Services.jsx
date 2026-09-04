import { ArrowRight } from 'lucide-react'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { services } from '../data/portfolio.js'

export default function Services() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="How I Can Help"
          subtitle="Hire me to build the product, improve the one you have, or make it faster."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[14px] border border-line bg-surface px-6 py-6 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-lg font-semibold tracking-tight text-ink">Have a project in mind?</p>
            <p className="mt-1 text-sm text-mute">Let&apos;s discuss it.</p>
          </div>
          <Button href="/#contact">
            Start a Conversation
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  )
}
