import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowUpRight, LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu'
import { projects, type Project } from '../data'
import SectionTitle from './SectionTitle'
import { SkeletonImage } from './Skeleton'
import Spotlight from './Spotlight'

const filters = ['All', 'Web', 'Mobile'] as const

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [slide, setSlide] = useState(0)
  const total = project.images.length

  const go = useCallback((d: number) => setSlide((s) => (s + d + total) % total), [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [go, onClose])

  const isMobile = project.type === 'Mobile'

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="relative grid max-h-full w-full max-w-6xl overflow-y-auto rounded-2xl border border-ink/20 bg-paper lg:grid-cols-5"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full border border-ink/20 bg-paper p-1.5 transition-colors hover:bg-ink/5"
        >
          <LuX size={18} />
        </button>

        <div className="relative flex flex-col bg-ink/5 p-4 lg:col-span-3">
          <div className="relative flex min-h-[260px] flex-1 items-center justify-center md:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <SkeletonImage
                  src={project.images[slide]}
                  alt={`${project.title} screenshot ${slide + 1}`}
                  className={`max-w-full rounded-lg object-contain ${
                    isMobile ? 'max-h-[60vh]' : 'max-h-[55vh]'
                  }`}
                  placeholderClassName={
                    isMobile ? 'h-[50vh] w-56' : 'h-[40vh] w-[min(70vw,520px)]'
                  }
                />
              </motion.div>
            </AnimatePresence>
            {total > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-0 rounded-full border border-ink/20 bg-paper/90 p-1.5"
                >
                  <LuChevronLeft size={20} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-0 rounded-full border border-ink/20 bg-paper/90 p-1.5"
                >
                  <LuChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <div className="mt-3 flex justify-center gap-1.5">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? 'w-6 bg-ink' : 'w-2 bg-ink/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 lg:col-span-2 lg:p-8">
          <p className="label-mono">{project.type}</p>
          <h3 className="mt-2 pr-8 text-2xl font-bold tracking-tight">{project.title}</h3>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold">Category:</dt>
              <dd className="text-ink/70">{project.category}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold">Client:</dt>
              <dd className="text-ink/70">{project.client}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold">Project date:</dt>
              <dd className="font-mono text-ink/70">{project.date}</dd>
            </div>
          </dl>
          <p className="mt-5 leading-relaxed text-ink/70">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function BrowserFrame({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <div
      className={`w-full max-w-[540px] transition-transform duration-500 ${
        flip
          ? '[transform:perspective(1400px)_rotateY(6deg)_rotateX(3deg)] group-hover:[transform:perspective(1400px)_rotateY(2deg)_rotateX(1deg)_scale(1.03)]'
          : '[transform:perspective(1400px)_rotateY(-6deg)_rotateX(3deg)] group-hover:[transform:perspective(1400px)_rotateY(-2deg)_rotateX(1deg)_scale(1.03)]'
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-ink/15 bg-white shadow-2xl shadow-ink/20">
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-slate-100 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate rounded bg-white px-2 py-0.5 font-mono text-[10px] text-slate-500">
            {project.category}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <SkeletonImage
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}

function PhoneFrame({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <div
      className={`w-[210px] transition-transform duration-500 ${
        flip
          ? '[transform:perspective(1400px)_rotateY(8deg)] group-hover:[transform:perspective(1400px)_rotateY(2deg)_scale(1.04)]'
          : '[transform:perspective(1400px)_rotateY(-8deg)] group-hover:[transform:perspective(1400px)_rotateY(-2deg)_scale(1.04)]'
      }`}
    >
      <div className="overflow-hidden rounded-[2.2rem] border-[9px] border-[#0b1020] bg-[#0b1020] shadow-2xl shadow-ink/30">
        <div className="relative aspect-[9/17] rounded-[1.5rem]">
          <SkeletonImage
            src={project.cover}
            alt={project.title}
            className="h-full w-full rounded-[1.5rem] object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1

  return (
    <Spotlight
      onClick={onOpen}
      label={`Open ${project.title} gallery`}
      className="group"
      padding="p-0"
    >
      <div className="grid lg:grid-cols-2">
        <div
          className={`flex flex-col justify-between gap-8 p-7 md:p-10 ${flip ? 'lg:order-2' : ''}`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ink/40">{String(index + 1).padStart(2, '0')}</span>
              <span className="rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                {project.type}
              </span>
            </div>
            <h3 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
            <p className="mt-2 text-sm text-ink/60">
              {project.client} · <span className="font-mono">{project.date}</span>
            </p>
            <p className="mt-5 line-clamp-4 leading-relaxed text-ink/70">{project.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-ink/50">{project.images.length} screenshots</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              View gallery
              <LuArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>

        <div
          className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-accent/10 via-transparent to-ink/5 p-8 md:p-12 ${
            flip ? 'lg:order-1' : ''
          }`}
        >
          {project.type === 'Mobile' ? (
            <PhoneFrame project={project} flip={flip} />
          ) : (
            <BrowserFrame project={project} flip={flip} />
          )}
        </div>
      </div>
    </Spotlight>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const closeModal = useCallback(() => setSelected(null), [])

  const visible = projects.filter((p) => filter === 'All' || p.type === filter)
  const count = (f: (typeof filters)[number]) =>
    f === 'All' ? projects.length : projects.filter((p) => p.type === f).length

  return (
    <section id="project" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle
        index="04"
        label="Projects"
        title="Project"
        subtitle="Here are some projects that I have worked on. Some of these projects are confidential, so I can only describe them in general terms."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              f === filter ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:bg-ink/5'
            }`}
          >
            {f}
            <span className="ml-1.5 font-mono text-xs opacity-60">{count(f)}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ProjectCard project={p} index={i} onOpen={() => setSelected(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}
