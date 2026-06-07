export function useScrollReveal() {
  if (!import.meta.client) return { observe: () => {} }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.unobserve(el)
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )

  const observe = (el: HTMLElement, delay = 0) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    if (delay) {
      setTimeout(() => observer.observe(el), delay)
    } else {
      observer.observe(el)
    }
  }

  return { observe }
}
