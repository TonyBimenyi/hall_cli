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
        corporate events, and unforgettable celebrations
      </p>
      
      <div class="buttons">
        <button class="btn btn-primary">
          Book Now
        </button>
        <button class="btn btn-secondary">
          View Gallery
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 85vh;          /* better than fixed vh on mobile */
  background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1900&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 26, 64, 0.78);     /* deep navy overlay */
  backdrop-filter: brightness(0.92) saturate(0.95);
}

/* Content */
.content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  padding: 2rem 1.5rem;
  animation: fadeInUp 1.3s ease-out forwards;
}

.title {
  font-family: var(--font-secondary);
  font-size: clamp(2.8rem, 8vw, 5.5rem);   /* fluid typography */
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 1.2rem;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.highlight {
  color: var(--accent-color);               /* golden yellow */
  display: block;
}

.subtitle {
  font-family: var(--font-primary);
  font-size: clamp(1.1rem, 3vw, 1.35rem);
  line-height: 1.5;
  color: #f0f0f0;
  max-width: 720px;
  margin: 0 auto 2.5rem auto;
  opacity: 0.95;
}

/* Buttons */
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  margin-top: 1rem;
}

.btn {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  font-weight: 600;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;                      /* softer modern pill shape */
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.22);
  opacity: 0.97;
}

.btn-primary {
  background: #001b4d;                      /* dark blue */
  color: white;
  border: 2px solid rgba(255,255,255,0.4);
}

.btn-secondary {
  background: rgba(255,255,255,0.95);
  color: #06264e;
  border: 2px solid #06264e;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ──────────────────────────────────
   RESPONSIVE BREAKPOINTS
─────────────────────────────────── */
@media (max-width: 1024px) {
  .title {
    font-size: clamp(3.4rem, 9vw, 4.8rem);
  }
  .subtitle {
    max-width: 90%;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 80vh;
  }
  
  .content {
    padding: 1.5rem 1rem;
  }
  
  .title {
    font-size: clamp(2.4rem, 10vw, 3.6rem);
  }
  
  .subtitle {
    font-size: clamp(1rem, 4vw, 1.15rem);
    margin-bottom: 2rem;
  }
  
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn {
    padding: 1rem 2.5rem;
    width: 100%;
    max-width: 320px;
  }
}
</style>