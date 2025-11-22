<template>
  <section class="features-section">
    <h2 class="section-title">Our Team</h2>

    <div class="features-flex " >
      <div class="feature-card fade-up" ref="cards">
        <p class="feature-text">
          Our dedicated staff brings over 50 years of combined experience in event management and hospitality. We're here to make your event planning seamless and stress-free.
        </p>
        <h3 style="margin-top: 40px;">
            Contact us for a personal tour and consultation
        </h3>
      </div>
    </div>
  </section>
</template>


<script>


export default {
  mounted() {
    const { animateOnScroll } = useScrollAnimation()

    // Your composable expects an array of elements
    animateOnScroll([this.$refs.cards])
  }
}
</script>


<style scoped>
.features-section {
  padding: 60px 20px;
  text-align: center;
  background-color: rgba(242, 242, 242, 0.638);
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #0a1f44;
  font-family: var(--font-secondary);
}
.feature-card button{
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 15px 20px;
    font-size: var(--fs-base);
    border-radius: 8px;
    margin-top: 30px;
    cursor: pointer;
    
}
.feature-text{
    color: #6b7a90;
    font-size: var(--fs-base);
}
.feature-card button:hover{
    background: transparent;
    border: 3px solid var(--primary-color);
    transition: .2s ease-in;
    color: var(--primary-color);
}

/* MAKE THE CARD VISIBLE */
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
