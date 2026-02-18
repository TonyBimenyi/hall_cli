<template>
  <div class="recent-bookings">
    <div class="section-header">
      <h2>
        <i class="fas fa-clock"></i>
        Recent Bookings
      </h2>
      <p>Latest hall reservations and their current status</p>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading recent bookings...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ error }}</p>
      <button @click="fetchRecentBookings" class="retry-btn">Try Again</button>
    </div>

    <div v-else-if="bookings.length === 0" class="empty-state">
      <i class="far fa-calendar-alt"></i>
      <p>No recent bookings found</p>
    </div>

    <div v-else class="bookings-grid">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-card"
      >
        <div class="card-header">
          <div class="event-type">
            <i class="fas fa-calendar-check"></i>
            {{ booking.event_type || 'Event' }}
          </div>
          <span :class="['status-badge', booking.status]">
            {{ formatStatus(booking.status) }}
          </span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="label">Reference</span>
            <span class="value">{{ formatBookingRef(booking) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Start</span>
            <span class="value">{{ formatDate(booking.date_start) || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="label">End</span>
            <span class="value">{{ formatDate(booking.date_end) || '—' }}</span>
          </div>
          <div class="info-row price-row">
            <span class="label">Total</span>
            <span class="value price">
              ${{ Number(booking.total_cost || 0).toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { notify } from '~/composables/useNotification'

export default {
  data() {
    return {
      bookings: [],
      loading: false,
      error: null
    }
  },

  mounted() {
    this.fetchRecentBookings()
  },

  methods: {
    async fetchRecentBookings() {
      this.loading = true
      this.error = null

      try {
        const token = localStorage.getItem('access_token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const res = await axios.get('http://localhost:8000/api/bookings/', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            // Optional: limit to recent bookings (last 30 days for example)
            ordering: '-created',   // newest first
            page_size: 10           // show latest 10
          }
        })

        this.bookings = res.data.results || res.data

        if (this.bookings.length === 0) {
          notify('No recent bookings found', 'info')
        }
      } catch (err) {
        console.error('Failed to fetch recent bookings:', err)
        this.error = 'Could not load recent bookings. Please try again later.'
        notify(this.error, 'danger')
      } finally {
        this.loading = false
      }
    },

    formatBookingRef(booking) {
      return `REF-${booking.id.toString().padStart(5, '0')}`
    },

    formatDate(dateStr) {
      if (!dateStr) return null
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      } catch {
        return dateStr
      }
    },

    // Improved status display (consistent with other pages)
    formatStatus(status) {
      const map = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        partial: 'Partially Paid',
        paid: 'Fully Paid',
        completed: 'Completed',
        cancelled: 'Cancelled',
        refunded: 'Refunded'
      }
      return map[status] || status.charAt(0).toUpperCase() + status.slice(1)
    }
  }
}
</script>

<style scoped>
/* ────────────────────────────────────────────────
   Your original styles remain exactly the same
   ──────────────────────────────────────────────── */
.recent-bookings {
  margin-top: 32px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.section-header h2 i {
  color: #6366f1;
}

.section-header p {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

/* Loading & Error states (new) */
.loading-state,
.error-state {
  text-align: center;
  padding: 60px 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.loading-state .spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state i {
  font-size: 3rem;
  color: #ef4444;
  margin-bottom: 16px;
}

.error-state p {
  color: #ef4444;
  font-size: 1.1rem;
  margin: 0 0 16px;
}

.retry-btn {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.retry-btn:hover {
  background: #4f46e5;
}

/* Empty state (unchanged) */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.empty-state i {
  font-size: 3.5rem;
  color: #d1d5db;
  margin-bottom: 16px;
}

.empty-state p {
  color: #6b7280;
  font-size: 1.1rem;
}

/* Grid & Card styles (unchanged) */
.bookings-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .bookings-grid {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  }
}

.booking-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.18s ease;
}

.booking-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}

.card-header {
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.event-type {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #1f2937;
  font-size: 1.05rem;
}

.event-type i {
  color: #6366f1;
  font-size: 1.3rem;
}

.status-badge {
  font-size: 0.82rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  text-transform: capitalize;
}

.status-badge.confirmed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.canceled,
.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.paid {
  background: #dcfce7;
  color: #166534;
}

.status-badge.partial {
  background: #fef3c7;
  color: #92400e;
}

.card-body {
  padding: 18px 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.label {
  color: #6b7280;
  font-weight: 500;
}

.value {
  font-weight: 500;
  color: #1f2937;
}

.price-row {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.price {
  font-size: 1.18rem;
  font-weight: 700;
  color: #1e40af;
}
</style>