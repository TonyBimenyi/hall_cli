<template>
  <section class="cta-section fade-up" ref="ctaBox">
    <div class="container">
      <h2 class="cta-title">Ready to Plan Your Perfect Event?</h2>
      
      <p class="cta-subtitle">
        Let us help you create an unforgettable experience — whether it's a dream wedding, 
        corporate gala, or milestone celebration.
      </p>
      
      <div class="cta-buttons">
        <button class="cta-btn primary" @click="$router.push('/book')">
          Book Your Date
        </button>
        <button class="cta-btn outline" @click="$router.push('/contact')">
          Contact Us
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CTASection',

  mounted() {
    this.setupScrollAnimation()
  },

  methods: {
    setupScrollAnimation() {
      if (!('IntersectionObserver' in window)) {
        if (this.$refs.ctaBox) {
          this.$refs.ctaBox.classList.add('visible')
        }
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              // observer.unobserve(entry.target) // remove if you want repeat animation
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      )

      if (this.$refs.ctaBox) {
        observer.observe(this.$refs.ctaBox)
      }
    }
  }
}
</script>

<style scoped>
.cta-section {
  width: 100%;
  background: linear-gradient(135deg, #0a3a75 0%, #001745 100%);
  padding: clamp(5rem, 12vw, 9rem) 0;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Optional subtle overlay pattern (very light) */
.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-family: var(--font-secondary);
  font-size: clamp(2.4rem, 6.5vw, 3.8rem);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 1.4rem;
  letter-spacing: -0.02em;
}

.cta-subtitle {
  font-family: var(--font-primary);
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  line-height: 1.6;
  max-width: 720px;
  margin: 0 auto 2.5rem auto;
  opacity: 0.92;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
}

.cta-btn {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  font-weight: 600;
  padding: 0.95rem 2.4rem;
  border-radius: 50px;           /* modern pill shape */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 180px;
}

.cta-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
}

.cta-btn.primary {
  background: white;
  color: #0a3a75;
  border: none;
}

.cta-btn.primary:hover {
  background: #f8f9ff;
}

.cta-btn.outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.85);
}

.cta-btn.outline:hover {
  background: rgba(255,255,255,0.12);
  border-color: white;
}

/* Animation */
.fade-up {
  opacity: 0;
  transform: translateY(50px);
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s ease, transform 1s ease;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 340px;
    padding: 1.1rem 2rem;
  }
}
</style>