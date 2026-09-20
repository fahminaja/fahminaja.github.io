import { LuArrowRight, LuGraduationCap, LuMapPin, LuSparkles, LuTrophy } from 'react-icons/lu'
import { achievements, education, profile } from '../data'
import CountUp from './CountUp'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import Spotlight from './Spotlight'

type StatProps = {
  eyebrow?: string
  value: React.ReactNode
  label: string
  delay?: number
}

function Stat({ eyebrow, value, label, delay }: StatProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <Spotlight className="h-full" padding="p-5 md:p-6">
        <div className="flex h-full flex-col justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
            {eyebrow ?? ' '}
          </p>
          <div>
            <p className="text-4xl font-bold tracking-tight md:text-5xl">{value}</p>
            <p className="mt-2 text-sm leading-snug text-ink/60">{label}</p>
          </div>
        </div>
      </Spotlight>
    </Reveal>
  )
}

export default function About() {
  const years = new Date().getFullYear() - profile.careerStart

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle index="01" label="About" title="About" />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <Reveal className="col-span-2 md:row-span-2">
          <Spotlight className="h-full" padding="p-7 md:p-10">
            <p className="label-mono">Introduction</p>
            <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {profile.headline}
            </h3>
            <p className="mt-5 leading-relaxed text-ink/70 md:text-lg">{profile.summary}</p>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.05} className="h-full">
          <Spotlight className="h-full" padding="p-5 md:p-6">
            <div className="flex h-full flex-col justify-between gap-6">
              <span className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 md:px-3 md:text-xs dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open for freelance
              </span>
              <div>
                <LuMapPin size={20} className="text-accent" />
                <p className="mt-2 text-sm leading-snug text-ink/60">Based in</p>
                <p className="font-semibold">{profile.location}</p>
              </div>
            </div>
          </Spotlight>
        </Reveal>

        <Stat
          delay={0.1}
          eyebrow="Experience"
          value={<CountUp to={years} suffix="+" />}
          label="Years of professional experience"
        />
        <Stat
          delay={0.15}
          eyebrow="Automation"
          value={<CountUp to={18000} suffix="+" />}
          label="Pending customs documents handled by an RPA robot"
        />
        <Stat
          delay={0.2}
          eyebrow="Up to"
          value={<CountUp to={32} suffix="%" />}
          label="Less driver working hours with the JASUKE application"
        />
        <Reveal className="col-span-2 md:col-span-4">
          <Spotlight
            className="border-accent/40"
            padding="p-5 md:p-6"
            onClick={() => document.getElementById('eapc')?.scrollIntoView({ behavior: 'smooth' })}
            label="See the E-APC flagship project"
          >
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
                  <LuSparkles size={22} />
                </span>
                <div>
                  <p className="label-mono">Flagship · E-APC</p>
                  <p className="mt-1 font-semibold">
                    Paperless price change approval, posted to SAP by RPA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-right">
                  <span className="text-3xl font-bold tracking-tight md:text-4xl">
                    <CountUp to={166.25} decimals={2} prefix="$" />
                  </span>
                  <span className="ml-2 text-sm text-ink/60">saved per day</span>
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  See the case <LuArrowRight size={16} />
                </span>
              </div>
            </div>
          </Spotlight>
        </Reveal>


        <Reveal className="col-span-2">
          <Spotlight className="h-full" padding="p-6 md:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <LuGraduationCap size={22} />
              </span>
              <div>
                <p className="label-mono">Education</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">{education.school}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{education.degree}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="rounded-md border border-ink/10 px-2 py-1">{education.period}</span>
                  <span className="rounded-md bg-accent/10 px-2 py-1 font-semibold text-accent">
                    GPA <CountUp to={3.72} decimals={2} />
                  </span>
                </div>
              </div>
            </div>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.05} className="col-span-2">
          <Spotlight className="h-full" padding="p-6 md:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
                <LuTrophy size={22} />
              </span>
              <div>
                <p className="label-mono">Achievements</p>
                <ul className="mt-2 space-y-3">
                  {achievements.map((a) => (
                    <li key={a.title} className="text-sm leading-relaxed">
                      <span className="font-medium">{a.title}</span>
                      <span className="ml-2 font-mono text-xs text-ink/50">{a.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  )
}
