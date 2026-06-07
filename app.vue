<template>
  <div>
    <ClientOnly>
      <AppCursor />
    </ClientOnly>
    <AppNav />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
useHead({
  noscript: [
    {
      children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MDC5ZS57" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    }
  ]
})
</script>