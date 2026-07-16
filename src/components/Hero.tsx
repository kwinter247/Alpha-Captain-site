import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Embers from './Embers'

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%'])

  const stagger = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh items-end overflow-hidden">
      {/* Background: night fireground, slow drift */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ y: bgY }}
        initial={reduced ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src="/img/bg-night-street.webp"
          alt=""
          className="h-full w-full object-cover object-[center_30%]"
          fetchPriority="high"
        />
      </motion.div>
      {/* Treatment: vignette + bottom ramp for legibility */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />
      <Embers density={44} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-32 pb-24 sm:px-8 sm:pb-28">
        <motion.p {...stagger(0)} className="eyebrow mb-5 flex items-center gap-3">
          <span className="blip" />
          Promotional prep system — Company Officer track
        </motion.p>
        <motion.h1
          {...stagger(1)}
          className="display text-[clamp(3.2rem,11vw,8.5rem)]"
        >
          It&rsquo;s your
          <br />
          <span className="text-flare">time.</span>
        </motion.h1>
        <motion.p {...stagger(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-bright/85">
          Alpha Captain turns your department&rsquo;s SOPs, policies, scenarios, and interview
          questions into one focused prep system — built for serious promotional candidates.
        </motion.p>
        <motion.div {...stagger(3)} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#get-ready"
            className="bg-captain px-7 py-3.5 font-mono text-[0.78rem] tracking-[0.22em] uppercase text-off shadow-[0_0_36px_rgba(157,5,5,0.5)] transition-all hover:bg-flare hover:shadow-[0_0_48px_rgba(227,43,43,0.55)]"
          >
            Start your prep
          </a>
          <a
            href="#study"
            className="border border-silver/40 px-7 py-3.5 font-mono text-[0.78rem] tracking-[0.22em] uppercase text-bright transition-colors hover:border-off hover:text-off"
          >
            See the system
          </a>
        </motion.div>
      </div>
    </section>
  )
}
