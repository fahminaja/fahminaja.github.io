import { useState, type FormEvent } from 'react'
import { LuMail, LuMapPin, LuSend } from 'react-icons/lu'
import { FaLinkedin } from 'react-icons/fa6'
import { profile } from '../data'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

const field =
  'w-full rounded-lg border-2 border-ink/80 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none transition-colors placeholder:text-ink/40 focus:border-accent'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const info = [
    { icon: LuMapPin, label: 'Location', value: profile.location, href: undefined },
    { icon: LuMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'fahminaja', href: profile.links.linkedin },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle title="Contact" subtitle="Have a project in mind or want to say hi? Send me a message." />
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="grid content-start gap-4 lg:col-span-2">
          {info.map((i, n) => (
            <Reveal key={i.label} delay={n * 0.1}>
              <div className="card flex items-center gap-4 !p-4">
                <i.icon size={24} className="shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-ink/60">{i.label}</p>
                  {i.href ? (
                    <a
                      href={i.href}
                      target={i.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="break-all font-medium hover:text-accent"
                    >
                      {i.value}
                    </a>
                  ) : (
                    <p className="font-medium">{i.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-span-3">
          <form onSubmit={submit} className="grid gap-4">
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
              rows={5}
              placeholder="Message"
              required
              value={form.message}
              onChange={set('message')}
            />
            <button
              type="submit"
              className="pill justify-center !bg-ink !px-6 !py-3 !text-base !text-paper hover:!bg-accent hover:!border-accent"
            >
              <LuSend size={18} />
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
