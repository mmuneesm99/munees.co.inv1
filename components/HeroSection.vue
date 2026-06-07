<template>
  <section id="hero">
    <canvas ref="canvasEl" id="hero-canvas" />

    <div class="hero-inner">
      <p class="hero-tag">Frontend Developer &amp; Vibe Coder — Kerala, India</p>
      <h1 class="hero-h1">Crafting <em>exceptional</em> interfaces, end to end.</h1>
      <p class="hero-desc">
        Muhammed Munees M — Frontend developer specialising in Vue&nbsp;3, Nuxt&nbsp;3,
        React &amp; Tailwind CSS. I build fast, beautiful, production-ready web experiences.
      </p>
      <div class="hero-actions">
        <a href="#projects" class="btn-primary">View Work</a>
        <a href="#contact"  class="btn-ghost">Get in Touch</a>
      </div>
    </div>

    <div class="hero-scroll"><span></span>Scroll to explore</div>

    <div class="hero-stats">
      <div class="stat-item">
        <span class="stat-num">4+</span>
        <span class="stat-label">Years Exp.</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">10+</span>
        <span class="stat-label">Projects</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">∞</span>
        <span class="stat-label">Attention to detail</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const canvasEl = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  let W = 0, H = 0
  const mouse = { x: 0, y: 0 }

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  document.getElementById('hero')!.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect()
    mouse.x = e.clientX - r.left
    mouse.y = e.clientY - r.top
  })

  // Grid nodes
  const COLS = 18, ROWS = 10
  const nodes: any[] = []
  for (let c = 0; c <= COLS; c++) {
    for (let r = 0; r <= ROWS; r++) {
      nodes.push({
        gx: c / COLS, gy: r / ROWS,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        _cx: 0, _cy: 0,
      })
    }
  }

  // Floating particles
  const particles: any[] = []
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * 800, y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      life: Math.random(),
    })
  }

  let t = 0
  const draw = () => {
    t += 0.005
    ctx.clearRect(0, 0, W, H)

    // Nodes
    nodes.forEach((n) => {
      const bx = n.gx * W, by = n.gy * H
      const wave = Math.sin(t * n.speed + n.phase) * 12
      const influence = Math.max(0, 1 - Math.hypot(mouse.x - bx, mouse.y - by) / 280)
      n._cx = bx + wave + ((mouse.x - bx) / W) * 40 * influence
      n._cy = by + wave * 0.5 + ((mouse.y - by) / H) * 40 * influence

      const glow = Math.max(0, 1 - Math.hypot(mouse.x - bx, mouse.y - by) / 200)
      ctx.beginPath()
      ctx.arc(n._cx, n._cy, 0.8 + glow * 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,217,255,${0.08 + glow * 0.55})`
      ctx.fill()
    })

    // Grid lines
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const idx = c * (ROWS + 1) + r
        const n1  = nodes[idx]
        const nR  = nodes[idx + (ROWS + 1)]
        const nD  = nodes[idx + 1]
        if (!n1?._cx) continue
        const proximity = Math.max(0, 1 - Math.hypot(mouse.x - n1._cx, mouse.y - n1._cy) / 300)
        if (nR?._cx) {
          ctx.beginPath(); ctx.moveTo(n1._cx, n1._cy); ctx.lineTo(nR._cx, nR._cy)
          ctx.strokeStyle = `rgba(0,217,255,${0.03 + proximity * 0.18})`; ctx.lineWidth = 0.5; ctx.stroke()
        }
        if (nD?._cx) {
          ctx.beginPath(); ctx.moveTo(n1._cx, n1._cy); ctx.lineTo(nD._cx, nD._cy)
          ctx.strokeStyle = `rgba(0,217,255,${0.03 + proximity * 0.15})`; ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
    }

    // Particles
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.life += 0.003
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
        p.x = Math.random() * W; p.y = Math.random() * H
        p.vx = (Math.random() - 0.5) * 0.6; p.vy = (Math.random() - 0.5) * 0.4; p.life = 0
      }
      const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y)
      if (dist < 200) { p.vx += (mouse.x - p.x) / dist * 0.02; p.vy += (mouse.y - p.y) / dist * 0.02 }
      p.vx *= 0.99; p.vy *= 0.99
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,217,255,${p.opacity * (1 - (p.life % 1))})`; ctx.fill()
    })

    // Fade canvas on scroll
    const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1)
    canvas.style.opacity = String(0.55 * (1 - scrollProgress * 0.8))

    requestAnimationFrame(draw)
  }
  draw()
})
</script>
