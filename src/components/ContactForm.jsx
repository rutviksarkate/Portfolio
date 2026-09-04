import { CheckCircle, Send } from 'lucide-react'
import { useCallback, useState } from 'react'
import { contactOptions, site } from '../data/portfolio.js'
import cn from '../lib/cn.js'
import { submitContact } from '../lib/submitContact.js'
import { validateContact } from '../lib/validateContact.js'
import Button from './Button.jsx'

const empty = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
  website: '',
}

const inputCls =
  'w-full rounded-[10px] border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none'

function Field({ label, id, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        <span>{label}</span>
        {optional && <span className="text-[11px] font-normal text-faint">Optional</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
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
      <div className="flex flex-col items-start rounded-[14px] border border-line bg-surface p-8">
        <CheckCircle size={28} className="text-ok" />
        <h3 className="mt-4 text-xl font-semibold text-ink">Message sent.</h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          I&apos;ll read this and reply. If it&apos;s urgent, email me directly.
        </p>
        <Button className="mt-6" variant="secondary" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form className="relative space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={cn(inputCls, errors.name && 'border-danger/70')}
            placeholder="Your name"
            value={values.name}
            onChange={set('name')}
            required
          />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={cn(inputCls, errors.email && 'border-danger/70')}
            placeholder="you@company.com"
            value={values.email}
            onChange={set('email')}
            required
          />
        </Field>
      </div>

      <Field label="Project type" id="projectType" optional>
        <select
          id="projectType"
          className={cn(inputCls, !values.projectType && 'text-faint')}
          value={values.projectType}
          onChange={set('projectType')}
        >
          <option value="">Select one</option>
          {contactOptions.projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Budget" id="budget" optional>
          <select
            id="budget"
            className={cn(inputCls, !values.budget && 'text-faint')}
            value={values.budget}
            onChange={set('budget')}
          >
            <option value="">Select a range</option>
            {contactOptions.budgets.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" id="timeline" optional>
          <select
            id="timeline"
            className={cn(inputCls, !values.timeline && 'text-faint')}
            value={values.timeline}
            onChange={set('timeline')}
          >
            <option value="">Select a timeline</option>
            {contactOptions.timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" id="message" error={errors.message} optional>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(inputCls, 'resize-y', errors.message && 'border-danger/70')}
          placeholder="What you're building, where you're stuck, and what you need."
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
        <p className="text-sm text-accent" role="status">
          FormSubmit emailed {site.email} an activation link. Check Inbox, Spam, and Promotions,
          click Activate Form, then send again.
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-danger" role="alert">
          Couldn&apos;t send just now.{' '}
          <a href={`mailto:${site.email}`} className="underline hover:text-ink">
            Email me directly
          </a>{' '}
          instead.
        </p>
      )}

      <Button type="submit" disabled={status === 'sending'}>
        <Send size={16} />
        {status === 'sending' ? 'Sending…' : 'Start a Conversation'}
      </Button>
    </form>
  )
}
