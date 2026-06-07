<template>
  <section id="projects">
    <div class="container">

      <div class="projects-header" ref="headerEl">
        <p class="section-label">Selected Work</p>
        <h2 class="section-h2">Projects that <em>shipped</em>.</h2>
      </div>

      <div class="proj-grid">
        <div
          v-for="(proj, i) in projects"
          :key="proj.num"
          class="proj-card"
          :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
        >
          <span class="proj-num">{{ proj.num }}</span>

          <!-- Arrow: link if live, static otherwise -->
          <a v-if="proj.url" :href="proj.url" target="_blank" rel="noopener" class="proj-arrow" title="Visit live site">↗</a>
          <span v-else class="proj-arrow">↗</span>

          <h3 class="proj-name">{{ proj.name }}</h3>
          <p  class="proj-desc">{{ proj.desc }}</p>

          <div class="proj-tags">
            <span v-for="tag in proj.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <span v-if="proj.live" class="proj-live">{{ proj.live }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/data/portfolio'

const headerEl = ref<HTMLElement | null>(null)
const cardRefs: HTMLElement[] = []

onMounted(() => {
  const { observe } = useScrollReveal()
  headerEl.value && observe(headerEl.value)
  cardRefs.forEach((el, i) => observe(el, (i % 3) * 120))
})
</script>
