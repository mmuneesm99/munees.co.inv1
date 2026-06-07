<template>
  <section id="story">
    <div class="container">
      <div class="story-grid">

        <!-- Left: About -->
        <div>
          <p class="section-label" ref="r0">The Approach</p>
          <h2 class="story-h2" ref="r1">Frontend-first. <em>Results</em> focused.</h2>
          <div class="story-body" ref="r2">
            <p>I build interfaces that look great and feel even better. My craft lives at the intersection of polished UI and clean engineering — where pixel-perfect design meets reliable, well-structured code.</p>
            <p>At Fenero and Techbank, I've led frontend architecture — designing reusable component systems, integrating complex APIs, and delivering reactive interfaces that users actually enjoy.</p>
            <p>From a custom client-side report engine at Armino that cut server load significantly, to a full component library at Techbank that accelerated the team's delivery — every project is a commitment to craft.</p>
          </div>
        </div>

        <!-- Right: Timeline -->
        <div class="story-timeline">
          <p class="section-label" ref="r3">Timeline</p>
          <div
            v-for="(item, i) in timeline"
            :key="item.year"
            class="tl-item"
            :ref="(el) => { if (el) tlRefs[i] = el as HTMLElement }"
          >
            <span class="tl-year">{{ item.year }}</span>
            <div>
              <p class="tl-title">{{ item.title }}</p>
              <p class="tl-sub">{{ item.sub }}</p>
              <span class="tl-badge">{{ item.badge }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { timeline } from '~/data/portfolio'

const r0 = ref<HTMLElement | null>(null)
const r1 = ref<HTMLElement | null>(null)
const r2 = ref<HTMLElement | null>(null)
const r3 = ref<HTMLElement | null>(null)
const tlRefs: HTMLElement[] = []

onMounted(() => {
  const { observe } = useScrollReveal()
  ;[r0.value, r1.value, r2.value, r3.value].forEach((el) => el && observe(el))
  tlRefs.forEach((el, i) => observe(el, i * 120))
})
</script>
