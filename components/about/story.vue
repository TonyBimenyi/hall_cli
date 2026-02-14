<template>
  <section class="about-section">
    <div class="container">
      <div class="title fade-up" ref="titleEl">
        <h1>Our Story</h1>
      </div>

      <div class="story-content fade-up" ref="storyEl">
        <p>
          Founded in 2013, <strong>Elite Reception & Conference Hall</strong> has grown to become 
          the city's most trusted and beloved venue for life's most meaningful celebrations.
        </p>
        <p>
          What began as a passionate vision to create a space where unforgettable memories are made 
          has evolved into a 25,000 square foot masterpiece of elegance and functionality.
        </p>
        <p>
          We seamlessly blend timeless sophistication with state-of-the-art amenities, offering the 
          perfect setting for:
        </p>
        <ul>
          <li>Exquisite weddings and receptions</li>
          <li>Professional corporate conferences & seminars</li>
          <li>Anniversaries, birthdays & milestone celebrations</li>
          <li>Product launches, galas and special occasions</li>
        </ul>
        <p>
          Our dedicated team is committed to exceptional personalized service and meticulous 
          attention to detail. We partner closely with every client to transform their unique 
          vision into an extraordinary, flawless event experience.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',

  mounted() {
    this.setupScrollAnimation()
  },

  methods: {
    setupScrollAnimation() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for very old browsers
        [this.$refs.titleEl, this.$refs.storyEl].forEach(el => {
          if (el) el.classList.add('visible')
        })
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -80px 0px'
        }
      )

      if (this.$refs.titleEl) observer.observe(this.$refs.titleEl)
      if (this.$refs.storyEl) observer.observe(this.$refs.storyEl)
    }
  }
}
</script>

<style scoped>
.about-section {
  padding: clamp(4rem, 9vw, 7.5rem) 0;
  background: #f9fbff;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.title {
  text-align: center;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.title h1 {
  font-family: var(--font-secondary);
  font-size: clamp(2.6rem, 6.8vw, 4.2rem);
  font-weight: 700;
  color: #0a1f44;
  letter-spacing: -0.02em;
  margin: 0;
}

.story-content {
  font-family: var(--font-primary);
  color: #334155;
  font-size: clamp(1.05rem, 2.8vw, 1.22rem);
  line-height: 1.78;
  text-align: left;
}

.story-content p {
  margin-bottom: 1.6rem;
}

.story-content strong {
  color: #0a1f44;
  font-weight: 600;
}

.story-content ul {
  list-style: none;
  padding-left: 0;
  margin: 1.8rem 0 2.2rem;
}

.story-content ul li {
  position: relative;
  padding-left: 1.8rem;
  margin-bottom: 0.9rem;
}

.story-content ul li::before {
  content: "•";
  color: var(--accent-color);
  position: absolute;
  left: 0;
  font-size: 1.4rem;
  line-height: 1;
}

/* Animation */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
}

/* Stagger slightly */
.title.visible {
  transition-delay: 0.1s;
}

.story-content.visible {
  transition-delay: 0.3s;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .story-content {
    font-size: clamp(1.05rem, 3.8vw, 1.15rem);
  }
  
  .story-content ul {
    padding-left: 0.5rem;
  }
}
</style>