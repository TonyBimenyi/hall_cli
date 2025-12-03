<template>
  <section class="perfect-for-section">
    <h2 class="section-title">Perfect For</h2>

    <div class="perfect-grid ">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="['perfect-item', item.highlight ? 'highlight' : '']"
      >
        {{ item.label }}
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { label: "Weddings" },
  { label: "Corporate Events" },
  { label: "Conferences" },
  { label: "Seminars" },

  { label: "Birthday Parties" },
  { label: "Anniversary Celebrations" },
  { label: "Engagement Parties", highlight: true },
  { label: "Holiday Parties" },

  { label: "Fundraisers" },
  { label: "Award Ceremonies" },
  { label: "Product Launches" },
  { label: "Networking Events" }
];
</script>

<style scoped>
.perfect-for-section {
  padding: 80px 0;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 45px;
  color: var(--primary-color);
  letter-spacing: -0.5px;
  font-family: var(--font-secondary);
}

.perfect-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
}

.perfect-item {
  background: #f3f7fc;
  padding: 28px 0px;
  border-radius: 18px;
  text-align: center;
  font-size:var(--fs-base);
  font-weight: 600;
  color: var(--primary-color);
  transition: 0.2s ease;
  cursor: default;
  width: 350px;
}

.perfect-item:hover {
  transform: translateY(-3px);
}

.highlight {
  background: #fdf6e9;
}
</style>
