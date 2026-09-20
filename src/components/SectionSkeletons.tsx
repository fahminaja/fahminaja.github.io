import { Skeleton } from './Skeleton'

const wrap = 'mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28'
const card = '!rounded-2xl'

function Title() {
  return (
    <div className="mb-10 space-y-4 md:mb-14">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-10 w-56 md:h-14 md:w-72" />
    </div>
  )
}

export function AboutSkeleton() {
  return (
    <section id="about" className={wrap} aria-busy="true" aria-label="Loading about">
      <Title />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <Skeleton className={`col-span-2 h-72 md:row-span-2 md:h-auto ${card}`} />
        <Skeleton className={`h-36 ${card}`} />
        <Skeleton className={`h-36 ${card}`} />
        <Skeleton className={`h-36 ${card}`} />
        <Skeleton className={`h-36 ${card}`} />
        <Skeleton className={`col-span-2 h-40 ${card}`} />
        <Skeleton className={`col-span-2 h-40 ${card}`} />
      </div>
    </section>
  )
}

export function SkillsSkeleton() {
  return (
    <section id="skill" className={wrap} aria-busy="true" aria-label="Loading skills">
      <div className="rounded-[2rem] bg-panel p-6 dark:ring-1 dark:ring-white/10 md:p-10">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Skeleton dark className="h-3 w-20" />
            <Skeleton dark className="h-10 w-40 md:h-12" />
            <Skeleton dark className="h-4 w-56" />
          </div>
          <div className="flex gap-2">
            {['w-12', 'w-20', 'w-16', 'w-20'].map((w, i) => (
              <Skeleton key={i} dark className={`h-8 ${w}`} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {Array.from({ length: 25 }).map((_, i) => (
            <Skeleton key={i} dark className="h-32 !rounded-xl md:h-36" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExperienceSkeleton() {
  return (
    <section id="experience" className={wrap} aria-busy="true" aria-label="Loading experience">
      <Title />
      <Skeleton className="mb-8 h-11 w-full max-w-md !rounded-xl" />
      <div className="space-y-5 pl-8 md:pl-10">
        <Skeleton className={`h-96 ${card}`} />
        <Skeleton className={`h-40 ${card}`} />
      </div>
    </section>
  )
}

export function ProjectsSkeleton() {
  return (
    <section id="project" className={wrap} aria-busy="true" aria-label="Loading projects">
      <Title />
      <div className="mb-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-9 w-20" />
        ))}
      </div>
      <div className="space-y-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid overflow-hidden rounded-2xl border border-ink/10 lg:grid-cols-2">
            <div className="space-y-4 p-7 md:p-10">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-64 !rounded-none lg:h-auto" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function HighlightsSkeleton() {
  return (
    <section id="highlights" className={wrap} aria-busy="true" aria-label="Loading highlights">
      <Title />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className={`h-[900px] md:col-span-3 md:h-[760px] ${card}`} />
        <Skeleton className={`h-[620px] md:col-span-3 md:h-[460px] ${card}`} />
        <Skeleton className={`h-80 md:col-span-2 ${card}`} />
        <Skeleton className={`h-80 ${card}`} />
        <Skeleton className={`h-64 ${card}`} />
        <Skeleton className={`h-64 md:col-span-2 ${card}`} />
      </div>
    </section>
  )
}

export function ContactSkeleton() {
  return (
    <section id="contact" className={wrap} aria-busy="true" aria-label="Loading contact">
      <Title />
      <div className="grid gap-4 lg:grid-cols-5">
        <Skeleton className={`h-96 lg:col-span-2 ${card}`} />
        <div className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
          <Skeleton className="h-12" />
          <Skeleton className="h-40" />
          <Skeleton className="h-12" />
        </div>
      </div>
    </section>
  )
}
