<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="content">
      <h1 class="title">
        Where Moments Become
        <span class="highlight">Memories</span>
      </h1>

      <p class="subtitle">
        Elite Reception & Conference Hall – Your premier destination for weddings,
        corporate events, and celebrations
      </p>

      <div class="buttons">
        <button class="btn btn-dark">
          Book Now
        </button>
        <button class="btn btn-light">
          View Gallery
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 80vh;
  background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1900&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Dark blue color overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 26, 64, 0.78);
  backdrop-filter: brightness(0.9);
}

/* Content styling */
.content {
  position: relative;
  max-width: 1800px;
  padding: 20px;
  animation: fadeInUp 1.2s ease forwards;
}

.title {
  font-family: var(--font-secondary);
  font-size: 5.2rem;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #ffffff;
}

.highlight {
  color: var(--accent-color); /* golden yellow */
  display: block;
    font-family: var(--font-secondary);
}

.subtitle {
  font-family: var(--font-primary);
  font-size: 1.2rem;
  color: #e8e8e8;
  max-width: 750px;
  margin: 0 auto 40px auto;
}

/* Buttons */
.buttons {
  display: flex;
  gap: 0px;
  justify-content: center;
  width: 40%;
}

.btn {
  font-family: var(--font-primary);
  padding:18px 40px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn-dark {
  background: #001b4d;
  color: #fff;
  border: 2px solid white;
}

.btn-light {
  background: #ffffff;
  color: #06264e;
}

.btn:hover {
  opacity: 0.85;
  transition: 0.3s ease;
}



/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2.6rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}
</style>
