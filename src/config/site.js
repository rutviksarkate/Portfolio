/**
 * Central site configuration.
 * Update personal details, links, hero copy, and form destination here.
 *
 * After changing `url`, also update canonical / Open Graph URLs in index.html.
 */
export const site = {
  name: 'Rutvik Sarkate',
  shortName: 'RS',
  title: 'Full-Stack Software Developer',
  location: 'India',
  email: 'rutviksarkate0912@gmail.com',
  phone: '+91 9769620649',
  phoneHref: 'tel:+919769620649',

  /**
   * Add full profile URLs when ready. Empty strings hide the links.
   * Example: 'https://github.com/your-handle'
   */
  github: '',
  linkedin: '',

  /** Served from /public. Update the file there when the resume changes. */
  resume: {
    href: '/Rutvik-Sarkate-Resume.pdf',
    label: 'Download Resume',
    filename: 'Rutvik-Sarkate-Resume.pdf',
  },

  /**
   * Production site URL used for SEO canonical tags at build time.
   * Keep in sync with index.html once you have a real domain.
   */
  url: '',

  availability: 'Open to freelance, contract, and full-time roles',

  hero: {
    eyebrow: 'Full-Stack Software Developer',
    headline: 'Building scalable web products that solve real business problems.',
    supporting:
      'I build high-performance web applications, APIs, and business systems using modern JavaScript technologies.',
    techLine: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    primaryCta: { label: 'View Experience', href: '#experience' },
    secondaryCta: { label: "Let's Work Together", href: '#contact' },
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Experience', to: '/#experience' },
    { label: 'Skills', to: '/#skills' },
    { label: 'Services', to: '/#services' },
    { label: 'Demos', to: '/demos' },
    { label: 'Contact', to: '/#contact' },
  ],

  cta: {
    label: "Let's Talk",
    href: '/#contact',
  },

  education: {
    degree: 'BE/BTech in Computer Science Engineering',
    school: 'Vidyalankar Institute of Technology / University of Mumbai',
    cgpa: '9.53',
    graduated: '2023',
  },

  seo: {
    title: 'Rutvik Sarkate | Full-Stack Software Developer',
    description:
      'Rutvik Sarkate is a Full-Stack Software Developer building scalable web applications, APIs and production-ready business systems.',
  },

  /**
   * Contact form delivery.
   * Default: FormSubmit emails `site.email`. Confirm the first activation mail once.
   * Optional: set `web3formsKey` (or VITE_WEB3FORMS_ACCESS_KEY) for Web3Forms.
   * Optional: set `endpoint` to a custom JSON API instead.
   */
  form: {
    endpoint: '',
    web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  },
}
