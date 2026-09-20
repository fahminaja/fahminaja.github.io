import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'
import {
  ContactSkeleton,
  ExperienceSkeleton,
  ProjectsSkeleton,
  SkillsSkeleton,
} from './components/SectionSkeletons'

const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<SkillsSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
