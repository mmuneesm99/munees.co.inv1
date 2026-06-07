<template>
  <nav :class="{ scrolled: isScrolled }" id="navbar">
    <NuxtLink to="/" class="nav-logo">MM.DEV</NuxtLink>

    <ul class="nav-links">
      <li><a href="#story"    :class="{ active: active === 'story'    }">Story</a></li>
      <li><a href="#projects" :class="{ active: active === 'projects' }">Projects</a></li>
      <li><a href="#contact"  :class="{ active: active === 'contact'  }">Contact</a></li>
    </ul>

    <a href="mailto:muneesmmm@gmail.com" class="nav-cta">Contact</a>

    <button class="nav-hamburger" :class="{ open: drawerOpen }" @click="toggleDrawer" aria-label="Menu">
      <span /><span /><span />
    </button>
  </nav>

  <div class="nav-mobile-drawer" :class="{ open: drawerOpen }">
    <a href="#story"    @click="closeDrawer">Story</a>
    <a href="#projects" @click="closeDrawer">Projects</a>
    <a href="#contact"  @click="closeDrawer">Contact</a>
    <a href="mailto:muneesmmm@gmail.com" class="drawer-cta" @click="closeDrawer">Get in Touch ↗</a>
  </div>
</template>

<script setup lang="ts">
const isScrolled  = ref(false)
const drawerOpen  = ref(false)
const active      = ref('')

const toggleDrawer = () => { drawerOpen.value = !drawerOpen.value }
const closeDrawer  = () => { drawerOpen.value = false }

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 60
  })

  // Active nav via IntersectionObserver
  const sections  = document.querySelectorAll('section[id]')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id })
    },
    { threshold: 0.5 }
  )
  sections.forEach((s) => io.observe(s))
})
</script>
