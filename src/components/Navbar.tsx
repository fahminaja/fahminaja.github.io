import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuMenu, LuX } from 'react-icons/lu'
import { profile } from '../data'
import ThemeToggle from './ThemeToggle'

const links = [
  { id: 'home', label: 'Home.' },
  { id: 'experience', label: 'Experience.' },
  { id: 'project', label: 'Project.' },
  { id: 'contact', label: 'Contact.' },
]

const sectionIds = ['home', 'about', 'skill', 'experience', 'project', 'contact']

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-paper/85 shadow-sm backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <a
          href="#home"
          className="border border-ink/70 px-2 py-3 font-serif text-[11px] leading-none tracking-tight"
        >
          {profile.logo}.
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`border-b-2 pb-0.5 text-sm font-medium transition-colors ${
                active === l.id
                  ? 'border-accent text-accent'
                  : 'border-transparent hover:text-accent'
              }`}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-1"
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
                  className={`rounded-lg px-3 py-2 font-medium ${
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
    </header>
  )
}
