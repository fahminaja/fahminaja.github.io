import { useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  LuAward,
  LuBriefcase,
  LuBuilding2,
  LuChevronDown,
  LuGraduationCap,
  LuTrophy,
  LuUsers,
} from 'react-icons/lu'
import { achievements, education, jobs, organizations } from '../data'
import Reveal from './Reveal'
import Rich from './Rich'
import SectionTitle from './SectionTitle'
import Spotlight from './Spotlight'

const keywords = [
  'requirement gathering',
  'CI/CD',
  'AWS',
  'Clean Code',
  'Odoo',
  'EC2',
  'ECS',
  'Docker',
  'EFS',
  'S3',
  'Lambda',
  'Load Balancer',
  'Auto Scaling',
  'code reviews',
  'Xamarin',
]

const tabs = [
  { id: 'work', label: 'Work', icon: LuBriefcase },
  { id: 'education', label: 'Education', icon: LuGraduationCap },
  { id: 'organization', label: 'Organization', icon: LuUsers },
  { id: 'achievements', label: 'Achievements', icon: LuTrophy },
] as const

type TabId = (typeof tabs)[number]['id']

function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={ref} className="relative pl-8 md:pl-10">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-ink/10" />
      <motion.div
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
      />
      {children}
    </div>
  )
}

function TimelineItem({ children }: { children: ReactNode }) {
  return (
    <div className="relative pb-5 last:pb-0">
      <span className="absolute -left-8 top-8 h-3.5 w-3.5 rounded-full border-2 border-accent bg-paper md:-left-10" />
      {children}
    </div>
  )
}

function Period({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-ink/10 px-2 py-1 font-mono text-xs">{children}</span>
  )
}

function Points({ points }: { points: string[] }) {
  return (
    <>
      {points.map((p) => (
        <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/70 md:text-[15px]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>
            <Rich text={p} keywords={keywords} />
          </span>
        </li>
      ))}
    </>
  )
}

function JobCard({ job }: { job: (typeof jobs)[number] }) {
  const [open, setOpen] = useState(false)
  const limit = 3
  const head = job.points.slice(0, limit)
  const rest = job.points.slice(limit)
  const current = /present/i.test(job.period)

  return (
    <Spotlight padding="p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">{job.role}</h3>
          <p className="mt-1.5 flex items-center gap-2 text-sm text-ink/60">
            <LuBuilding2 size={16} className="shrink-0" />
            {job.company}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Period>{job.period}</Period>
          {current && (
            <span className="rounded-md bg-emerald-500/10 px-2 py-1 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Current
            </span>
          )}
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        <Points points={head} />
      </ul>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 space-y-3 overflow-hidden"
          >
            <Points points={rest} />
          </motion.ul>
        )}
      </AnimatePresence>

      {rest.length > 0 && (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-ink/5"
        >
          {open ? 'Show less' : `Show ${rest.length} more highlights`}
          <LuChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
    </Spotlight>
  )
}

function WorkTab() {
  return (
    <Timeline>
      {jobs.map((j) => (
        <TimelineItem key={j.role}>
          <JobCard job={j} />
        </TimelineItem>
      ))}
    </Timeline>
  )
}

function EducationTab() {
  return (
    <Spotlight padding="p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
          <LuGraduationCap size={24} />
        </span>
        <div>
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">{education.school}</h3>
          <p className="mt-1.5 text-ink/70">{education.degree}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Period>{education.period}</Period>
            <span className="text-sm italic text-ink/60">{education.place}</span>
          </div>
        </div>
      </div>
    </Spotlight>
  )
}

function OrganizationTab() {
  return (
    <Timeline>
      {organizations.map((o) => (
        <TimelineItem key={o.role}>
          <Spotlight padding="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-bold leading-snug tracking-tight">{o.role}</h3>
              <Period>{o.period}</Period>
            </div>
            <p className="mt-2 text-sm italic text-ink/60">{o.place}</p>
          </Spotlight>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

function AchievementsTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {achievements.map((a, i) => (
        <Spotlight key={a.title} padding="p-6 md:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
            {i === 0 ? <LuTrophy size={22} /> : <LuAward size={22} />}
          </span>
          <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight">{a.title}</h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Period>{a.period}</Period>
            {a.note && <span className="text-sm italic text-ink/60">{a.note}</span>}
          </div>
        </Spotlight>
      ))}
    </div>
  )
}

const panels: Record<TabId, () => ReactNode> = {
  work: () => <WorkTab />,
  education: () => <EducationTab />,
  organization: () => <OrganizationTab />,
  achievements: () => <AchievementsTab />,
}

export default function Experience() {
  const [tab, setTab] = useState<TabId>('work')

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle index="03" label="Experience" title="Experience" />

      <Reveal className="mb-8">
        <div
          role="tablist"
          className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl border border-ink/10 bg-white/60 p-1 dark:bg-white/[0.04]"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'text-paper' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="exp-tab"
                  className="absolute inset-0 rounded-lg bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <t.icon size={16} className="relative" />
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          role="tabpanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {panels[tab]()}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
