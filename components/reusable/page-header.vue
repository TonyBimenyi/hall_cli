<template>
  <section class="page-header">
    <h1>{{ header.title }}</h1>
    <p>{{ header.subtitle }}</p>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Define your texts based on pages
const headers = {
  about: {
    title: "About Elite Reception",
    subtitle: "Creating unforgettable moments for over a decade"
  },
  services: {
    title: "Our Services",
    subtitle: "Professional event solutions tailored for you"
  },
  gallery: {
    title: "Gallery",
    subtitle: "A glimpse of our memorable events"
  },
  contact: {
    title: "Contact Us",
    subtitle: "We are here to help you plan your perfect event"
  }
}

// Detect route name (Nuxt automatically gives route names)
const name = route.name?.toString() || ""

const header = headers[name] || {
  title: "Elite Reception",
  subtitle: "Luxury event experiences crafted with passion"
}
</script>

<style scoped>
.page-header {
  text-align: center;
  padding: 80px 20px;
  color: white;
  background: linear-gradient(135deg, #0A3A75 0%, #001745 100%);
}
.page-header h1 {
  font-size: 48px;
  font-weight: 700;
  font-family: var(--font-secondary);
}
.page-header p {
  margin-top: 10px;
  font-size: 20px;
  opacity: 0.9;
}
</style>
