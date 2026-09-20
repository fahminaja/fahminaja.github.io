import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  SiCodeigniter,
  SiCss,
  SiDotnet,
  SiExpress,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiProgress,
  SiReact,
  SiSap,
  SiSelenium,
  SiSharp,
  SiTypescript,
  SiVuedotjs,
  SiYaml,
} from 'react-icons/si'
import { VscAzureDevops } from 'react-icons/vsc'
import { LuDatabase, LuDatabaseZap, LuWorkflow } from 'react-icons/lu'
import { skills } from '../data'
import Reveal from './Reveal'

const icons: Record<string, { icon: IconType; color: string }> = {
  React: { icon: SiReact, color: '#00b4d8' },
  'Vue.js': { icon: SiVuedotjs, color: '#4fc08d' },
  jQuery: { icon: SiJquery, color: '#0769ad' },
  'Kendo UI': { icon: SiProgress, color: '#3fa900' },
  '.NET / ASP.NET': { icon: SiDotnet, color: '#512bd4' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#111827' },
  Prisma: { icon: SiPrisma, color: '#2d3748' },
  CodeIgniter: { icon: SiCodeigniter, color: '#ee4323' },
  'SQL Server': { icon: LuDatabase, color: '#cc2927' },
  MySQL: { icon: SiMysql, color: '#4479a1' },
  'C#': { icon: SiSharp, color: '#68217a' },
  PHP: { icon: SiPhp, color: '#777bb4' },
  JavaScript: { icon: SiJavascript, color: '#e6c800' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  YAML: { icon: SiYaml, color: '#cb171e' },
  HTML5: { icon: SiHtml5, color: '#e34f26' },
  CSS3: { icon: SiCss, color: '#1572b6' },
  'SAP Tracker RPA': { icon: SiSap, color: '#0a8fd6' },
  'Power Automate': { icon: LuWorkflow, color: '#0066ff' },
  SSIS: { icon: LuDatabaseZap, color: '#cc2927' },
  Selenium: { icon: SiSelenium, color: '#43b02a' },
  GitLab: { icon: SiGitlab, color: '#fc6d26' },
  GitHub: { icon: SiGithub, color: '#181717' },
  'Azure DevOps': { icon: VscAzureDevops, color: '#0078d7' },
}

const tileNames: Record<string, string> = {
  SSIS: 'SQL Server Integration Services',
}

export default function Skills() {
  const [active, setActive] = useState('All')

  const all = useMemo(
    () => skills.flatMap((s) => s.items.map((name) => ({ name, category: s.title }))),
    [],
  )
  const visible = all.filter((s) => active === 'All' || s.category === active)
  const categories = ['All', ...skills.map((s) => s.title)]

  return (
    <section id="skill" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="rounded-[2rem] bg-ink p-6 text-paper md:p-10">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">Skill.</h2>
            <p className="mt-2 text-paper/60">{all.length} technologies I work with</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-colors ${
                  active === c
                    ? 'border-paper bg-paper text-ink'
                    : 'border-paper/30 text-paper/80 hover:border-paper/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => {
              const { icon: Icon, color } = icons[s.name]
              return (
                <motion.li
                  layout
                  key={s.name}
                  title={tileNames[s.name] ?? s.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.02 } }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6, borderColor: color, boxShadow: `0 14px 28px -14px ${color}` }}
                  style={{ borderColor: '#60a5fa' }}
                  className="flex h-32 cursor-default flex-col items-center justify-center gap-3 rounded-xl border-2 bg-paper px-2 text-center text-ink md:h-36"
                >
                  <Icon size={44} style={{ color }} />
                  <span className="text-xs font-bold leading-tight">{s.name}</span>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </Reveal>
    </section>
  )
}
