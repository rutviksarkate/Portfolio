import Container from '../components/Container.jsx'
import ExperienceTimeline from '../components/ExperienceTimeline.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-surface/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Experience"
          subtitle="Roles, systems, and the work that can be verified."
        />
        <ExperienceTimeline />
      </Container>
    </section>
  )
}
