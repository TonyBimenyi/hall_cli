<template>
  <section class="packages-section">
    <h2 class="section-title">Our Packages</h2>

    <div class="packages-grid fade-up" ref="pack" >

      <!-- Basic Conference -->
      <div class="card">
        <h3 class="card-title">Basic Conference</h3>
        <p class="card-sub">Perfect for corporate meetings and seminars</p>

        <p class="price">$500 <span>/ per day</span></p>

        <ul class="card-list">
          <li>Conference room for up to 100 guests</li>
          <li>Basic AV equipment (projector, screen, microphone)</li>
          <li>High-speed WiFi</li>
          <li>Tables and chairs setup</li>
          <li>Complimentary parking</li>
          <li>8-hour rental period</li>
        </ul>

        <button class="btn">Book Now</button>
      </div>

      <!-- Premium Event -->
      <div class="card popular">
        <div class="popular-badge">Most Popular</div>

        <h3 class="card-title">Premium Event</h3>
        <p class="card-sub">Ideal for celebrations and medium-sized events</p>

        <p class="price">$1,200 <span>/ per day</span></p>

        <ul class="card-list">
          <li>Main hall for up to 250 guests</li>
          <li>Premium AV and lighting system</li>
          <li>Dance floor and stage</li>
          <li>Decorated lobby entrance</li>
          <li>In-house event coordinator</li>
          <li>Bridal suite access</li>
          <li>12-hour rental period</li>
        </ul>

        <button class="btn dark">Book Now</button>
      </div>

      <!-- Luxury Wedding -->
      <div class="card">
        <h3 class="card-title">Luxury Wedding</h3>
        <p class="card-sub">Complete wedding package with all amenities</p>

        <p class="price">$2,000+ <span>/ customized</span></p>

        <ul class="card-list">
          <li>Full venue access (up to 500 guests)</li>
          <li>Complete AV and custom lighting</li>
          <li>Ceremony and reception spaces</li>
          <li>Premium décor package</li>
          <li>Dedicated wedding planner</li>
          <li>Bridal suite and groom room</li>
          <li>Rehearsal access</li>
          <li>Flexible timing</li>
        </ul>

        <button class="btn">Book Now</button>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  // name: "CTASection",
  mounted() {
    const { animateOnScroll } = useScrollAnimation()

    // Add the fade-up animation to the CTA section
    animateOnScroll([this.$refs.pack])
  }
};
</script>

<style scoped>
.packages-section {
  padding: var(--section-padding);
  text-align: center;
  font-family: "Inter", sans-serif;
}

.section-title {
  font-size: var(--fs-4xl);
  font-weight: 700;
  margin-bottom: 40px;
  font-family: var(--font-secondary);
  color: #0b234a;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 25px;
}

/* Card */
.card {
  background: white;
  border-radius: 18px;
  padding: 30px;
  border: 1px solid #edf0f7;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
  text-align: left;
  position: relative;
  width: 450px;
  /* height: 100px; */
}

.card-title {
  font-size: var(--fs-xl);
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  font-family: var(--font-secondary);
  margin-bottom: 10px;
}

.card-sub {
  font-size: var(--fs-base);
  color: #66738f;
  margin-bottom: 20px;
  text-align: center;
}

.price {
  text-align: center;
  font-size: var(--fs-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 20px;
}
.price span {
  font-size:var(--fs-base);
  font-weight: 400;
  color: #66738f;
}

.card-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}
.card-list li {
  padding-left: 22px;
  margin-bottom: 25px;
  position: relative;
  font-size: var(--fs-base);
  color: #37445b;
}

.card-list li::before {
  content: "✔";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent-color);
  font-size: 16px;
}

/* Popular Card */
.popular {
  border: 2px solid var(--accent-color);
}

.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-color);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: var(--fs-base);
  font-weight: 600;
  color: white;
}

/* Buttons */
.btn {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
  background: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #0b234a;
  transition: 0.3s;
}
.btn:hover {
  background: var(--primary-color);
  color: white;
}

.btn.dark {
  background: var(--primary-color);
  color: white;
  border: none;
}
.btn.dark:hover {
  opacity: 0.85;
}
</style>
