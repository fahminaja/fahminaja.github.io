import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { profile } from '../data'

const socials = [
  { icon: FaLinkedin, href: profile.links.linkedin, label: 'LinkedIn' },
  { icon: FaInstagram, href: profile.links.instagram, label: 'Instagram' },
  { icon: FaGithub, href: profile.links.github, label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-5 py-12 text-center">
      <h3 className="text-2xl font-bold tracking-tight">{profile.name}</h3>
      <p className="mt-2 text-ink/70">{profile.tagline}</p>
      <div className="mt-5 flex justify-center gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="rounded-full border border-ink/15 p-2.5 transition-colors hover:bg-ink hover:text-paper"
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>
    </footer>
  )
}
