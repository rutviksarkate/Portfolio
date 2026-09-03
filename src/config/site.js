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

  /**
   * Production site URL used for SEO canonical tags at build time.
   * Keep in sync with index.html once you have a real domain.
   */
  url: '',

  availability: 'Available for freelance & contract projects',

  hero: {
    eyebrow: 'Full-Stack Software Developer',
    headline: 'Building scalable web products that solve real business problems.',
    supporting:
      'I build high-performance web applications, APIs, and business systems using modern JavaScript technologies.',
    techLine: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    primaryCta: { label: 'View My Work', href: '#projects' },
    secondaryCta: { label: "Let's Work Together", href: '#contact' },
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],

  cta: {
    label: "Let's Talk",
    href: '#contact',
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
   * Contact form destination.
   * Leave `endpoint` empty to use a mailto fallback (no fake “email sent” claim).
   * To connect later: set endpoint to a Formspree, Getform, or API URL.
   */
  form: {
    endpoint: '',
    method: 'POST',
  },
}
