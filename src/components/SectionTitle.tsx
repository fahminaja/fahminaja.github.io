import Reveal from './Reveal'

type Props = { index: string; label: string; title: string; subtitle?: string }

export default function SectionTitle({ index, label, title, subtitle }: Props) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="label-mono">
        {index} / {label}
      </p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 max-w-2xl text-lg text-ink/60">{subtitle}</p>}
    </Reveal>
  )
}
