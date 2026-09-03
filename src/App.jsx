import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Experience from './sections/Experience.jsx'
import Hero from './sections/Hero.jsx'
import Process from './sections/Process.jsx'
import Projects from './sections/Projects.jsx'
import Services from './sections/Services.jsx'
import Skills from './sections/Skills.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
