const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Renders text with the given keywords emphasised; the text itself is never changed.
export default function Rich({ text, keywords }: { text: string; keywords: string[] }) {
  if (!keywords.length) return <>{text}</>
  const sorted = [...keywords].sort((a, b) => b.length - a.length)
  const parts = text.split(new RegExp(`(${sorted.map(escape).join('|')})`, 'g'))

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}
