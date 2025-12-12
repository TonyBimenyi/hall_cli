<template>
  <div class="dashboard">

    <!-- Header -->
    <h1 class="welcome">Welcome, {{ userFirstName || 'User' }} {{ userLastName || 'User' }}!</h1>
    <p class="subtitle">Manage your bookings and profile</p>

    <!-- Content container -->
    <div class="content-box">
      <div class="header-row">
        <h2 class="section-title">Your Bookings</h2>
        <button class="new-booking-btn">New Booking</button>
      </div>

      <!-- Booking list -->
      <div class="booking-list">
        <!-- Booking card 1 -->
        <div class="booking-card">
          <div class="card-header">
            <span class="type">Wedding</span>
            <span class="status pending">Pending</span>
          </div>
          <div class="card-body">
            <p><strong>Date:</strong> 26/11/2025</p>
            <p><strong>Time:</strong> 23:37</p>
            <p><strong>Guests:</strong> 117</p>
            <p><strong>Price:</strong> $500</p>
            <p><strong>Plan:</strong> Basic Conference</p>
          </div>
        </div>

        <!-- Booking card 2 -->
        <div class="booking-card">
          <div class="card-header">
            <span class="type">Corporate</span>
            <span class="status pending">Pending</span>
          </div>
          <div class="card-body">
            <p><strong>Date:</strong> 26/11/2025</p>
            <p><strong>Time:</strong> 16:07</p>
            <p><strong>Guests:</strong> 456</p>
            <p><strong>Price:</strong> $500</p>
            <p><strong>Plan:</strong> Basic Conference</p>
          </div>
        </div>

        <!-- Booking card 3 -->
        <div class="booking-card">
          <div class="card-header">
            <span class="type">Corporate</span>
            <span class="status pending">Pending</span>
          </div>
          <div class="card-body">
            <p><strong>Date:</strong> 27/11/2025</p>
            <p><strong>Time:</strong> 03:22</p>
            <p><strong>Guests:</strong> 63</p>
            <p><strong>Price:</strong> $1200</p>
            <p><strong>Plan:</strong> Premium Event</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      userFirstName: '',
      userLastName: ''
    }
  },
  mounted() {
    this.userFirstName = useUser().getFirstName()
    this.userLastName = useUser().getLastName()
  }
}
</script>


<style scoped>
/* ...keep existing styles... */
</style>

<style scoped>
/* Keep your existing styles */
.dashboard {
    margin-top: 50px;
  padding: 40px;
  font-family: 'Inter', sans-serif;
  color: #1e2949;
}

.welcome {
  font-size: 48px;
  font-weight: 700;
}

.subtitle {
  margin-top: 8px;
  color: #6b7280;
}

.content-box {
  margin-top: 40px;
  background: #fff;
  padding: 30px;
  border-radius: 14px;
  border: 1px solid #ebeff5;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
}

.new-booking-btn {
  background: #11294d;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.new-booking-btn:hover {
  background: #0d203e;
}

.booking-list {
  margin-top: 25px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
}

/* Booking card styles */
.booking-card {
  border: 1px solid #ebeff5;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  background-color: #f9f9f9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.type {
  font-weight: 700;
  font-size: 18px;
}

.status {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
}

.status.pending {
  background-color: #f59e0b; /* orange */
}

.card-body p {
  margin: 4px 0;
}
</style>
