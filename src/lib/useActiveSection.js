import { useEffect, useState } from 'react'

const SECTION_IDS = ['home', 'work', 'skills', 'experience', 'about', 'contact']

export function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const visibility = Object.fromEntries(SECTION_IDS.map((id) => [id, 0]))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility[entry.target.id] = entry.intersectionRatio
        })

        let next = 'home'
        let best = 0
        SECTION_IDS.forEach((id) => {
          if (visibility[id] > best) {
            best = visibility[id]
            next = id
          }
        })

        if (best > 0) {
          setActive(next)
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 1],
      },
    )

    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  return active
}

export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
