# Muhammed Munees — Portfolio (Nuxt 3)

## Project Structure

```
munees-portfolio/
├── app.vue                   # Root layout
├── nuxt.config.ts            # Nuxt config (fonts, CSS, meta)
├── assets/css/main.css       # All global styles & design tokens
├── data/portfolio.ts         # Projects, timeline, ticker data
├── composables/
│   └── useScrollReveal.ts    # Scroll reveal via IntersectionObserver
├── components/
│   ├── AppCursor.vue         # Custom cursor
│   ├── AppNav.vue            # Navbar + mobile drawer
│   ├── HeroSection.vue       # Hero + canvas particle system
│   ├── StackTicker.vue       # Scrolling skills ticker
│   ├── StorySection.vue      # About + timeline
│   ├── ProjectsSection.vue   # Projects grid
│   └── ContactSection.vue    # Contact links + form
└── pages/
    └── index.vue             # Main page
```

## Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site (for Netlify / Vercel / any static host)
npm run generate
```

## Add Contact Form (when ready)

1. Go to https://formspree.io and create a free account
2. Get your form endpoint (e.g. `https://formspree.io/f/xxxxxxxx`)
3. In `components/ContactSection.vue`, update `handleSubmit` to:

```ts
const handleSubmit = async () => {
  btnText.value = 'Sending...'
  await fetch('https://formspree.io/f/xxxxxxxx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  btnText.value = 'Sent ✓'
  // reset after 3s...
}
```

## Deployment

- **Vercel**: connect GitHub repo → auto deploys on push
- **Netlify**: connect repo or drag-drop the `.output/public` folder after `npm run generate`
- **Any host**: run `npm run generate` → upload `dist/` folder
