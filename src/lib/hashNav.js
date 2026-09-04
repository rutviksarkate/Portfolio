export function getHash(href = '') {
  const index = String(href).indexOf('#')
  return index >= 0 ? href.slice(index) : ''
}

export function scrollToHash(hash, behavior = 'smooth') {
  if (!hash || hash === '#') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const node = document.querySelector(hash)
  if (node) node.scrollIntoView({ behavior })
}
