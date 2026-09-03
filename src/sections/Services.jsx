import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Button from '../components/Button.jsx'
import services from '../data/services.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Services() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="services" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Services"
          title="What I can build for you."
        />

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          {...motionProps(reduced)}
        >
          {services.map((svc) => (
            <ServiceCard
              key={svc.id}
              title={svc.title}
              description={svc.description}
              icon={svc.icon}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-14 text-center"
          variants={fadeUp}
          {...motionProps(reduced)}
        >
          <p className="mb-5 text-lg text-mute">Have a project in mind?</p>
          <Button href="#contact">Let&apos;s Talk</Button>
        </motion.div>
      </div>
    </section>
  )
}
