import estateDeskImage from '../assets/projects/estate-desk.svg'
import projectPlaceholder from '../assets/projects/project-placeholder.svg'

/**
 * All project cards are driven from this file.
 *
 * To publish a project:
 * 1. Drop a screenshot into src/assets/projects/ (PNG/WebP preferred).
 * 2. Import it above and set `image`.
 * 3. Fill name, description, technologies.
 * 4. Add liveUrl / githubUrl only when the URLs are real.
 *
 * Leave name empty to render the “coming soon” placeholder card.
 */
const projects = [
  {
    name: 'EstateDesk',
    description:
      'A real-estate-focused CRM/SaaS platform designed to help channel partners and brokers manage leads, projects, inventory, bookings, revenue and business operations.',
    image: estateDeskImage,
    technologies: [
      'React.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
    ],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    features: [
      'Lead management',
      'Project management',
      'Inventory management',
      'Booking management',
      'Revenue tracking',
      'User management',
      'RBAC',
      'Business workflows',
    ],
  },
  {
    name: '',
    description: '',
    image: projectPlaceholder,
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  },
  {
    name: '',
    description: '',
    image: projectPlaceholder,
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  },
  {
    name: '',
    description: '',
    image: projectPlaceholder,
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  },
  {
    name: '',
    description: '',
    image: projectPlaceholder,
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  },
]

export default projects
