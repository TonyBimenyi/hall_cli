<template>
  <footer class="footer">
    <div class="footer-container">

      <!-- Brand -->
      <div class="footer-col">
        <h3 class="footer-title">Elite Reception</h3>
        <p class="footer-text">
          Premium venue for unforgettable events. From intimate gatherings to grand celebrations.
        </p>

        <div class="footer-socials">
          <Icon icon="mdi:facebook" class="icon" />
          <Icon icon="mdi:instagram" class="icon" />
          <Icon icon="mdi:twitter" class="icon" />
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-col">
        <h3 class="footer-title">Quick Links</h3>
        <ul class="footer-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Services & Packages</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>

      <!-- Contact -->
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
      <div class="footer-col">
        <h3 class="footer-title">Newsletter</h3>

        <p class="footer-text">
          Subscribe for updates and special offers.
        </p>

        <input
          type="email"
          placeholder="Your email"
          class="newsletter-input"
        />

        <button class="newsletter-btn">Subscribe</button>
      </div>

    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      © {{ currentYear }} Elite Reception & Conference Hall. All rights reserved.
      <span class="policies">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </span>
    </div>
  </footer>
</template>

<script>

export default {
  name: "SiteFooter",


  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
}
</script>


<style scoped>
.footer {
  background: var(--primary-color);
  color: white;
  padding: 60px 40px 20px;
}

/* .footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  text-align: left !important;
} */

.footer-links,
.contact-list {
  text-align: left !important;
  padding-left: 0 !important;
}
.contact-list span{
    margin-left: 10px;
}

.footer-links li,
.contact-list li {
  list-style: none;
  margin-bottom: 10px;
  text-align: left !important;
}


.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin: auto;
  padding: var(--section-padding);
}
/* FIX CONTACT ALIGNMENT */
.contact-list {
  width: 100%;
  display: block !important;
  text-align: left !important;
  padding-left: 0 !important;
}

.contact-list li {
  display: block !important;
  text-align: left !important;
  color: #cfd6e4;
  margin-bottom: 12px;
}


.footer-title {
  color: var(--accent-color);
  font-size: var(--fs-xl);
  font-family: var(--font-secondary);
  margin-bottom: 18px;
  font-weight: 700;
}

.footer-text {
  color: #cfd6e4;
  font-size: var(--fs-base);
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-socials .icon {
  font-size: 1.4rem;
  margin-right: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.footer-socials .icon:hover {
  transform: scale(1.15);
}

.footer-links li {
  list-style: none;
  margin-bottom: 10px;
}

.footer-links a {
  color: #cfd6e4;
  text-decoration: none;
  transition: 0.3s;
}

.footer-links a:hover {
  color: #ffffff;
}

.contact-list li {
  list-style: none;
  margin-bottom: 12px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: #cfd6e4;
}

.contact-icon {
  font-size: 1.2rem;
  margin-top: 3px;
}

.newsletter-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.08);
  color: white;
  margin-bottom: 12px;
  outline: none;
}

.newsletter-input::placeholder {
  color: #a9b4c7;
}

.newsletter-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: white;
  color: #0A3A75;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.3s;
}

.newsletter-btn:hover {
  background: #eaeaea;
}

.footer-bottom {
  text-align: center;
  padding-top: 25px;
  margin-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.2);
  color: #cfd6e4;
  font-size: 0.9rem;
}

.policies a {
  color: #cfd6e4;
  margin-left: 15px;
  text-decoration: none;
}

.policies a:hover {
  color: white;
}
</style>
