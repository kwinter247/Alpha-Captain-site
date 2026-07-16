import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Lanes from './components/Lanes'
import Feature from './components/Feature'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Lanes />

        <Feature
          id="study"
          eyebrow="Lane 01 — Written prep"
          title={
            <>
              Master material that <span className="text-flare">actually matters.</span>
            </>
          }
          body="Study from department SOPs, policies, and promotional source material — not generic test banks. Focused question sets, clear explanations, and tracking that shows exactly where you're strong and where you need work."
          points={[
            'Question sets built straight from your source material',
            'Blunt, source-backed explanations for every answer',
            'Weak areas surface first, so every rep counts',
          ]}
          bg="/img/bg-helmet-desk.webp"
          bgPosition="center 30%"
          screen={0.82}
          phones={[
            { src: '/img/phone-study.webp', alt: 'Alpha Captain study screen with topic performance tracking' },
            { src: '/img/phone-tracks.webp', alt: 'Alpha Captain study tracks with module progress' },
          ]}
        />

        <Feature
          id="scenarios"
          eyebrow="Lane 02 — Tactical scenarios"
          title={
            <>
              Tactical fireground <span className="text-flare">decision making.</span>
            </>
          }
          body="Work through realistic fire, MVA, hazmat, and command scenarios built around what you see, what you know, and what you'd do next. Train your size-up, priorities, and assignments before test-day pressure hits."
          points={[
            'Staged simulations — first-arriving view to final report',
            'Speak your on-scene size-up, just like the real thing',
            'Fire, MVA, hazmat, and incident command tracks',
          ]}
          bg="/img/bg-hallway.webp"
          screen={0.74}
          phones={[
            { src: '/img/phone-scenarios.webp', alt: 'Alpha Captain scenario library with high-rise, MVA, and basement fire simulations' },
            { src: '/img/phone-simulation.webp', alt: 'Alpha Captain basement fire simulation with voice size-up' },
          ]}
          flip
        />

        <Feature
          id="oral-board"
          eyebrow="Lane 03 — Oral board"
          title={
            <>
              Be ready for the <span className="text-flare">oral board.</span>
            </>
          }
          body="Practice vetted promotional interview questions out loud. Review your transcript, get board-style feedback on structure, policy tie-in, and command presence — and build the confidence to explain your leadership clearly."
          points={[
            'Speak → transcript → board review, one guided workflow',
            'Vetted promotional interview question bank',
            'Feedback on structure, policy tie-in, and command presence',
          ]}
          bg="/img/bg-street-walk.webp"
          bgPosition="center 40%"
          screen={0.78}
          phones={[{ src: '/img/phone-interview.webp', alt: 'Alpha Captain oral board practice with voice analysis' }]}
        />

        <Feature
          id="readiness"
          eyebrow="Readiness cockpit"
          title={
            <>
              Know exactly <span className="text-flare">where you stand.</span>
            </>
          }
          body="One readiness score across written, scenario, and interview lanes — tracked against your test date. The tank fills as you put in the work. No guessing, no false confidence."
          points={[
            'Overall readiness tank, checked against days to test',
            'Lane-by-lane scores: written, scenario, interview',
            'A recommended next rep, every single day',
          ]}
          bg="/img/bg-night-street.webp"
          bgPosition="center 70%"
          screen={0.86}
          phones={[{ src: '/img/phone-progress.webp', alt: 'Alpha Captain progress screen with SCBA readiness tank at 73%' }]}
          flip
        />

        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
