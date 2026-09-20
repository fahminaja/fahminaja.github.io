import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuChevronLeft, LuChevronRight, LuMaximize2, LuX } from 'react-icons/lu'
import { highlights, projects, type Project } from '../data'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { SkeletonImage } from './Skeleton'

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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-3 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="relative grid max-h-full w-full max-w-6xl overflow-y-auto rounded-2xl border-2 border-ink bg-paper lg:grid-cols-5"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full border-2 border-ink bg-paper p-1.5"
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
                  className="absolute left-0 rounded-full border-2 border-ink bg-paper/90 p-1.5"
                >
                  <LuChevronLeft size={20} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-0 rounded-full border-2 border-ink bg-paper/90 p-1.5"
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
          <h3 className="pr-8 text-2xl font-bold">{project.title}</h3>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="font-bold">Category:</dt>
              <dd>{project.category}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-bold">Client:</dt>
              <dd>{project.client}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-bold">Project date:</dt>
              <dd>{project.date}</dd>
            </div>
          </dl>
          <p className="mt-5 leading-relaxed text-ink/80">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const closeModal = useCallback(() => setSelected(null), [])

  const visible = projects.filter((p) => filter === 'All' || p.type === filter)

  return (
    <section id="project" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle
        title="Project"
        subtitle="Here are some projects that I have worked on. Some of these projects are confidential, so I can only describe them in general terms."
      />

      <Reveal className="mb-8 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`pill ${f === filter ? '!bg-ink !text-paper' : 'hover:!bg-white'}`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelected(p)}
              className="group overflow-hidden rounded-2xl border-2 border-ink bg-white/60 text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                <SkeletonImage
                  src={p.cover}
                  alt={p.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full border-2 border-ink bg-paper p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <LuMaximize2 size={16} />
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">{p.type}</p>
                <h3 className="mt-1 text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{p.client}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-20">
        <Reveal>
          <h3 className="mb-8 text-2xl font-bold md:text-3xl">Work Highlights</h3>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={(i % 2) * 0.1}>
              <div className="card h-full">
                <h4 className="mb-3 text-lg font-bold">{h.title}</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
                  {h.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}
