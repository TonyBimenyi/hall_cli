<template>
  <section class="cta-section fade-up" ref="ctaBox">
    <h2 class="cta-title">Ready to Plan Your Event?</h2>
    
    <p class="cta-subtitle">
      Let us help you create an unforgettable experience for you and your guests.
    </p>

    <div class="cta-buttons">
      <button class="cta-btn primary">Book Your Date</button>
      <button class="cta-btn outline">Contact Us</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CTASection",
  mounted() {
    const { animateOnScroll } = useScrollAnimation()

    // Add the fade-up animation to the CTA section
    animateOnScroll([this.$refs.ctaBox])
  }
};
</script>

<style scoped>
/* ===== CTA SECTION STYLES ===== */

.cta-section {
  width: 100%;
    background: linear-gradient(0deg, #0A3A75 0%, #001745 100%);
  padding: 80px 0px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  font-family: var(--font-secondary);
}

.cta-subtitle {
  font-size: var(--fs-base);
  max-width: 650px;
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
}

.cta-btn {
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}

/* Primary button (white background) */
.cta-btn.primary {
  background: white;
  color: #0A3A75;
  border: none;
}

.cta-btn.primary:hover {
  background: #e7e7e7;
}

/* Outline button */
.cta-btn.outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.cta-btn.outline:hover {
  background: white;
  color: #0A3A75;
}
</style>
