import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import {
  LuBriefcase,
  LuCodeXml,
  LuCopy,
  LuCornerDownLeft,
  LuFolderOpen,
  LuHouse,
  LuMoon,
  LuSearch,
  LuSend,
  LuSparkles,
  LuSun,
  LuUser,
} from 'react-icons/lu'
import { profile } from '../data'
import { useTheme } from '../hooks/useTheme'

type Item = { id: string; label: string; group: string; icon: IconType; run: () => void }

export const OPEN_PALETTE_EVENT = 'open-palette'

const goTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const openLink = (href: string) => window.open(href, '_blank', 'noreferrer')

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, toggle } = useTheme()

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  const items: Item[] = useMemo(
    () => [
      { id: 'home', label: 'Home', group: 'Navigate', icon: LuHouse, run: () => goTo('home') },
      { id: 'about', label: 'About', group: 'Navigate', icon: LuUser, run: () => goTo('about') },
      { id: 'skill', label: 'Skill', group: 'Navigate', icon: LuCodeXml, run: () => goTo('skill') },
      {
        id: 'experience',
        label: 'Experience',
        group: 'Navigate',
        icon: LuBriefcase,
        run: () => goTo('experience'),
      },
      {
        id: 'project',
        label: 'Projects',
        group: 'Navigate',
        icon: LuFolderOpen,
        run: () => goTo('project'),
      },
      {
        id: 'highlights',
        label: 'Work Highlights',
        group: 'Navigate',
        icon: LuSparkles,
        run: () => goTo('highlights'),
      },
      {
        id: 'eapc',
        label: 'E-APC (flagship project)',
        group: 'Navigate',
        icon: LuSparkles,
        run: () => goTo('eapc'),
      },
      { id: 'contact', label: 'Contact', group: 'Navigate', icon: LuSend, run: () => goTo('contact') },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        group: 'Actions',
        icon: theme === 'dark' ? LuSun : LuMoon,
        run: toggle,
      },
      {
        id: 'copy',
        label: 'Copy email address',
        group: 'Actions',
        icon: LuCopy,
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
      {
        id: 'mail',
        label: 'Send an email',
        group: 'Actions',
        icon: LuSend,
        run: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        group: 'Links',
        icon: FaLinkedin,
        run: () => openLink(profile.links.linkedin),
      },
      {
        id: 'github',
        label: 'GitHub',
        group: 'Links',
        icon: FaGithub,
        run: () => openLink(profile.links.github),
      },
      {
        id: 'instagram',
        label: 'Instagram',
        group: 'Links',
        icon: FaInstagram,
        run: () => openLink(profile.links.instagram),
      },
    ],
    [theme, toggle],
  )

  const results = items.filter((i) =>
    `${i.label} ${i.group}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const run = (item?: Item) => {
    if (!item) return
    close()
    window.setTimeout(item.run, 80)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (results.length ? (a + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[active])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-ink/15 bg-paper shadow-2xl"
            initial={{ y: -12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -12, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4">
              <LuSearch size={18} className="text-ink/50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                placeholder="Search sections and actions…"
                className="h-14 w-full bg-transparent outline-none placeholder:text-ink/40"
                aria-label="Search"
              />
              <kbd className="rounded border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] text-ink/50">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-ink/50">No results</li>
              )}
              {results.map((item, i) => (
                <li key={item.id}>
                  {(i === 0 || results[i - 1].group !== item.group) && (
                    <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-ink/40">
                      {item.group}
                    </p>
                  )}
                  <button
                    onClick={() => run(item)}
                    onMouseMove={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? 'bg-ink/[0.07]' : ''
                    }`}
                  >
                    <item.icon size={17} className="shrink-0 text-ink/60" />
                    <span className="flex-1">{item.label}</span>
                    {i === active && <LuCornerDownLeft size={15} className="text-ink/40" />}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-ink/10 px-4 py-2.5 font-mono text-[11px] text-ink/40">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
