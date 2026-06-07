<template>
  <main>
    <HeroSection />
    <StackTicker />
    <div class="divider" />
    <StorySection />
    <div class="divider" />
    <ProjectsSection />
    <div class="divider" />
    <ContactSection />
    <div class="divider" />
    <footer>
      <span class="footer-copy">© 2025 Muhammed Munees M — Kochi, Kerala</span>
      <span class="footer-built">Built with <span>Vue 3 · Nuxt 3 · Tailwind CSS</span></span>
    </footer>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Muhammed Munees — Frontend Developer',
  meta: [
    {
      name: 'description',
      content: 'Muhammed Munees M — Frontend Developer & Vibe Coder. Vue 3, Nuxt 3, React. Kerala, India.',
    },
  ],
})
</script>
