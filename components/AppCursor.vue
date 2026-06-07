<template>
  <div id="cursor" ref="cursorEl" />
  <div id="cursor-ring" ref="ringEl" />
</template>

<script setup lang="ts">
const cursorEl = ref<HTMLElement | null>(null)
const ringEl   = ref<HTMLElement | null>(null)

onMounted(() => {
  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY })

  const tick = () => {
    rx += (mx - rx) * 0.14
    ry += (my - ry) * 0.14
    if (cursorEl.value) { cursorEl.value.style.left = mx + 'px'; cursorEl.value.style.top = my + 'px' }
    if (ringEl.value)   { ringEl.value.style.left   = rx + 'px'; ringEl.value.style.top   = ry + 'px' }
    requestAnimationFrame(tick)
  }
  tick()
})
</script>
