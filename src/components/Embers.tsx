import { useEffect, useRef } from 'react'

type Ember = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

/** Drifting ember particles rendered on a transparent canvas. */
export default function Embers({ density = 40 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const embers: Ember[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (): Ember => {
      const maxLife = 240 + Math.random() * 320
      return {
        x: Math.random() * w,
        y: h * 0.35 + Math.random() * h * 0.65,
        r: 0.6 + Math.random() * 1.8,
        vx: -0.12 + Math.random() * 0.3,
        vy: -(0.18 + Math.random() * 0.5),
        life: Math.random() * maxLife,
        maxLife,
      }
    }
    for (let i = 0; i < density; i++) embers.push(spawn())

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        e.life += 1
        e.x += e.vx + Math.sin((e.life + i * 31) * 0.01) * 0.18
        e.y += e.vy
        if (e.life > e.maxLife || e.y < -8) embers[i] = spawn()
        const t = e.life / e.maxLife
        const alpha = Math.sin(Math.PI * Math.min(t, 1)) * 0.7
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3)
        grad.addColorStop(0, `rgba(255,138,66,${alpha})`)
        grad.addColorStop(1, 'rgba(227,43,43,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
