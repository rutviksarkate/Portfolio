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

  if (!values.inquiryType) {
    errors.inquiryType = 'Select why you are reaching out.'
  }

  if (!values.message.trim()) {
    errors.message = 'Describe what you need.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please add a bit more detail (20+ characters).'
  }

  return errors
}

export const inquiryTypes = [
  'Freelance project',
  'Full-time role',
  'Contract / consulting',
  'Other',
]
