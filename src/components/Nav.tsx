import { useEffect, useState } from 'react'

const links = [
  { href: '#study', label: 'Study' },
  { href: '#scenarios', label: 'Scenarios' },
  { href: '#oral-board', label: 'Oral Board' },
  { href: '#readiness', label: 'Readiness' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-white/10 bg-ink/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Alpha Captain — home" className="flex items-center gap-3">
          <img src="/img/lockup-horizontal.webp" alt="Alpha Captain" className="h-8 w-auto" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-silver transition-colors hover:text-off"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#get-ready"
          className="border border-captain bg-captain/20 px-4 py-2 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-off transition-colors hover:bg-captain"
        >
          Start Prep
        </a>
      </nav>
    </header>
  )
}
