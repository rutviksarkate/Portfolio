import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SkillGroup from '../components/SkillGroup.jsx'
import { capabilities, skills } from '../data/portfolio.js'

export default function Capabilities() {
  return (
    <section id="skills" className="border-t border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="What I Build"
          subtitle="The stack is a means. The work is shipping software that holds up in production."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 0.05}>
              <article className="h-full rounded-[14px] border border-line bg-surface p-6 lg:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{cap.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line px-2 py-0.5 text-[11px] text-mute"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {skills.map((group) => (
            <SkillGroup key={group.category} category={group.category} items={group.items} />
          ))}
        </div>
      </Container>
    </section>
  )
}
