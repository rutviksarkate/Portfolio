import { motion } from 'framer-motion'
import { CheckCircle, Github, Linkedin, Mail, Phone, Send } from 'lucide-react'
import { useCallback, useState } from 'react'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { site } from '../config/site.js'
import cn from '../lib/cn.js'
import { submitContact } from '../lib/submitContact.js'
import { budgets, projectTypes, validateContact } from '../lib/validateContact.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

const empty = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
}

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls =
  'w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-mute/50 transition-colors focus:border-accent focus:outline-none'

export default function Contact() {
  const reduced = usePrefersReducedMotion()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = useCallback(
    (field) => (e) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    },
    [],
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fieldErrors = validateContact(values)
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors)
      return
    }

    setStatus('sending')
    try {
      const result = await submitContact(values)
      if (result.mode === 'mailto') {
        setStatus('mailto')
      } else {
        setStatus('sent')
      }
      setValues(empty)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'mailto') {
    return (
      <section id="contact" className="border-t border-line bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            className="mx-auto flex max-w-lg flex-col items-center text-center"
            variants={fadeUp}
            {...motionProps(reduced)}
          >
            <CheckCircle size={48} className="mb-4 text-accent" />
            <h2 className="text-2xl font-bold text-ink">
              {status === 'sent' ? 'Message sent.' : 'Opening your email client.'}
            </h2>
            <p className="mt-3 text-mute">
              {status === 'sent'
                ? "Thanks for reaching out. I'll review your message and get back to you."
                : 'Complete and send the pre-filled email, and I\'ll get back to you.'}
            </p>
            <Button
              className="mt-6"
              variant="secondary"
              onClick={() => setStatus('idle')}
            >
              Send another message
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's build something useful."
          subtitle="Tell me what you're building, what problem you're trying to solve, and where you need technical help."
        />

        <motion.div
          className="grid gap-12 lg:grid-cols-5 lg:gap-16"
          variants={stagger}
          {...motionProps(reduced)}
        >
          <motion.form
            variants={fadeUp}
            className="space-y-5 lg:col-span-3"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" id="name" error={errors.name}>
                <input
                  id="name"
                  type="text"
                  className={cn(inputCls, errors.name && 'border-red-500/60')}
                  placeholder="Your name"
                  value={values.name}
                  onChange={set('name')}
                />
              </Field>
              <Field label="Email" id="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  className={cn(inputCls, errors.email && 'border-red-500/60')}
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={set('email')}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Project Type"
                id="projectType"
                error={errors.projectType}
              >
                <select
                  id="projectType"
                  className={cn(inputCls, !values.projectType && 'text-mute/50', errors.projectType && 'border-red-500/60')}
                  value={values.projectType}
                  onChange={set('projectType')}
                >
                  <option value="">Select type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Budget" id="budget" error={errors.budget}>
                <select
                  id="budget"
                  className={cn(inputCls, !values.budget && 'text-mute/50', errors.budget && 'border-red-500/60')}
                  value={values.budget}
                  onChange={set('budget')}
                >
                  <option value="">Select range</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Message" id="message" error={errors.message}>
              <textarea
                id="message"
                rows={5}
                className={cn(inputCls, 'resize-y', errors.message && 'border-red-500/60')}
                placeholder="Describe your project and what you need..."
                value={values.message}
                onChange={set('message')}
              />
            </Field>

            {status === 'error' && (
              <p className="text-sm text-red-400" role="alert">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto"
            >
              <Send size={16} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </Button>

            {!site.form.endpoint && (
              <p className="text-xs text-mute/60">
                This opens your default email client with a pre-filled message.
              </p>
            )}
          </motion.form>

          <motion.div variants={fadeUp} className="space-y-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-ink">Get in touch</h3>

            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent"
            >
              <Mail size={18} className="shrink-0 text-accent" />
              {site.email}
            </a>

            <a
              href={site.phoneHref}
              className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent"
            >
              <Phone size={18} className="shrink-0 text-accent" />
              {site.phone}
            </a>

            {site.github && (
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent"
              >
                <Github size={18} className="shrink-0 text-accent" />
                GitHub
              </a>
            )}

            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent"
              >
                <Linkedin size={18} className="shrink-0 text-accent" />
                LinkedIn
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
