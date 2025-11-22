<template>
  <div class="gallery-section">
    <h1>Main Hall</h1>
  <div class="gallery-grid">
    <div
      v-for="(item, index) in halls"
      :key="index"
      class="gallery-card"
      :style="{ backgroundImage: `url(${item.image})` }"
    >
      <div class="overlay"></div>

      <div class="content">
        <h3 class="title">{{ item.title }}</h3>
        <p class="subtitle">{{ item.subtitle }}</p>
      </div>
    </div>
  </div>
  <h1>Outdoor Spaces</h1>
  <div class="gallery-grid">
    <div
      v-for="(item, index) in halls"
      :key="index"
      class="gallery-card"
      :style="{ backgroundImage: `url(${item.image})` }"
    >
      <div class="overlay"></div>

      <div class="content">
        <h3 class="title">{{ item.title }}</h3>
        <p class="subtitle">{{ item.subtitle }}</p>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script setup>
const halls = [
  {
    title: "Grand Chandelier Hall",
    subtitle: "Luxury with high ceilings",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Royal Ballroom",
    subtitle: "Perfect for large celebrations",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Wedding Venue",
    subtitle: "A beautiful atmosphere",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Banquet Hall",
    subtitle: "Stylish and comfortable",
    image: "https://images.unsplash.com/photo-1529635572221-2d88b4f797d9?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Classic Ceremony Room",
    subtitle: "Warm and elegant",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Luxury Reception Room",
    subtitle: "Beautifully decorated",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80"
  }
];
</script>



<style scoped>
.gallery-section{
   padding: var(--section-padding);
}
.gallery-section h1{
  font-family: var(--font-secondary);
}
.gallery-grid {
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 gap: 10px;
  margin-bottom: 50px;
 margin-top: 50px;
}

.gallery-card {
  position: relative;
  height: 280px;
  width: 500px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 22px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s ease;
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65));
  opacity: 0;
  transition: 0.3s ease;
}

.gallery-card:hover .overlay {
  opacity: 1;
}

/* Text content */
.content {
  position: relative;
  z-index: 2;
}

.title {
  color: #fff;
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
}

.subtitle {
  opacity: 0;
  margin-top: 6px;
  color: #e6e6e6;
  font-size: 0.95rem;
  transition: opacity 0.3s;
}

.gallery-card:hover .subtitle {
  opacity: 1;
}

/* Responsive */
@media (max-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
