export default defineNuxtConfig({
  compatibilityDate: '2026-06-07',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts', 
    '@nuxtjs/sitemap', 
    '@nuxtjs/robots',
    '@nuxt/scripts' // Official module for scripts
  ],

  site: {
    url: 'https://munees.co.in',
  },

  // Properly configure tracking via Nuxt Scripts
  scripts: {
    registry: {
      googleTagManager: { id: 'GTM-MDC5ZS57' },
      microsoftClarity: { id: 'o23jve0pau' }
    }
  },

  // Removed redundant gtm and clarity config objects

  googleFonts: {
    families: {
      'DM+Serif+Display': { ital: [0, 1] },
      'JetBrains+Mono': [300, 400, 500, 700],
    },
    display: 'swap',
    preconnect: true,
    download: false,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      emailjsServiceId: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      emailjsTemplateId: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      emailjsPublicKey: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    },
  },

  app: {
    head: {
      title: 'Muhammed Munees — Frontend Developer',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Muhammed Munees M — Frontend Developer & Vibe Coder specialising in Vue 3, Nuxt 3, React & Tailwind CSS. Kerala, India.' },
        // Open Graph
        { property: 'og:title', content: 'Muhammed Munees — Frontend Developer' },
        { property: 'og:description', content: 'Frontend Developer & Vibe Coder. Vue 3, Nuxt 3, React. Kerala, India.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://munees.co.in' },
        { property: 'og:image', content: '/og-image.jpg' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Muhammed Munees — Frontend Developer' },
        { name: 'twitter:image', content: '/og-image.jpg' },
        { name: 'theme-color', content: '#080808' },
      ],
    },
  },
})