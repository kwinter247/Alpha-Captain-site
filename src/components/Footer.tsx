export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-14 sm:px-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <img src="/img/emblem.webp" alt="" className="h-12 w-auto" />
          <img src="/img/wordmark.webp" alt="Alpha Captain" className="h-7 w-auto" />
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {[
            ['#study', 'Study'],
            ['#scenarios', 'Scenarios'],
            ['#oral-board', 'Oral Board'],
            ['#readiness', 'Readiness'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-silver/70 transition-colors hover:text-off"
            >
              {label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-silver/50">
          © {new Date().getFullYear()} Alpha Captain
        </p>
      </div>
    </footer>
  )
}
