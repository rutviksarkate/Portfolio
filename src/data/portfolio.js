/**
 * Single source of truth for portfolio content.
 * Update this file to change personal details, copy, experience, and projects.
 */

export const site = {
  name: 'Rutvik Sarkate',
  shortName: 'RS',
  title: 'Full-Stack Software Developer',
  positioning: 'Full-Stack Engineer building production-ready web applications and SaaS products.',
  location: 'India',
  email: 'rutviksarkate0912@gmail.com',
  phone: '+91 9769620649',
  phoneHref: 'tel:+919769620649',

  /**
   * Replace these with your real profile URLs.
   */
  github: 'https://github.com/rutviksarkate',
  linkedin: 'https://www.linkedin.com/in/rutviksarkate',

  resume: {
    href: '/Rutvik-Sarkate-Resume.pdf',
    label: 'Download Resume',
    filename: 'Rutvik-Sarkate-Resume.pdf',
  },

  /**
   * Production URL for canonical / Open Graph tags.
   * Update this and the matching tags in index.html when the domain is live.
   */
  url: '',

  /**
   * Set to false to hide the availability indicator across the site.
   */
  available: true,
  availability: 'Available for freelance & contract work',

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],

  cta: {
    label: "Let's Work Together",
    href: '/#contact',
  },

  hero: {
    eyebrow: 'Full-Stack Software Developer',
    headline: 'Building software that solves real problems.',
    supporting:
      'I build production-ready web applications and SaaS products across the frontend, backend, APIs, databases, and performance layer.',
    chips: ['React', 'Node.js', 'JavaScript', 'APIs', 'Databases', 'Performance'],
    primaryCta: { label: 'View My Work', href: '/#work' },
    secondaryCta: { label: 'Start a Conversation', href: '/#contact' },
  },

  about: {
    heading: "Hi, I'm Rutvik.",
    body: [
      "I'm a full-stack software developer. I build web applications and SaaS products across the frontend, backend, and data layer, and I care about whether the result is actually usable.",
      'My professional work has been on production systems: React applications, APIs, and the performance work between shipping a feature and making a page feel fast. At DePronto Infotech I worked on a large insurance platform and helped reduce page load time by about 40% through frontend optimization, lazy loading, CDN usage, and tighter application architecture.',
      'I also build independent product concepts (operations tools, analytics dashboards, media interfaces, and developer workflows) to stay close to product thinking, not just tickets. If you have a product to ship or a system that needs to get faster, I can help.',
    ],
  },

  education: {
    degree: 'BE/BTech in Computer Science Engineering',
    school: 'Vidyalankar Institute of Technology / University of Mumbai',
    cgpa: '9.53',
    graduated: '2023',
  },

  seo: {
    title: 'Rutvik Sarkate - Full-Stack Software Developer',
    description:
      'Portfolio of Rutvik Sarkate, a full-stack software developer building modern web applications and SaaS products with React, Node.js and JavaScript.',
  },

  footer: {
    line: 'Building useful software, one product at a time.',
  },

  form: {
    endpoint: '',
    web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  },
}

export const proof = {
  title: 'Built for production. Designed for people.',
  supporting:
    'Improved performance on a production insurance platform through frontend optimization, lazy loading, CDN usage and improved application architecture.',
  items: [
    { value: '40%', label: 'Reduction in page load time', featured: true },
    { value: 'React', label: 'Production frontend experience', featured: false },
    { value: 'Full-Stack', label: 'Frontend + backend development', featured: false },
    { value: 'Remote', label: 'Comfortable working with distributed teams', featured: false },
  ],
}

export const experience = [
  {
    id: 'rhombuz',
    role: 'Full Stack Developer',
    company: 'RhombuzDesigns Private Limited',
    period: 'Apr 2025 – Present',
    current: true,
    highlights: [
      'Designing and developing scalable web applications with React.js, Next.js, Node.js, and modern JavaScript.',
      'Building reusable UI components and optimizing frontend performance with code splitting, lazy loading, caching, and efficient state management.',
      'Integrating REST APIs and implementing authentication, authorization, and role-based access control.',
      'Shipping features in Agile sprints, including code reviews, debugging, and production issue resolution.',
    ],
  },
  {
    id: 'depronto',
    role: 'Software Developer',
    company: 'DePronto Infotech',
    period: 'Jul 2024 – Mar 2025',
    current: false,
    highlights: [
      'Built production frontend for a life-insurance web platform using JavaScript, React, Redux, React Router, HTML, CSS, and Ant Design.',
      'Worked on application performance, data flow, lazy loading, and CDN-backed frontend delivery.',
      'Collaborated with cross-functional teams on responsive, user-friendly interfaces in an agile sprint environment.',
    ],
    achievement:
      'Reduced page load time by approximately 40% through optimized coding practices, React architecture, lazy loading, and CDN usage.',
  },
  {
    id: 'smartsa',
    role: 'Full Stack Developer',
    company: 'Smartsa Tech Pvt Ltd',
    period: 'Jul 2023 – Jun 2024',
    current: false,
    highlights: [
      'Enhanced an existing Angular portal and built a new portal with React.js, Node.js, Express, MySQL, HTML5, and CSS3.',
      'Worked across React.js, Node.js, Express, MySQL, and MongoDB to deliver full-stack features.',
      'Used Git/Bitbucket for version control and collaborative delivery.',
    ],
  },
]

export const capabilities = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description:
      'Production React applications with clear component architecture, predictable state, and interfaces that hold up on real devices.',
    items: ['React.js', 'Angular.js', 'Next.js', 'Redux', 'Responsive UI', 'Performance'],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    description:
      'APIs and server logic that match the product: authentication, business rules, and data contracts the frontend can trust.',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Business logic'],
  },
  {
    id: 'data',
    title: 'Data & Infrastructure',
    description:
      'Data models and delivery paths that keep applications fast, from query shape to CDN-backed frontend assets.',
    items: ['MongoDB', 'MySQL', 'API integration', 'Data modeling', 'CDN'],
  },
  {
    id: 'product',
    title: 'Product Engineering',
    description:
      'The unglamorous work products actually need: dashboards, admin systems, workflows, and tools teams use every day.',
    items: [
      'SaaS applications',
      'Dashboards',
      'Admin systems',
      'CRM workflows',
      'Internal tools',
      'Responsive web applications',
    ],
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: ['React.js', 'JavaScript', 'Angular.js', 'Next.js', 'Redux', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub'],
  },
  {
    category: 'Architecture',
    items: ['REST APIs', 'Frontend performance', 'Component architecture'],
  },
]

export const process = [
  {
    step: '01',
    title: 'Understand',
    description: 'Understand the product, users and business requirements.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Break the requirements into practical workflows and interfaces.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Develop frontend, backend, APIs and database systems.',
  },
  {
    step: '04',
    title: 'Ship & Improve',
    description: 'Deploy, measure, fix bottlenecks and iterate.',
  },
]

export const services = [
  {
    id: 'web-app',
    title: 'Build a Web Application',
    description: 'Turn a product idea into a functional, production-ready web application.',
    icon: 'layout',
  },
  {
    id: 'saas',
    title: 'Build SaaS Products',
    description: 'Design and develop dashboards, workflows, authentication, APIs and business logic.',
    icon: 'stack',
  },
  {
    id: 'improve',
    title: 'Improve Existing Applications',
    description: 'Refactor frontend applications, improve architecture and eliminate technical bottlenecks.',
    icon: 'wrench',
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Identify frontend performance bottlenecks and improve loading and runtime performance.',
    icon: 'gauge',
  },
]

export const contactOptions = {
  projectTypes: [
    'New product',
    'Existing application',
    'Feature development',
    'Performance optimization',
    'Backend/API',
    'Other',
  ],
  budgets: ['Under $1,000', '$1,000–$3,000', '$3,000–$5,000', '$5,000+', 'Not sure yet'],
  timelines: ['ASAP', 'Within 1 month', '1–3 months', 'Flexible'],
}

export const professionalProject = {
  title: 'Large-Scale Insurance Platform',
  label: 'Professional Experience',
  company: 'DePronto Infotech',
  description:
    'Worked on a production insurance web platform with a focus on frontend development, application performance and data flow.',
  technologies: ['React.js', 'Redux', 'React Router', 'Ant Design', 'Lazy Loading', 'CDN'],
  highlight: '40% faster page load',
  caseStudy: {
    problem:
      'Application performance needed improvement, particularly around loading and frontend delivery.',
    workedOn: [
      'React application development',
      'Redux data flow',
      'React Router',
      'Lazy loading',
      'CDN optimization',
      'Frontend performance improvements',
      'Reusable UI implementation',
    ],
    result: 'Reduced page load time by approximately 40%.',
  },
}

export const independentProjects = [
  {
    slug: 'estatedesk',
    number: '01',
    title: 'EstateDesk',
    badge: 'Independent Build',
    category: 'Real Estate Operations',
    image: '/projects/estatedesk.png',
    urlLabel: 'concept / estatedesk',
    description:
      'A modern operations platform concept for real estate teams: leads, inventory, bookings, and sales workflows in one workspace.',
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    slug: 'pulseboard',
    number: '02',
    title: 'PulseBoard',
    badge: 'Independent Build',
    category: 'Team Analytics',
    image: '/projects/pulseboard.png',
    urlLabel: 'concept / pulseboard',
    description:
      'An analytics dashboard concept for distributed software teams. Figures in the screenshot are generated demo data, not production metrics.',
    technologies: ['React', 'Node.js', 'REST API', 'MongoDB'],
  },
  {
    slug: 'framevault',
    number: '03',
    title: 'FrameVault',
    badge: 'Independent Build',
    category: 'Media Platform',
    image: '/projects/framevault.png',
    urlLabel: 'concept / framevault',
    description:
      'A media library and streaming interface concept covering discovery, collections, and playback. Titles and artwork are original placeholders.',
    technologies: ['React', 'JavaScript', 'Responsive UI'],
  },
  {
    slug: 'forge',
    number: '04',
    title: 'Forge',
    badge: 'Independent Build',
    category: 'Developer Tools',
    image: '/projects/forge.png',
    urlLabel: 'concept / forge',
    description:
      'A coding workspace concept for practicing programming problems, with editor, tests, and submission state as an interface study.',
    technologies: ['React', 'JavaScript', 'Product UX'],
  },
]
