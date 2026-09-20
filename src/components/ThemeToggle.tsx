import { AnimatePresence, motion } from 'framer-motion'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border-2 border-ink/80 transition-colors hover:bg-ink hover:text-paper"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="absolute"
          initial={{ y: 16, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
