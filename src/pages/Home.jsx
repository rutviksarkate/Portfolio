import { useEffect } from 'react'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import About from '../sections/About.jsx'
import Capabilities from '../sections/Capabilities.jsx'
import Contact from '../sections/Contact.jsx'
import Experience from '../sections/Experience.jsx'
import Hero from '../sections/Hero.jsx'
import IndependentBuilds from '../sections/IndependentBuilds.jsx'
import Process from '../sections/Process.jsx'
import ProofBar from '../sections/Proof.jsx'
import Services from '../sections/Services.jsx'
import { site } from '../data/portfolio.js'

export default function Home() {
  useEffect(() => {
    document.title = site.seo.title
  }, [])

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProofBar />
        <IndependentBuilds />
        <Capabilities />
        <Experience />
        <Process />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
