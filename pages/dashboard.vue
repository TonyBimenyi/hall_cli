<template>
  <div class="dashboard">

    <!-- Header -->
    <h1 class="welcome">Welcome, {{ userFirstName || 'User' }} {{ userLastName || 'User' }}!</h1>
    <p class="subtitle">Manage your bookings and profile</p>

    <!-- Content container -->
    <div class="content-box">
      <div class="header-row">
        <h2 class="section-title">Your Bookings</h2>
        <button class="new-booking-btn" @click="goToNewBooking">New Booking</button>
      </div>

      <!-- Booking list -->
      <div class="booking-list">
        <div 
          class="booking-card" 
          v-for="booking in bookings" 
          :key="booking.id"
        >
          <div class="card-header">
            <span class="type">{{ booking.event_type || 'Event' }}</span>
            <span :class="['status', booking.status]">{{ booking.status }}</span>
          </div>

          <!-- Booking Reference Number -->
          <div class="booking-ref">
            <strong>Booking Ref:</strong> {{ formatBookingRef(booking) }}
          </div>

          <div class="card-body">
            <p><strong>Start:</strong> {{ booking.date_start || '—' }}</p>
            <p><strong>End:</strong> {{ booking.date_end || '—' }}</p>
            <p><strong>Total Price:</strong> ${{ booking.total_cost || 0 }}</p>
            <p><strong>Notes:</strong> {{ booking.notes || '—' }}</p>
          </div>

          <div class="card-footer">
            <button 
              class="cancel-btn" 
              @click="deleteBooking(booking.id)"
            >
              Cancel
            </button>
          </div>
        </div>

        <p v-if="bookings.length === 0" class="no-bookings">You have no bookings yet.</p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { useUser } from '~/composables/useUser'
import { notify } from '~/composables/useNotification'

export default {
  name: 'Dashboard',
  data() {
    return {
      userFirstName: '',
      userLastName: '',
      bookings: [],
      userId: null,
    }
  },
  mounted() {
    const user = useUser()
    this.userFirstName = user.getFirstName() || ''
    this.userLastName = user.getLastName() || ''

    // Get user ID from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    this.userId = storedUser.id || null

    if (this.userId) this.fetchBookings()
  },

  methods: {
    goToNewBooking() {
      this.$router.push('/booking') // adjust route if needed
    },

    async fetchBookings() {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) throw new Error('No access token found')
        if (!this.userId) throw new Error('No user ID found')

        const res = await axios.get(`http://localhost:8000/api/bookings/?user=${this.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        // Only keep bookings of logged-in user
        this.bookings = Array.isArray(res.data) ? res.data : []

      } catch (err) {
        console.error('Failed to fetch bookings:', err)
        notify('Failed to load your bookings. Please try again later.', 'danger')
      }
    },

    async deleteBooking(bookingId) {
      if (!confirm('Are you sure you want to delete this booking?')) return
      try {
        const token = localStorage.getItem('access_token')
        if (!token) throw new Error('No access token found')

        await axios.delete(`http://localhost:8000/api/bookings/${bookingId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        // Remove booking from local array
        this.bookings = this.bookings.filter(b => b.id !== bookingId)
        notify('Booking deleted successfully.', 'success')

      } catch (err) {
        console.error('Failed to delete booking:', err)
        notify('Failed to delete booking. Please try again.', 'danger')
      }
    },

    formatBookingRef(booking) {
      if (!booking.date_start || !booking.date_end || !booking.id) return '—'
      const start = booking.date_start.replace(/-/g,'')
      const end = booking.date_end.replace(/-/g,'')
      return `${start}-${end}-#${booking.id}`
    }
  }
}
</script>

<style scoped>
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
  flex-direction: column;
  gap: 20px;
}

.booking-card {
  border: 1px solid #ebeff5;
  border-radius: 12px;
  padding: 20px;
  background-color: #f9f9f9;
  width: 90%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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
  text-transform: capitalize;
}

.status.pending {
  background-color: #f59e0b;
}

.status.confirmed {
  background-color: #10b981;
}

.status.cancelled {
  background-color: #ef4444;
}

.booking-ref {
  font-size: 14px;
  margin-bottom: 8px;
  color: #374151;
}

.card-body p {
  margin: 4px 0;
}

.card-footer {
  margin-top: 12px;
}

.cancel-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.cancel-btn:hover {
  background: #dc2626;
}

.no-bookings {
  color: #6b7280;
  text-align: center;
  margin-top: 20px;
  font-style: italic;
}
</style>
