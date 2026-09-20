import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const root = document.documentElement

const getTheme = (): Theme => (root.classList.contains('dark') ? 'dark' : 'light')

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(root, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function syncMeta() {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', getTheme() === 'dark' ? '#090d1f' : '#f5fffa')
}

syncMeta()

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme)

  const toggle = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    root.classList.toggle('dark', next === 'dark')
    syncMeta()
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage can be blocked; the choice just won't persist
    }
  }, [])

  return { theme, toggle }
}
