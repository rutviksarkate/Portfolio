import { site } from '../config/site.js'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

function payload(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    inquiry: values.inquiryType,
    message: values.message.trim(),
    subject: `Portfolio inquiry — ${values.inquiryType}`,
  }
}

function isSuccess(data) {
  return data?.success === true || data?.success === 'true'
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))
  const message = String(data.message || '')

  if (/activation/i.test(message)) {
    const error = new Error(message)
    error.code = 'activation'
    throw error
  }

  if (!response.ok || !isSuccess(data)) {
    throw new Error(message || 'The form endpoint rejected the request.')
  }

  return data
}

export async function submitContact(values) {
  if (values.website) {
    return { ok: true }
  }

  const fields = payload(values)

  if (site.form.web3formsKey) {
    await postJson(WEB3FORMS_URL, {
      access_key: site.form.web3formsKey,
      from_name: site.name,
      replyto: fields.email,
      botcheck: false,
      ...fields,
    })
    return { ok: true }
  }

  if (site.form.endpoint) {
    await postJson(site.form.endpoint, fields)
    return { ok: true }
  }

  await postJson(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
    name: fields.name,
    email: fields.email,
    inquiry: fields.inquiry,
    message: fields.message,
    _subject: fields.subject,
    _template: 'table',
    _captcha: 'false',
    _replyto: fields.email,
  })

  return { ok: true }
}
