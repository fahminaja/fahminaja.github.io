import { LuBriefcase, LuGraduationCap, LuMapPin } from 'react-icons/lu'
import { education, profile } from '../data'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function About() {
  const years = new Date().getFullYear() - profile.careerStart

  const facts = [
    { icon: LuBriefcase, label: 'Experience', value: `${years}+ years` },
    { icon: LuGraduationCap, label: 'Education', value: `${education.school}, GPA 3.72` },
    { icon: LuMapPin, label: 'Location', value: profile.location },
  ]

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle title="About" />
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <h3 className="mb-4 text-2xl font-bold md:text-3xl">{profile.headline}</h3>
          <p className="text-lg leading-relaxed text-ink/80">{profile.summary}</p>
        </Reveal>
        <div className="grid gap-4 lg:col-span-2">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.1}>
              <div className="card flex items-center gap-4 !p-4">
                <f.icon size={26} className="shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink/60">{f.label}</p>
                  <p className="font-medium">{f.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
