import { useEffect, useState } from 'react'

export function useTyped(words: string[], typeMs = 90, deleteMs = 50, pauseMs = 1400) {
  const [text, setText] = useState('')

  useEffect(() => {
    let word = 0
    let count = 0
    let deleting = false
    let timer = 0

    const tick = () => {
      const current = words[word]
      count += deleting ? -1 : 1
      setText(current.slice(0, count))

      let delay = deleting ? deleteMs : typeMs
      if (!deleting && count === current.length) {
        deleting = true
        delay = pauseMs
      } else if (deleting && count === 0) {
        deleting = false
        word = (word + 1) % words.length
        delay = 350
      }
      timer = window.setTimeout(tick, delay)
    }

    timer = window.setTimeout(tick, 600)
    return () => window.clearTimeout(timer)
  }, [words, typeMs, deleteMs, pauseMs])

  return text
}
