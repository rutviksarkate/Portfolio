import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import { site } from '../config/site.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

const stats = [
  { label: 'Started professional software career', value: '2023' },
  { label: 'Engineering CGPA', value: site.education.cgpa },
  { label: 'Frontend + Backend', value: 'Full Stack' },
  { label: 'Development → Deployment', value: 'Production' },
]

export default function About() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="about" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="About"
          title="Building software with a focus on performance, reliability and business value."
        />

        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-16"
          variants={stagger}
          {...motionProps(reduced)}
        >
          <motion.div variants={fadeUp} className="max-w-xl space-y-4 text-mute">
            <p className="leading-relaxed">
              I&apos;m a full-stack software developer based in India with professional experience building web applications, REST APIs, and production business systems.
            </p>
            <p className="leading-relaxed">
              I work across the stack — from React on the frontend to Node.js and Express on the backend, with MongoDB and PostgreSQL for data. My focus extends beyond writing features: I work on performance, deployment, authentication, and making sure the systems I build are reliable in production.
            </p>
            <p className="leading-relaxed">
              I graduated with a {site.education.cgpa} CGPA in Computer Science from {site.education.school} ({site.education.graduated}).
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={stagger}
            {...motionProps(reduced)}
          >
            {stats.map((s) => (
              <motion.div
                key={s.value}
                variants={fadeUp}
                className="rounded-xl border border-line bg-canvas p-5"
              >
                <span className="text-2xl font-bold text-accent lg:text-3xl">
                  {s.value}
                </span>
                <p className="mt-1.5 text-xs leading-snug text-mute sm:text-sm">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
