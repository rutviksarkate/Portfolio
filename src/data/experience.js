/**
 * Professional experience.
 * Set `show: false` to hide an entry until the details are ready.
 * Do not invent company names, dates, or metrics.
 */
const experience = [
  {
    id: 'depronto',
    role: 'Software Developer',
    company: 'DePronto Infotech',
    period: 'Current',
    current: true,
    show: true,
    highlights: [
      'Building production React applications with Redux and React Router.',
      'Integrating REST APIs into frontend product flows.',
      'Working on frontend performance: lazy loading, CDN delivery, and rendering efficiency.',
    ],
    achievement:
      'Contributed to a major life-insurance website, reducing load time by approximately 40% through frontend performance optimization, lazy loading, and CDN usage.',
  },
  {
    id: 'smartsa',
    role: 'Full Stack Developer',
    company: 'Smartsa Tech Pvt Ltd',
    period: 'July 2023 – June 2024',
    current: false,
    show: true,
    highlights: [
      'Built and maintained full-stack web applications with React on the frontend and Node.js/Express APIs on the backend.',
      'Worked with MongoDB, MySQL, and PostgreSQL depending on the product’s data needs.',
      'Implemented authentication, role-based access, and third-party API integrations.',
      'Shipped features through Git-based workflows, with Docker and CI/CD as part of delivery.',
    ],
  },
  {
    id: 'intern',
    role: 'Software Development Intern',
    company: '',
    period: '',
    current: false,
    show: false,
    highlights: [
      'Add 2–4 concise bullets covering what you built and shipped.',
    ],
  },
]

export default experience
