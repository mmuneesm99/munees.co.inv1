<template>
  <section id="contact">
    <div class="container">
      <div class="contact-grid">

        <!-- Left: Info -->
        <div class="contact-left">
          <p class="section-label" ref="r0">Get in Touch</p>
          <h2 ref="r1">Let's build something <em>beautiful</em>.</h2>
          <p ref="r2">
            I'm currently engaged and not available for new roles.
            That said, feel free to reach out — I'm always open to interesting conversations.
          </p>
          <div class="contact-links" ref="r3">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              :href="link.href ?? '#'"
              class="contact-link"
              :target="link.href?.startsWith('http') ? '_blank' : undefined"
              rel="noopener"
            >
              <span class="cl-label">{{ link.label }}</span>
              <span class="cl-val">
                {{ link.value }}
                <span v-if="link.arrow" class="cl-arrow">↗</span>
              </span>
            </a>
          </div>
        </div>

        <!-- Right: Form -->
        <div ref="r4">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="field">
                <label for="name">Name</label>
                <input v-model="form.name" type="text" id="name" placeholder="Your name" required />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" id="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div class="field">
              <label for="subject">Subject</label>
              <input v-model="form.subject" type="text" id="subject" placeholder="What's on your mind?" />
            </div>
            <div class="field">
              <label for="message">Message</label>
              <textarea v-model="form.message" id="message" placeholder="Tell me about the project..." required />
            </div>

            <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>

            <button type="submit" class="submit-btn" :style="btnStyle" :disabled="sending">
              {{ btnText }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import emailjs from '@emailjs/browser'
import { contactLinks } from '~/data/portfolio'

const config = useRuntimeConfig()

const r0 = ref<HTMLElement | null>(null)
const r1 = ref<HTMLElement | null>(null)
const r2 = ref<HTMLElement | null>(null)
const r3 = ref<HTMLElement | null>(null)
const r4 = ref<HTMLElement | null>(null)

const form     = reactive({ name: '', email: '', subject: '', message: '' })
const sending  = ref(false)
const btnText  = ref('Send Message →')
const btnStyle = ref<Record<string, string>>({})
const errorMsg = ref('')

const handleSubmit = async () => {
  sending.value  = true
  errorMsg.value = ''
  btnText.value  = 'Sending...'
  btnStyle.value = { opacity: '0.7' }

  try {
    await emailjs.send(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      {
        from_name:    form.name,
        from_email:   form.email,
        subject:      form.subject || `New message from ${form.name}`,
        message:      form.message,
        reply_to:     form.email,
      },
      { publicKey: config.public.emailjsPublicKey }
    )

    btnText.value  = 'Sent ✓'
    btnStyle.value = { background: '#28c840', color: '#000' }
    Object.assign(form, { name: '', email: '', subject: '', message: '' })

    setTimeout(() => {
      btnText.value  = 'Send Message →'
      btnStyle.value = {}
    }, 4000)

  } catch (err: any) {
    console.error('EmailJS error:', err)
    errorMsg.value = 'Something went wrong. Please email me directly at muneesmmm@gmail.com'
    btnText.value  = 'Try Again →'
    btnStyle.value = { borderColor: '#FF4444', color: '#FF4444' }

    setTimeout(() => {
      btnText.value  = 'Send Message →'
      btnStyle.value = {}
      errorMsg.value = ''
    }, 5000)
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  const { observe } = useScrollReveal()
  ;[r0.value, r1.value, r2.value, r3.value, r4.value].forEach((el, i) => el && observe(el, i * 80))
})
</script>
