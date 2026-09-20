import { useState, type FormEvent } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { LuCheck, LuCopy, LuMapPin, LuSend } from 'react-icons/lu'
import { profile } from '../data'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import Spotlight from './Spotlight'

const field =
  'w-full rounded-lg border border-ink/15 bg-white/70 px-4 py-2.5 outline-none transition placeholder:text-ink/35 focus:border-accent focus:ring-4 focus:ring-accent/15 dark:bg-white/[0.04]'

const socials = [
  { icon: FaLinkedin, href: profile.links.linkedin, label: 'LinkedIn' },
  { icon: FaInstagram, href: profile.links.instagram, label: 'Instagram' },
  { icon: FaGithub, href: profile.links.github, label: 'GitHub' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [copied, setCopied] = useState(false)

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle index="06" label="Contact" title="Contact" />

      <div className="grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#0b1020] p-7 text-white md:p-9">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative flex flex-1 flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open for freelance
              </span>

              <h3 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Let&apos;s build something together.
              </h3>
              <p className="mt-3 text-white/60">
                Have a project in mind or want to say hi? Send me a message.
              </p>

              <button
                onClick={copyEmail}
                className="group mt-8 flex w-full items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
                aria-label="Copy email address"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-white/40">
                    Email
                  </span>
                  <span className="block truncate font-mono text-sm">{profile.email}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-white/60 group-hover:text-white">
                  {copied ? (
                    <>
                      <LuCheck size={16} className="text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <LuCopy size={16} />
                      Copy
                    </>
                  )}
                </span>
              </button>

              <p className="mt-4 flex items-center gap-2 text-sm text-white/60">
                <LuMapPin size={16} />
                {profile.location}
              </p>

              <div className="mt-auto flex gap-3 pt-8">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-[#0b1020]"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-3">
          <Spotlight className="h-full" padding="p-6 md:p-9">
            <p className="label-mono">Send a message</p>
            <form onSubmit={submit} className="mt-5 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className={field}
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={set('name')}
                />
                <input
                  className={field}
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={set('email')}
                />
              </div>
              <input
                className={field}
                placeholder="Subject"
                required
                value={form.subject}
                onChange={set('subject')}
              />
              <textarea
                className={field}
                rows={6}
                placeholder="Message"
                required
                value={form.message}
                onChange={set('message')}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 font-semibold text-paper transition-colors hover:bg-accent"
              >
                <LuSend size={18} />
                Send Message
              </button>
            </form>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  )
}
