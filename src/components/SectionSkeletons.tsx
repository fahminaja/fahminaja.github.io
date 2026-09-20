import { Skeleton } from './Skeleton'

const wrap = 'mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28'

function Title() {
  return <Skeleton className="mb-10 h-10 w-48 md:mb-14 md:h-14 md:w-64" />
}

export function SkillsSkeleton() {
  return (
    <section id="skill" className={wrap} aria-busy="true" aria-label="Loading skills">
      <div className="rounded-[2rem] bg-ink p-6 md:p-10">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
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
      <div className="grid gap-14 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-32" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-8 h-8 w-48" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-4/5" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectsSkeleton() {
  return (
    <section id="project" className={wrap} aria-busy="true" aria-label="Loading projects">
      <Title />
      <div className="mb-8 flex gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-9 w-16" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl border-2 border-ink/20">
            <Skeleton className="aspect-[4/3] !rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ContactSkeleton() {
  return (
    <section id="contact" className={wrap} aria-busy="true" aria-label="Loading contact">
      <Title />
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[76px] !rounded-2xl" />
          ))}
        </div>
        <div className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
          <Skeleton className="h-12" />
          <Skeleton className="h-36" />
          <Skeleton className="h-12" />
        </div>
      </div>
    </section>
  )
}
