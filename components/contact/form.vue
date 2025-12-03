<template>
  <div class="contact-container">

    <!-- LEFT FORM -->
    <div class="contact-form">
      <h2>Send Us a Message</h2>
      <p class="subtitle">Fill the form and we will reach out shortly.</p>

      <label>Full Name *</label>
      <input type="text" placeholder="John Doe" />

      <label>Email *</label>
      <input type="email" placeholder="john@example.com" />

      <label>Phone</label>
      <input type="text" placeholder="(555) 123-4567" />

      <label>Message *</label>
      <textarea placeholder="Write your message..."></textarea>

      <button class="submit-btn">Send Message</button>
    </div>

    <!-- RIGHT INFO -->
    <div class="info-section">

      <div class="info-card">
        <div class="icon">
          <span class="iconify" data-icon="mdi:map-marker"></span>
        </div>
        <div>
          <h3>Address</h3>
          <p>123 Elite Avenue<br/>Downtown City, ST 12345</p>
        </div>
      </div>

      <div class="info-card">
        <div class="icon">
          <span class="iconify" data-icon="mdi:phone"></span>
        </div>
        <div>
          <h3>Phone</h3>
          <p>Main: (555) 123-4567<br/>Events: (555) 123-4568</p>
        </div>
      </div>

      <div class="info-card">
        <div class="icon">
          <span class="iconify" data-icon="mdi:email"></span>
        </div>
        <div>
          <h3>Email</h3>
          <p>info@elitereception.com<br/>bookings@elitereception.com</p>
        </div>
      </div>

      <div class="info-card">
        <div class="icon">
          <span class="iconify" data-icon="mdi:clock-outline"></span>
        </div>
        <div>
          <h3>Hours</h3>
          <p>Mon–Fri: 9 AM – 6 PM<br/>Sat: 10 AM – 4 PM</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  
};
</script>

<style scoped>
/* MAIN LAYOUT */
.contact-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  /* width: 100%; */
  padding: var(--section-padding);
  background: #f7f9fc;
  flex-wrap: wrap;
}


.contact-form {
  background: white;
  padding: 30px;
  width: 40%;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.contact-form h2 {
  font-size: 26px;
  font-weight: bold;
  color: #061b49;
}

.subtitle {
  margin-bottom: 20px;
  color: #555;
}

.contact-form label {
  font-weight: 600;
  margin-top: 15px;
  display: block;
}

.contact-form input,
.contact-form textarea {
  width: 95%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
}

.contact-form textarea {
  height: 120px;
  resize: none;
}

.submit-btn {
  width: 60%;
  background: #061b49;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 10px;
  margin-top: 25px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #08306b;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
}

.info-card {
  /* display: flex; */
  gap: 15px;
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 16px;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.icon {
  background: #061b49;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon .iconify {
  color: white;
  font-size: 22px;
}
/* 
.info-card h3 {
  font-size: 18px;
  margin-bottom: 3px;
  font-weight: bold;
}

.info-card p {
  font-size: 14px;
  color: #555;
} */

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
</style>
