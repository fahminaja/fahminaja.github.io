import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { LuMenu, LuSearch, LuX } from 'react-icons/lu'
import { OPEN_PALETTE_EVENT } from './CommandPalette'
import ThemeToggle from './ThemeToggle'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skill', label: 'Skill' },
  { id: 'experience', label: 'Experience' },
  { id: 'project', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = ['home', 'about', 'skill', 'experience', 'project', 'highlights', 'contact']
const alias: Record<string, string> = { highlights: 'project' }

const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modKey, setModKey] = useState('Ctrl')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey('⌘')

    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const line = window.innerHeight * 0.45
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = alias[id] ?? id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-ink/10 bg-paper/80 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-3 md:px-8">
        <a href="#home" className="flex w-fit items-center gap-2.5" aria-label="Home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-[13px] font-bold tracking-tight text-paper">
            NF<span className="text-accent">.</span>
          </span>
          <span className="hidden font-semibold tracking-tight lg:block">Najakhul Fahmi</span>
        </a>

        <nav className="hidden items-center gap-0.5 rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur md:flex dark:bg-white/[0.04]">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === l.id ? 'text-ink' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-ink/[0.08]"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>
        <span className="md:hidden" />

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5 text-sm text-ink/60 transition-colors hover:text-ink md:inline-flex"
          >
            <LuSearch size={15} />
            Search
            <kbd className="rounded border border-ink/15 px-1.5 font-mono text-[10px]">{modKey} K</kbd>
          </button>
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 md:hidden"
          >
            <LuSearch size={17} />
          </button>
          <ThemeToggle />
          <button
            className="p-1 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <LuX size={26} /> : <LuMenu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 font-medium ${
                    active === l.id ? 'bg-ink text-paper' : ''
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
      />
    </header>
  )
}
