import { achievements, education, jobs, organizations } from '../data'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

function Heading({ children }: { children: string }) {
  return <h3 className="mb-5 text-xl font-bold md:text-2xl">{children}</h3>
}

function Item({
  title,
  period,
  place,
  children,
}: {
  title: string
  period: string
  place?: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative border-l-2 border-ink/70 pb-8 pl-6 last:pb-0">
      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-paper" />
      <h4 className="font-bold leading-snug">{title}</h4>
      <p className="mt-1 text-sm font-medium text-accent">{period}</p>
      {place && <p className="mt-1 text-sm italic text-ink/70">{place}</p>}
      {children}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle title="Experience" />
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <Heading>Professional Experience</Heading>
          {jobs.map((j) => (
            <Item key={j.role} title={j.role} period={j.period} place={j.company}>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
                {j.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Item>
          ))}
        </Reveal>

        <div className="space-y-12">
          <Reveal>
            <Heading>Education</Heading>
            <Item title={education.school} period={education.period} place={education.place}>
              <p className="mt-2 text-sm text-ink/80">{education.degree}</p>
            </Item>
          </Reveal>

          <Reveal>
            <Heading>Organization</Heading>
            {organizations.map((o) => (
              <Item key={o.role} title={o.role} period={o.period} place={o.place} />
            ))}
          </Reveal>

          <Reveal>
            <Heading>Achievements</Heading>
            {achievements.map((a) => (
              <Item key={a.title} title={a.title} period={a.period}>
                {a.note && <p className="mt-1 text-sm italic text-ink/70">{a.note}</p>}
              </Item>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
