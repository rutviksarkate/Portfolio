import aptlyImage from '../assets/projects/aptly.svg'
import forgeImage from '../assets/projects/knockout.png'
import movieImage from '../assets/projects/movie-app.png'
import pulseImage from '../assets/projects/pulseboard.svg'
import shopImage from '../assets/projects/shopngo.png'

export function projectHref(project) {
  return project.path || ''
}

const projects = [
  {
    name: 'Harbor Shop',
    description:
      'A boutique storefront with lookbooks, saved pieces, finish options, promo codes, gift wrap, and order tracking.',
    image: shopImage,
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    path: '/work/harbor-shop',
    featured: true,
    features: ['Wishlist', 'Guest checkout', 'Promo codes', 'Order tracking'],
  },
  {
    name: 'PulseBoard',
    description:
      'A SaaS console: date-ranged metrics, CRM notes, plan changes, invoices, team, alerts, and workspace settings.',
    image: pulseImage,
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    path: '/work/pulseboard',
    featured: false,
  },
  {
    name: 'FrameVault',
    description:
      'A cinema house: profiles, continue watching, ratings, downloads, trailers, and a player with quality and subtitles.',
    image: movieImage,
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    path: '/work/framevault',
    featured: false,
  },
  {
    name: 'Forge Arena',
    description:
      'A live contest IDE: discussion, editorial, custom stdin, submit to the judge, and global or friends standings.',
    image: forgeImage,
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    path: '/work/forge-arena',
    featured: false,
  },
  {
    name: 'Aptly',
    description:
      'A studio booking product: two-week calendar, waitlist, gifts, reminders, payments, and reschedule from your visits.',
    image: aptlyImage,
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    path: '/work/aptly',
    featured: false,
  },
]

export default projects
