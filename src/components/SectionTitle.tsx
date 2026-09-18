import Reveal from './Reveal'

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <h2 className="text-3xl font-bold md:text-5xl">{title}.</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-ink/70">{subtitle}</p>}
    </Reveal>
  )
}
