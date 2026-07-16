const words = [
  'Size-up',
  'Command',
  'Tactics',
  'SOPs',
  'Fireground strategy',
  'Leadership',
  'Oral board',
  'Hazmat',
  'MVA',
  'Incident command',
  'Readiness',
]

export default function Marquee() {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="display px-6 text-2xl text-gunmetal sm:text-3xl">{w}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-captain" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
