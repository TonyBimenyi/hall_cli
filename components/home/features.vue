<template>
  <section class="features-section">
    <div class="container">
      <h2 class="section-title">Why Choose Elite Reception</h2>
      
      <div class="features-grid">
        <div
          v-for="(item, index) in features"
          :key="index"
          class="feature-card fade-up"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="icon-circle">
            <Icon :icon="item.icon" height="36" color="var(--accent-color)" />
          </div>
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  
  data() {
    return {
      features: [
        { 
          icon: "mdi:calendar-month", 
          title: "Flexible Scheduling", 
          text: "Choose your perfect date with our adaptable booking system and multiple hall configurations." 
        },
        { 
          icon: "mdi:account-group", 
          title: "50–500 Guests", 
          text: "From intimate gatherings to grand celebrations — we scale effortlessly to your guest list." 
        },
        { 
          icon: "mdi:trophy-outline", 
          title: "Premium Amenities", 
          text: "Professional lighting, crystal-clear sound, high-end AV, climate control, and more." 
        },
        { 
          icon: "mdi:star-outline", 
          title: "Award-Winning Service", 
          text: "Recognized as one of the most trusted and beautifully reviewed venues in the city." 
        }
      ]
    }
  },

  mounted() {
    this.setupScrollAnimation()
  },

  methods: {
    setupScrollAnimation() {
      if (!('IntersectionObserver' in window)) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              // observer.unobserve(entry.target) // uncomment if you want one-time animation
            }
          })
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -80px 0px'
        }
      )

      const cards = document.querySelectorAll('.feature-card')
      cards.forEach(card => observer.observe(card))
    }
  }
}
</script>

<style scoped>
.features-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  background: #f8fafc;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-family: var(--font-secondary);
  font-size: clamp(2.2rem, 5.5vw, 3.4rem);
  font-weight: 700;
  color: #0a1f44;
  text-align: center;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
  letter-spacing: -0.02em;
}

/* ─── Grid Layout ─── */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.2rem;
  }
}

/* Card */
.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2.2rem 1.8rem;
  border: 1px solid #e5efff;
  box-shadow: 0 8px 24px rgba(10, 31, 68, 0.04);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(10, 31, 68, 0.09);
  border-color: rgba(212, 160, 23, 0.3);
}

.icon-circle {
  width: 78px;
  height: 78px;
  background: #0a1f44;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: transform 0.4s ease;
}

.feature-card:hover .icon-circle {
  transform: scale(1.12);
  background: var(--accent-color);
}

.feature-title {
  font-family: var(--font-secondary);
  font-size: 1.35rem;
  font-weight: 600;
  color: #0a1f44;
  margin-bottom: 0.9rem;
}

.feature-text {
  font-family: var(--font-primary);
  color: #5f7389;
  line-height: 1.6;
  font-size: 1.03rem;
}

/* Animation */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
</style>