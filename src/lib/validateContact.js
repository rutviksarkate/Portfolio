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

  if (values.message.trim() && values.message.trim().length < 10) {
    errors.message = 'Add a little more detail so I can reply usefully.'
  }

  return errors
}
