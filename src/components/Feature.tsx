import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Reveal from './Reveal'

export type FeatureProps = {
  id: string
  eyebrow: string
  title: React.ReactNode
  body: string
  points: string[]
  bg: string
  bgPosition?: string
  /** Extra darkening for busy backgrounds (0–1). */
  screen?: number
  phones: { src: string; alt: string }[]
  flip?: boolean
}

export default function Feature({
  id,
  eyebrow,
  title,
  body,
  points,
  bg,
  bgPosition = 'center',
  screen = 0.78,
  phones,
  flip = false,
}: FeatureProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', reduced ? '-8%' : '8%'])

  return (
    <section ref={ref} id={id} className="relative overflow-hidden py-24 sm:py-32">
      {/* Treated image background */}
      <motion.div aria-hidden className="absolute -inset-y-16 inset-x-0" style={{ y: bgY }}>
        <img src={bg} alt="" className="h-full w-full object-cover" style={{ objectPosition: bgPosition }} loading="lazy" />
      </motion.div>
      <div aria-hidden className="absolute inset-0" style={{ background: `rgba(5,5,5,${screen})` }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

      <div
        className={`relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-14 px-5 sm:px-8 lg:flex-row lg:gap-20 ${
          flip ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <div className="max-w-xl flex-1">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="blip" />
              {eyebrow}
            </p>
            <h2 className="display text-3xl sm:text-4xl lg:text-[2.6rem]">{title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-bright/85">{body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3 border-l-2 border-captain pl-5">
              {points.map((p) => (
                <li key={p} className="text-[0.95rem] leading-relaxed text-silver">
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={`flex flex-1 justify-center ${phones.length > 1 ? 'gap-0' : ''}`}>
          {phones.map((phone, i) => (
            <motion.img
              key={phone.src}
              src={phone.src}
              alt={phone.alt}
              loading="lazy"
              className={`w-64 max-w-[70vw] sm:w-72 ${
                phones.length > 1 ? (i === 0 ? 'z-10 -mr-16 mt-12' : '-ml-16') : ''
              }`}
              initial={reduced ? false : { opacity: 0, y: 60, rotate: flip ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
