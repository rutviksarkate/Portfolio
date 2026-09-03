import { site } from '../config/site.js'

export function validateContact(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Enter your name.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.projectType) {
    errors.projectType = 'Select a project type.'
  }

  if (!values.budget) {
    errors.budget = 'Select a budget range.'
  }

  if (!values.message.trim()) {
    errors.message = 'Describe what you need.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please add a bit more detail (20+ characters).'
  }

  return errors
}

export const projectTypes = [
  'Web Application',
  'Full-Stack Development',
  'Backend/API',
  'Performance Optimization',
  'Other',
]

export const budgets = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
  "Let's Discuss",
]

export function mailtoDraft(values) {
  const subject = encodeURIComponent(`Project inquiry — ${values.projectType}`)
  const body = encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project type: ${values.projectType}`,
      `Budget: ${values.budget}`,
      '',
      values.message,
    ].join('\n'),
  )
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}
