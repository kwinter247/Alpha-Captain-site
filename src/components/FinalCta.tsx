import Reveal from './Reveal'
import Embers from './Embers'

export default function FinalCta() {
  return (
    <section id="get-ready" className="relative overflow-hidden">
      <img
        src="/img/bg-inferno-watch.webp"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-ink/45 to-ink/85" />
      <Embers density={30} />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center justify-center gap-3">
            <span className="blip" />
            Last call
          </p>
          <h2 className="display text-[clamp(2.6rem,8vw,6rem)]">
            What are you
            <br />
            <span className="text-flare">waiting for?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-bright/85">
            There&rsquo;s no better time to take control of your future. Alpha Captain is the
            complete promotional prep system designed for tomorrow&rsquo;s Company Officers.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:tektrader247@gmail.com?subject=Alpha%20Captain%20early%20access"
              className="bg-captain px-8 py-4 font-mono text-[0.8rem] tracking-[0.22em] uppercase text-off shadow-[0_0_36px_rgba(157,5,5,0.55)] transition-all hover:bg-flare hover:shadow-[0_0_52px_rgba(227,43,43,0.6)]"
            >
              Request early access
            </a>
          </div>
          <p className="mt-5 font-mono text-[0.68rem] tracking-[0.24em] uppercase text-silver/60">
            iOS &amp; Android — coming soon
          </p>
        </Reveal>
      </div>
    </section>
  )
}
