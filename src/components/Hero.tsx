import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { LuCodeXml, LuUser } from 'react-icons/lu'
import type { IconType } from 'react-icons'
import { photos, profile } from '../data'
import { useTyped } from '../hooks/useTyped'

const photoStyle = [
  'h-[50svh] md:h-[74svh]',
  // second photo has extra headroom, so it is scaled up to keep both faces at the same height
  'h-[61svh] md:h-[90svh] -translate-x-[5%]',
]

type FloatProps = {
  href: string
  icon: IconType
  label: string
  className: string
  color: string
  duration: number
  external?: boolean
}

function FloatLink({ href, icon: Icon, label, className, color, duration, external }: FloatProps) {
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`pill absolute z-30 hover:!bg-white ${className}`}
      style={{ color, borderColor: color }}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.08 }}
    >
      <Icon size={18} />
      {label}
    </motion.a>
  )
}

export default function Hero() {
  const typed = useTyped(profile.roles)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), 4500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-30 mt-20 px-4 text-center md:mt-24"
      >
        <p className="text-xl font-light md:text-3xl">
          Hi There!<span className="mx-1 inline-block origin-[70%_70%] animate-[wave_2.2s_ease-in-out_infinite]">👋</span> I'm
        </p>
        <h1 className="text-2xl font-bold md:text-4xl">{profile.name}</h1>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-[25svh] z-10 px-4 text-center md:top-[24svh]">
        <span className="whitespace-nowrap text-[clamp(2.1rem,8.2vw,8rem)] font-bold leading-none">
          {typed}
          <span className="ml-1 inline-block w-[0.06em] animate-pulse bg-ink align-middle">&nbsp;</span>
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[100svh]">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-x-0 bottom-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          >
            <img
              src={photos[index]}
              alt={`${profile.name} portrait ${index + 1}`}
              className={`max-w-none object-contain object-bottom ${photoStyle[index] ?? photoStyle[0]}`}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <FloatLink
        href="#about"
        icon={LuUser}
        label="About"
        color="#16204f"
        duration={3.4}
        className="bottom-24 left-4 md:bottom-[14%] md:left-[13%]"
      />
      <FloatLink
        href="#skill"
        icon={LuCodeXml}
        label="Skill"
        color="#16204f"
        duration={4.1}
        className="bottom-12 left-2 md:bottom-[7%] md:left-[11%]"
      />

      <FloatLink
        href={profile.links.linkedin}
        external
        icon={FaLinkedin}
        label="LinkedIn"
        color="#1d4ed8"
        duration={3.8}
        className="bottom-36 right-3 md:bottom-[18%] md:right-[13%]"
      />
      <FloatLink
        href={profile.links.instagram}
        external
        icon={FaInstagram}
        label="Instagram"
        color="#dc2626"
        duration={4.4}
        className="bottom-24 right-2 md:bottom-[12%] md:right-[10%]"
      />
      <FloatLink
        href={profile.links.github}
        external
        icon={FaGithub}
        label="GitHub"
        color="#111827"
        duration={3.2}
        className="bottom-12 right-4 md:bottom-[6%] md:right-[14%]"
      />
    </section>
  )
}
