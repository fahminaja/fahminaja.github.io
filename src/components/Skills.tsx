import { skills } from '../data'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function Skills() {
  return (
    <section id="skill" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle title="Skill" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.1}>
            <div className="card h-full transition-transform hover:-translate-y-1">
              <h3 className="mb-4 text-xl font-bold">{s.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-ink/30 bg-paper px-3 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
