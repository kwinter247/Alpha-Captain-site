import Reveal from './Reveal'

const lanes = [
  {
    tag: 'Lane 01 — Written',
    title: 'Study',
    body: 'Focused question sets built from department SOPs, policies, and promotional source material — with clear explanations behind every answer.',
    href: '#study',
  },
  {
    tag: 'Lane 02 — Tactical',
    title: 'Scenarios',
    body: 'Staged fire, MVA, hazmat, and command simulations. Read the scene, give your report, make the call.',
    href: '#scenarios',
  },
  {
    tag: 'Lane 03 — Voice',
    title: 'Oral Board',
    body: 'Vetted interview questions, spoken reps, and board-style review of structure, policy tie-in, and command presence.',
    href: '#oral-board',
  },
]

export default function Lanes() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      {/* Watermark emblem */}
      <img
        src="/img/emblem-mono-white.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 w-[34rem] -translate-y-1/2 opacity-[0.04]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="blip" />
            The system
          </p>
          <h2 className="display max-w-3xl text-4xl sm:text-5xl">
            One app. Three lanes. <span className="text-flare">Every rep counts.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {lanes.map((lane, i) => (
            <Reveal key={lane.title} delay={i * 0.12} className="h-full">
              <a
                href={lane.href}
                className="group flex h-full flex-col gap-4 bg-charcoal p-8 transition-colors hover:bg-gunmetal/60"
              >
                <p className="font-mono text-[0.68rem] tracking-[0.26em] uppercase text-silver/70">
                  {lane.tag}
                </p>
                <h3 className="display text-3xl transition-colors group-hover:text-flare">
                  {lane.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-silver">{lane.body}</p>
                <span className="mt-auto pt-4 font-mono text-[0.7rem] tracking-[0.24em] uppercase text-flare opacity-0 transition-opacity group-hover:opacity-100">
                  Go to lane →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
