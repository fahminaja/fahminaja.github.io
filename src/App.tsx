import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import {
  AboutSkeleton,
  ContactSkeleton,
  ExperienceSkeleton,
  HighlightsSkeleton,
  ProjectsSkeleton,
  SkillsSkeleton,
} from './components/SectionSkeletons'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Highlights = lazy(() => import('./components/Highlights'))
const Contact = lazy(() => import('./components/Contact'))

export default function App() {
  return (
    <>
      <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-0 -z-10" />
      <Navbar />
      <CommandPalette />
      <main>
        <Hero />
        <Suspense fallback={<AboutSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SkillsSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<HighlightsSkeleton />}>
          <Highlights />
        </Suspense>
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
