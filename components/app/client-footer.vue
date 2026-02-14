<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Brand & Description -->
      <div class="footer-col brand-col">
        <h3 class="footer-title">Elite Reception</h3>
        <p class="footer-text">
          Premium venue for unforgettable events — from intimate gatherings to grand celebrations.
        </p>
        <div class="footer-socials">
          <a href="#" aria-label="Facebook"><Icon icon="mdi:facebook" class="social-icon" /></a>
          <a href="#" aria-label="Instagram"><Icon icon="mdi:instagram" class="social-icon" /></a>
          <a href="#" aria-label="Twitter/X"><Icon icon="mdi:twitter" class="social-icon" /></a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-col">
        <h3 class="footer-title">Quick Links</h3>
        <ul class="footer-links">
          <li><NuxtLink to="/about">About Us</NuxtLink></li>
          <li><NuxtLink to="/services">Services & Packages</NuxtLink></li>
          <li><NuxtLink to="/gallery">Gallery</NuxtLink></li>
          <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-col">
        <h3 class="footer-title">Contact</h3>
        <ul class="contact-list">
          <li>
            <Icon icon="mdi:map-marker" class="contact-icon" />
            <span>123 Elite Avenue, Downtown City, ST 12345</span>
          </li>
          <li>
            <Icon icon="mdi:phone" class="contact-icon" />
            <span>(555) 123-4567</span>
          </li>
          <li>
            <Icon icon="mdi:email" class="contact-icon" />
            <span>info@elitereception.com</span>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-col newsletter-col">
        <h3 class="footer-title">Newsletter</h3>
        <p class="footer-text">
          Subscribe for exclusive updates, venue news & special offers.
        </p>
        <form class="newsletter-form" @submit.prevent="handleSubscribe">
          <input
            type="email"
            placeholder="Your email address"
            class="newsletter-input"
            required
          />
          <button type="submit" class="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p>
        © {{ currentYear }} Elite Reception & Conference Hall. All rights reserved.
      </p>
      <div class="policies">
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms">Terms of Service</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    handleSubscribe() {
      // Add your newsletter subscription logic here (e.g. API call)
      alert('Thank you for subscribing! (Demo)')
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--primary-color); /* dark blue */
  color: white;
  padding: clamp(4rem, 8vw, 6rem) 0 2rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1.3fr;
  }
}

.footer-col {
  text-align: left;
}

.footer-title {
  font-family: var(--font-secondary);
  font-size: clamp(1.4rem, 3vw, 1.65rem);
  font-weight: 700;
  color: var(--accent-color); /* gold */
  margin-bottom: 1.4rem;
}

.footer-text {
  font-size: 1rem;
  line-height: 1.65;
  color: #d1d9e6;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

/* Social Icons */
.footer-socials {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.social-icon {
  font-size: 1.6rem;
  color: #d1d9e6;
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: var(--accent-color);
  transform: scale(1.15) translateY(-2px);
}

/* Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.9rem;
}

.footer-links a,
.policies a {
  color: #d1d9e6;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.25s ease;
}

.footer-links a:hover,
.policies a:hover {
  color: white;
  padding-left: 4px;
}

/* Contact */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  margin-bottom: 1.1rem;
  font-size: 1rem;
  color: #d1d9e6;
}

.contact-icon {
  font-size: 1.35rem;
  color: var(--accent-color);
  margin-top: 3px;
}

/* Newsletter */
.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.newsletter-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.07);
  color: white;
  font-size: 1rem;
}

.newsletter-input::placeholder {
  color: #a8b5cc;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(212,160,23,0.15);
}

.newsletter-btn {
  width: 100%;
  padding: 0.95rem;
  background: white;
  color: var(--primary-color);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

/* Bottom Bar */
.footer-bottom {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.15);
  text-align: center;
  font-size: 0.92rem;
  color: #c3cee0;
}

.footer-bottom p {
  margin: 0 0 0.8rem;
}

.policies {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .footer-container {
    gap: 2.5rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
}
</style>