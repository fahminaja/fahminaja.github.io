import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  LuCalculator,
  LuChevronRight,
  LuFileText,
  LuMenu,
  LuScanLine,
  LuShieldCheck,
  LuShoppingCart,
  LuSparkles,
  LuTruck,
  LuZap,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'
import { eapc, highlights, rfid } from '../data'
import CountUp from './CountUp'
import Reveal from './Reveal'
import Rich from './Rich'
import SectionTitle from './SectionTitle'
import Spotlight from './Spotlight'

const keywords = [
  'Robot Process Automation (RPA)',
  'Microsoft Power Automate',
  'Goodscontrol',
  'Boxcontrol',
  'TPBExchange',
  '16 warehouse staff',
  'USD 447,754.86',
  '3 major vendors',
  '50+ vendors',
  '80% reduction',
  '82,000',
  'USD 500K',
  'BC 40',
  'BC 27',
  'RPA',
  'JASUKE',
  'PROMAG',
  'SAP',
  'ClickOnce',
  '18000',
  '32%',
  '45-60 second',
]

const meta: Record<string, { icon: IconType; tag: string; span?: string }> = {
  'Customs Audit Countermeasures / Logistic Management': {
    icon: LuShieldCheck,
    tag: 'Logistics',
    span: 'md:col-span-2',
  },
  'HR / GA': { icon: LuTruck, tag: 'HR / GA' },
  Purchasing: { icon: LuShoppingCart, tag: 'Purchasing' },
  Accounting: { icon: LuCalculator, tag: 'Accounting', span: 'md:col-span-2' },
}

const order = [
  'Customs Audit Countermeasures / Logistic Management',
  'HR / GA',
  'Purchasing',
  'Accounting',
]

function Points({ points }: { points: string[] }) {
  return (
    <ul className="space-y-3">
      {points.map((p) => (
        <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/70">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>
            <Rich text={p} keywords={keywords} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function Tile({
  value,
  label,
  className = '',
}: {
  value: ReactNode
  label: string
  className?: string
}) {
  return (
    <div className={`rounded-xl border border-ink/10 bg-paper/60 p-4 ${className}`}>
      <p className="text-2xl font-bold tracking-tight md:text-3xl">{value}</p>
      <p className="mt-1 text-xs leading-snug text-ink/60">{label}</p>
    </div>
  )
}

function Bar({
  label,
  value,
  width,
  accent,
}: {
  label: string
  value: string
  width: string
  accent?: boolean
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
        <span className="text-ink/60">{label}</span>
        <span className={accent ? 'font-semibold text-accent' : 'text-ink/60'}>{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className={`h-full rounded-full ${accent ? 'bg-accent' : 'bg-ink/30'}`}
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

/* ---------- E-APC flagship ---------- */

const before = ['Paper quotation', 'PIC quotation', 'Manager', 'GM', 'SGM', 'Manual SAP input']
const after = ['E-APC · web & mobile', 'PIC quotation', 'Manager', 'GM', 'SGM', 'RPA → SAP']

function Flow({ steps, variant }: { steps: string[]; variant: 'before' | 'after' }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((s, i) => {
        const edge = variant === 'after' && (i === 0 || i === steps.length - 1)
        const chip =
          variant === 'before'
            ? 'border border-dashed border-ink/25 text-ink/60'
            : edge
              ? 'border border-accent bg-accent font-semibold text-paper'
              : 'border border-accent/30 bg-accent/10 font-medium'
        return (
          <motion.li
            key={s}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.09 + (variant === 'after' ? 0.55 : 0) }}
          >
            <span className={`rounded-lg px-3 py-1.5 text-sm ${chip}`}>{s}</span>
            {i < steps.length - 1 && <LuChevronRight size={14} className="text-ink/30" />}
          </motion.li>
        )
      })}
    </ol>
  )
}

const statusChips = [
  { label: 'Drafted', cls: 'bg-slate-100 text-slate-500' },
  { label: 'Submitted', cls: 'bg-blue-100 text-blue-700' },
  { label: 'Waiting Approval', cls: 'bg-amber-100 text-amber-700' },
  { label: 'Approved', cls: 'bg-emerald-100 text-emerald-700' },
]

// Decorative illustration only; it deliberately contains no real data.
function EapcMock() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[440px] pb-12 pr-8">
      <div className="overflow-hidden rounded-xl border border-ink/15 bg-white shadow-2xl shadow-ink/20 [transform:perspective(1400px)_rotateY(-5deg)_rotateX(2deg)]">
        <div className="flex items-center gap-2 bg-[#1976d2] px-3 py-2.5 text-white">
          <LuMenu size={14} />
          <span className="text-sm font-bold tracking-widest">E-APC</span>
          <span className="ml-auto h-2 w-14 rounded bg-white/40" />
        </div>
        <div className="space-y-2.5 p-3">
          <div className="flex gap-2">
            <span className="h-2.5 w-16 rounded bg-[#1976d2]/25" />
            <span className="h-2.5 w-24 rounded bg-[#1976d2]/25" />
            <span className="h-2.5 w-12 rounded bg-[#1976d2]/25" />
          </div>
          {[0, 1, 2, 3, 2, 1].map((s, i) => (
            <div key={i} className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
              <span className="h-2 w-14 rounded bg-slate-200" />
              <span className="h-2 flex-1 rounded bg-slate-100" />
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${statusChips[s].cls}`}>
                {statusChips[s].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[128px] overflow-hidden rounded-[1.4rem] border-[6px] border-[#0b1020] bg-white shadow-2xl shadow-ink/30">
        <div className="bg-[#1976d2] px-2.5 py-2 text-[9px] font-bold tracking-widest text-white">
          E-APC
        </div>
        <div className="space-y-2 p-2.5">
          <span className="block h-2 w-3/4 rounded bg-slate-200" />
          <span className="block h-2 w-1/2 rounded bg-slate-100" />
          <span className="block h-8 rounded bg-slate-50" />
          <div className="flex gap-1.5">
            <span className="flex-1 rounded bg-emerald-500 py-1 text-center text-[8px] font-semibold text-white">
              Approve
            </span>
            <span className="flex-1 rounded bg-slate-200 py-1 text-center text-[8px] font-semibold text-slate-500">
              Reject
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Eapc() {
  return (
    <div id="eapc" className="scroll-mt-24 md:col-span-3">
      <Reveal>
        <Spotlight className="border-accent/40 ring-4 ring-accent/10" padding="p-6 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <LuSparkles size={14} />
                Flagship project
              </span>
              <h3 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">{eapc.name}</h3>
              <p className="mt-2 font-mono text-sm text-accent">{eapc.fullName}</p>
              <p className="mt-5 text-lg font-medium leading-snug">{eapc.summary}</p>
              <p className="mt-3 leading-relaxed text-ink/70">{eapc.description}</p>
              <div className="mt-6">
                <Points points={eapc.points} />
              </div>
            </div>
            <div className="flex items-center lg:col-span-2">
              <EapcMock />
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            <Tile value={<CountUp to={23.75} decimals={2} />} label="hours saved per day" />
            <Tile value={<CountUp to={2.97} decimals={2} />} label="FTE freed (full-time employee)" />
            <Tile
              value={<CountUp to={166.25} decimals={2} prefix="$" />}
              label="saved per day (USD)"
            />
            <Tile value={<CountUp to={73} />} label="sheets of paper less per day" />
            <Tile
              value={<CountUp to={150} suffix="+" />}
              label="global vendors"
              className="col-span-2 md:col-span-1"
            />
          </div>

          <div className="relative mt-4 grid gap-4 lg:grid-cols-5">
            <div className="space-y-4 rounded-xl border border-ink/10 bg-paper/60 p-4 md:p-6 lg:col-span-3">
              <div>
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink/40">
                  <LuFileText size={14} /> Before · paper &amp; manual
                </p>
                <Flow steps={before} variant="before" />
              </div>
              <div className="h-px bg-ink/10" />
              <div>
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                  <LuZap size={14} /> After · E-APC + RPA
                </p>
                <Flow steps={after} variant="after" />
              </div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-paper/60 p-4 md:p-6 lg:col-span-2">
              <div className="mb-4 flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
                  SAP input · per quotation
                </p>
                <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Estimate
                </span>
              </div>
              <div className="space-y-3">
                <Bar label="Manual" value="~5 min" width="100%" />
                <Bar label="RPA (ClickOnce)" value="~30 s" width="10%" accent />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight">
                ~10× <span className="text-sm font-medium text-ink/60">faster than manual entry</span>
              </p>
            </div>
          </div>
        </Spotlight>
      </Reveal>
    </div>
  )
}

/* ---------- RFID ---------- */

function RfidPanel({
  data,
  tiles,
}: {
  data: { name: string; description: string; points: string[] }
  tiles: ReactNode
}) {
  return (
    <div className="rounded-xl border border-ink/10 bg-paper/60 p-5 md:p-6">
      <p className="label-mono">{data.name}</p>
      <p className="mt-3 leading-relaxed text-ink/70">{data.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">{tiles}</div>
      <div className="mt-5">
        <Points points={data.points} />
      </div>
    </div>
  )
}

function Rfid() {
  return (
    <Reveal className="md:col-span-3">
      <Spotlight padding="p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
            <LuScanLine size={20} />
          </span>
          <span className="rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink/60">
            Warehouse
          </span>
        </div>
        <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight md:text-2xl">
          {rfid.title}
        </h3>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <RfidPanel
            data={rfid.goodscontrol}
            tiles={
              <>
                <Tile value={<CountUp to={16} prefix="−" />} label="warehouse staff less manpower" />
                <Tile
                  value={<CountUp to={50} suffix="+" />}
                  label="vendors, incl. 3 major vendors"
                />
                <Tile
                  className="col-span-2"
                  value={<CountUp to={447754.86} decimals={2} prefix="$" />}
                  label="total savings per year (USD)"
                />
              </>
            }
          />
          <RfidPanel
            data={rfid.boxcontrol}
            tiles={
              <>
                <Tile value={<CountUp to={80} suffix="%" />} label="reduction in potential box losses" />
                <Tile
                  value={<CountUp to={500} prefix="Up to $" suffix="K" />}
                  label="less penalty for lost boxes (USD)"
                />
                <Tile
                  className="col-span-2"
                  value={<CountUp to={82000} />}
                  label="vendor boxes in scope"
                />
              </>
            }
          />
        </div>
      </Spotlight>
    </Reveal>
  )
}

/* ---------- Other departments ---------- */

function CustomsVisual() {
  return (
    <div className="mt-6 rounded-xl border border-ink/10 bg-paper/60 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
          Gate In process · per document
        </p>
        <p className="text-right">
          <span className="text-2xl font-bold tracking-tight">
            <CountUp to={18000} suffix="+" />
          </span>
          <span className="ml-2 text-xs text-ink/60">pending documents</span>
        </p>
      </div>
      <div className="space-y-3">
        <Bar label="Manual" value="120 s" width="100%" />
        <Bar label="With RPA" value="45–60 s" width="46%" accent />
      </div>
    </div>
  )
}

function Metric() {
  return (
    <div className="mt-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">Up to</p>
      <p className="text-5xl font-bold tracking-tight text-accent">
        <CountUp to={32} suffix="%" />
      </p>
      <p className="mt-1 text-sm text-ink/60">less driver working hours</p>
    </div>
  )
}

export default function Highlights() {
  const items = order
    .map((title) => highlights.find((h) => h.title === title))
    .filter((h): h is (typeof highlights)[number] => Boolean(h))

  return (
    <section id="highlights" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle index="05" label="Impact" title="Work Highlights" />

      <div className="grid gap-4 md:grid-cols-3">
        <Eapc />
        <Rfid />

        {items.map((h, i) => {
          const m = meta[h.title]
          const Icon = m.icon
          return (
            <Reveal key={h.title} delay={(i % 3) * 0.06} className={`h-full ${m.span ?? ''}`}>
              <Spotlight className="h-full" padding="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={20} />
                  </span>
                  <span className="rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink/60">
                    {m.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight">{h.title}</h3>

                {h.title === 'HR / GA' && <Metric />}
                {h.title.startsWith('Customs') && <CustomsVisual />}

                <div className="mt-5">
                  <Points points={h.points} />
                </div>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
