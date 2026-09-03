import { motion } from 'framer-motion'
import { CheckCircle, FileDown, Github, Linkedin, Mail, Phone, Send } from 'lucide-react'
import { useCallback, useState } from 'react'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { site } from '../config/site.js'
import cn from '../lib/cn.js'
import { submitContact } from '../lib/submitContact.js'
import { inquiryTypes, validateContact } from '../lib/validateContact.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

const empty = {
  name: '',
  email: '',
  inquiryType: '',
  message: '',
  website: '',
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
      await submitContact(values)
      setStatus('sent')
      setValues(empty)
    } catch (err) {
      setStatus(err?.code === 'activation' ? 'activate' : 'error')
    }
  }

  if (status === 'sent') {
    return (
      <section id="contact" className="border-t border-line bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            className="mx-auto flex max-w-lg flex-col items-center text-center"
            variants={fadeUp}
            {...motionProps(reduced)}
          >
            <CheckCircle size={48} className="mb-4 text-accent" />
            <h2 className="text-2xl font-bold text-ink">Message sent.</h2>
            <p className="mt-3 text-mute">
              Thanks for reaching out. I&apos;ll review your message and get back to you.
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
          title="Let's work together."
          subtitle="Freelance projects, contract work, or full-time roles — tell me what you're looking for and how I can help."
        />

        <motion.div
          className="grid gap-12 lg:grid-cols-5 lg:gap-16"
          variants={stagger}
          {...motionProps(reduced)}
        >
          <motion.form
            variants={fadeUp}
            className="relative space-y-5 lg:col-span-3"
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

            <Field label="I'm reaching out about" id="inquiryType" error={errors.inquiryType}>
              <select
                id="inquiryType"
                className={cn(inputCls, !values.inquiryType && 'text-mute/50', errors.inquiryType && 'border-red-500/60')}
                value={values.inquiryType}
                onChange={set('inquiryType')}
              >
                <option value="">Select one</option>
                {inquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message" id="message" error={errors.message}>
              <textarea
                id="message"
                rows={5}
                className={cn(inputCls, 'resize-y', errors.message && 'border-red-500/60')}
                placeholder="Share the role, project, or problem, and what you need from me..."
                value={values.message}
                onChange={set('message')}
              />
            </Field>

            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={set('website')}
              />
            </div>

            {status === 'activate' && (
              <p className="text-sm text-amber-300" role="status">
                FormSubmit emailed {site.email} an activation link. Check Inbox, Spam, and Promotions,
                click Activate Form, then send again. After that, messages arrive as normal email.
              </p>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-400" role="alert">
                Couldn&apos;t send just now.{' '}
                <a href={`mailto:${site.email}`} className="underline hover:text-accent">
                  Email me directly
                </a>
                {' '}instead.
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

            {site.resume?.href && (
              <a
                href={site.resume.href}
                download={site.resume.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-mute transition-colors hover:text-accent"
              >
                <FileDown size={18} className="shrink-0 text-accent" />
                {site.resume.label}
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
