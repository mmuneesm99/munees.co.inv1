<template>
  <div class="stack-ticker">
    <div class="ticker-inner">
      <span
        v-for="(item, i) in doubled"
        :key="i"
        class="ticker-item"
        :class="{ 'ticker-ai': item.ai }"
      >
        <span class="ticker-dot" />{{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tickerItems, aiItems } from '~/data/portfolio'

const half = [
  ...tickerItems.map((l) => ({ label: l, ai: false })),
  ...aiItems.map((l) => ({ label: l, ai: true })),
]
// Duplicate for seamless CSS loop
const doubled = [...half, ...half]
</script>
