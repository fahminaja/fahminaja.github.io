import { useEffect, useState, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { LuCodeXml, LuUser } from 'react-icons/lu'
import type { IconType } from 'react-icons'
import { photos, profile } from '../data'
import { useTyped } from '../hooks/useTyped'

const photoStyle = [
  'h-[46svh] md:h-[80svh]',
  // second photo has extra headroom, so it is scaled up to keep both faces at the same height
  'h-[56svh] md:h-[97svh] -translate-x-[5%]',
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
  const reduceMotion = useReducedMotion()

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const photoX = useTransform(mx, [-0.5, 0.5], [16, -16])
  const circleX = useTransform(mx, [-0.5, 0.5], [-26, 26])
  const circleY = useTransform(my, [-0.5, 0.5], [-18, 18])

  const onMove = (e: MouseEvent) => {
    if (reduceMotion) return
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const [photoReady, setPhotoReady] = useState(false)

  useEffect(() => {
    let alive = true
    photos.forEach((src, i) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        if (alive && i === 0) setPhotoReady(true)
      }
      img.src = src
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), 4500)
    return () => window.clearInterval(timer)
  }, [])

  // First word types on line 1, the rest continues on line 2.
  const [firstLine, ...restWords] = typed.split(' ')
  const lines = restWords.length ? [firstLine, restWords.join(' ')] : [firstLine, '']
  const caretLine = restWords.length ? 1 : 0

  // Accent color goes on the last word of the role being typed (resolved from its prefix).
  const activeRole = typed ? profile.roles.find((r) => r.startsWith(typed)) : undefined
  const accentLine = (activeRole ?? typed).split(' ').length - 1

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[100svh] w-[75%] md:w-[56%]">
        <div className="absolute inset-x-0 bottom-[6svh] flex justify-center">
          <motion.div style={{ x: circleX, y: circleY }}>
            <motion.div
              className="relative h-[60vw] w-[60vw] md:h-[62svh] md:w-[62svh]"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className={`absolute inset-0 rounded-full ${
                  photoReady
                    ? 'bg-gradient-to-br from-[#c3d4ff] via-[#d3f3ee] to-[#eafff4]'
                    : 'skeleton !rounded-full'
                }`}
              />
              <span className="absolute -inset-3 rounded-full border-2 border-ink/15 md:-inset-5" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="absolute inset-0" style={{ x: photoX }}>
          <AnimatePresence>
            {photoReady && (
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
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="relative z-30 flex min-h-[100svh] flex-col justify-start px-5 pt-24 md:ml-[50%] md:justify-center md:px-0 md:pb-[14svh] md:pr-[6%] md:pt-0">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xl font-light md:text-3xl">
            Hi There!
            <span className="mx-1 inline-block origin-[70%_70%] animate-[wave_2.2s_ease-in-out_infinite]">
              👋
            </span>{' '}
            I'm
          </p>
          <h1 className="text-2xl font-bold md:text-4xl">{profile.name}</h1>
        </motion.div>

        <div
          className="mt-4 text-[clamp(2.75rem,13vw,3.75rem)] font-bold leading-none md:mt-8 md:text-[clamp(3rem,7.2vw,8rem)]"
          aria-label={profile.roles.join(', ')}
        >
          {lines.map((text, i) => (
            <span
              key={i}
              className={`block min-h-[1.05em] whitespace-nowrap ${i === accentLine ? 'text-accent' : ''}`}
              aria-hidden="true"
            >
              {text}
              {i === caretLine && (
                <span className="ml-1 inline-block h-[0.85em] w-[0.06em] animate-pulse bg-current align-middle">
                  &nbsp;
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <FloatLink
        href="#about"
        icon={LuUser}
        label="About"
        color="#16204f"
        duration={3.4}
        className="bottom-[38%] right-3 md:bottom-[27%] md:right-[36%]"
      />
      <FloatLink
        href="#skill"
        icon={LuCodeXml}
        label="Skill"
        color="#16204f"
        duration={4.1}
        className="bottom-[30%] right-10 md:bottom-[16%] md:right-[29%]"
      />
      <FloatLink
        href={profile.links.linkedin}
        external
        icon={FaLinkedin}
        label="LinkedIn"
        color="#1d4ed8"
        duration={3.8}
        className="bottom-[22%] right-4 md:bottom-[29%] md:right-[13%]"
      />
      <FloatLink
        href={profile.links.instagram}
        external
        icon={FaInstagram}
        label="Instagram"
        color="#dc2626"
        duration={4.4}
        className="bottom-[14%] right-2 md:bottom-[19%] md:right-[7%]"
      />
      <FloatLink
        href={profile.links.github}
        external
        icon={FaGithub}
        label="GitHub"
        color="#111827"
        duration={3.2}
        className="bottom-[6%] right-8 md:bottom-[8%] md:right-[15%]"
      />
    </section>
  )
}
