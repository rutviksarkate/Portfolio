import Container from '../components/Container.jsx'
import { ProjectGrid } from '../components/ProjectCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { independentProjects } from '../data/portfolio.js'

export default function IndependentBuilds() {
  return (
    <section id="work" className="border-t border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Independent product builds"
          subtitle="Self-initiated product concepts. Screenshots of the interfaces, not client work."
        />
        <ProjectGrid projects={independentProjects} />
      </Container>
    </section>
  )
}
