import { site } from '../config/site.js'

export async function submitContact(values) {
  if (site.form.endpoint) {
    const response = await fetch(site.form.endpoint, {
      method: site.form.method || 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      throw new Error('The form endpoint rejected the request.')
    }

    return { mode: 'endpoint' }
  }

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

  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  return { mode: 'mailto' }
}
