<template>
  <section class="features-section">
    <h2 class="section-title">Why Choose Elite Reception</h2>

    <div class="features-flex">
      <div
        class="feature-card fade-up"
        v-for="(item, index) in features"
        :key="index"
        ref="cards"
      >
        <div class="icon-circle">
          <Icon :icon="item.icon" height="34" color="#d4a017" />
        </div>

        <h3 class="feature-title">{{ item.title }}</h3>
        <p class="feature-text">{{ item.text }}</p>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      features: [
        { icon: "mdi:calendar-month", title: "Flexible Scheduling", text: "Book your perfect date..." },
        { icon: "mdi:account-group", title: "50–500 Guests", text: "Accommodate events of any size..." },
        { icon: "mdi:trophy-outline", title: "Premium Amenities", text: "State-of-the-art AV..." },
        { icon: "mdi:star-outline", title: "Award Winning", text: "City’s most trusted venue..." },
      ]
    }
  },

  mounted() {
    // Call the composable inside mounted
    const { animateOnScroll } = useScrollAnimation()
    animateOnScroll(this.$refs.cards)
  }
}
</script>


<style scoped>
.features-section {
  padding: var(--section-padding);
  text-align: center;
}

.section-title {
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #0a1f44;
}

/* FLEX LAYOUT */
.features-flex {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  cursor: pointer;
}

/* Card */
.feature-card {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 18px;
  width: 300px;
  border: 2px solid #ecf2fb;
  box-shadow: 0 10px 25px rgba(0, 30, 90, 0.04);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 30px rgba(0, 30, 90, 0.08);
}

.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #0a1f44;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.feature-title {
  font-family: var(--font-secondary);
  font-size: 1.4rem;
  color: #0a1f44;
  margin-bottom: 10px;
}

.feature-text {
  font-family: var(--font-primary);
  color: #6b7a90;
  line-height: 1.5;
  font-size: 1rem;
}

/* FADE IN UP ANIMATION */
.fade-up {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 1.2s ease forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(35px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
