<template>
  <div class="dashboard_details">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading dashboard data...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchDashboardData" class="retry-btn">Retry</button>
    </div>

    <div v-else class="cards">
      <div class="card">
        <div class="card_info">
          <div class="p">Total Bookings</div>
          <div class="number">{{ totalBookings.toLocaleString() }}</div>
          <div class="trend">Updated just now</div>
        </div>
        <div class="icon">
          <i class="fas fa-calendar-check"></i>
        </div>
      </div>

      <div class="card">
        <div class="card_info">
          <div class="p">Active Halls</div>
          <div class="number">{{ activeHalls }}</div>
          <div class="trend">Available for booking</div>
        </div>
        <div class="icon">
          <i class="fas fa-building"></i>
        </div>
      </div>

      <div class="card">
        <div class="card_info">
          <div class="p">Total Revenue</div>
          <div class="number">${{ Number(totalRevenue).toLocaleString() }}</div>
          <div class="trend">All time (paid only)</div>
        </div>
        <div class="icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
      </div>

      <div class="card">
        <div class="card_info">
          <div class="p">Pending Payments</div>
          <div class="number">{{ pendingPayments }}</div>
          <div class="trend" :class="{ negative: pendingPayments > 5 }">
            {{ pendingPayments > 5 ? 'High attention needed' : 'Manage soon' }}
          </div>
        </div>
        <div class="icon">
          <i class="fas fa-exclamation-circle"></i>
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
      loading: true,
      error: null,

      totalBookings: 0,
      activeHalls: 0,
      totalRevenue: 0,
      pendingPayments: 0
    }
  },

  mounted() {
    this.fetchDashboardData()
  },

  methods: {
    async fetchDashboardData() {
      this.loading = true
      this.error = null

      try {
        const token = localStorage.getItem('access_token')
        if (!token) {
          throw new Error('No authentication token')
        }

        // 1. Fetch bookings
        const bookingsRes = await axios.get('http://localhost:8000/api/bookings/', {
          headers: { Authorization: `Bearer ${token}` }
        })

        const bookings = bookingsRes.data.results || bookingsRes.data
        this.totalBookings = bookings.length

        // 2. Fetch payments (for revenue & pending)
        const paymentsRes = await axios.get('http://localhost:8000/api/payments/', {
          headers: { Authorization: `Bearer ${token}` }
        })

        const payments = paymentsRes.data.results || paymentsRes.data

        // Calculate revenue (only 'paid' payments)
        let revenue = 0
        let pending = 0
        payments.forEach(p => {
          const amount = Number(p.amount || 0)
          if (p.status === 'paid') {
            revenue += amount
          } else if (p.status === 'pending') {
            pending++
          }
        })

        this.totalRevenue = revenue
        this.pendingPayments = pending

        // 3. Optional: Fetch halls (for active count)
        // If you have /api/halls/ endpoint
        try {
          const hallsRes = await axios.get('http://localhost:8000/api/halls/', {
            headers: { Authorization: `Bearer ${token}` }
          })
          const halls = hallsRes.data.results || hallsRes.data
          this.activeHalls = halls.length
        } catch (hallErr) {
          console.warn('Could not load halls count', hallErr)
          this.activeHalls = '—'
        }

        notify('Dashboard data loaded successfully', 'success')
      } catch (err) {
        console.error('Dashboard fetch error:', err)
        this.error = 'Failed to load dashboard data. Please check your connection.'
        notify(this.error, 'danger')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.dashboard_details {
  margin-top: 24px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 300px;
  min-width: 260px;
  max-width: 340px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.card_info .p {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card_info .number {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 6px 0 4px;
}

.card_info .trend {
  font-size: 13px;
  font-weight: 500;
}

.card_info .trend.negative {
  color: #ef4444;
}

.icon {
  background: #061b49;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon i {
  color: white;
  font-size: 26px;
}

/* ─── Loading & Error States ─── */
.loading-state,
.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.loading-state .spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #7c3aed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  color: #ef4444;
}

.retry-btn {
  margin-top: 16px;
  padding: 10px 20px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* ─── Responsive Adjustments ─── */
@media (min-width: 768px) {
  .cards {
    gap: 24px;
  }
  .card {
    flex: 1 1 45%;
  }
}

@media (min-width: 1024px) {
  .cards {
    gap: 28px;
  }
  .card {
    flex: 1 1 22%;
  }
  .card_info .number {
    font-size: 32px;
  }
  .icon {
    width: 64px;
    height: 64px;
  }
  .icon i {
    font-size: 30px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 20px 16px;
  }
  .card_info .number {
    font-size: 24px;
  }
  .icon {
    width: 48px;
    height: 48px;
  }
  .icon i {
    font-size: 22px;
  }
}
</style>

<style scoped>
.dashboard_details {
  margin-top: 24px;
  /* padding: 0 16px; */
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* centers on very small screens */
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 300px;          /* ← key for responsiveness */
  min-width: 260px;
  max-width: 340px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.card_info .p {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card_info .number {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 6px 0 4px;
}

.card_info .trend {
  font-size: 13px;
  font-weight: 500;
}

.card_info .trend.negative {
  color: #ef4444;
}

.icon {
  background: #061b49;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon i {
  color: white;
  font-size: 26px;
}

/* ─── Responsive Adjustments ─── */

/* Tablets & small laptops */
@media (min-width: 768px) {
  .dashboard_details {
    /* padding: 0 24px; */
  }
  
  .cards {
    gap: 24px;
  }
  
  .card {
    flex: 1 1 45%;           /* 2 columns */
    max-width: none;
  }
}

/* Desktops & large screens */
@media (min-width: 1024px) {
  .cards {
    gap: 28px;
  }
  
  .card {
    flex: 1 1 22%;           /* ≈ 4 columns */
    max-width: none;
  }
  
  .card_info .number {
    font-size: 32px;
  }
  
  .icon {
    width: 64px;
    height: 64px;
  }
  
  .icon i {
    font-size: 30px;
  }
}

/* Very small mobile (portrait phones < 480px) */
@media (max-width: 480px) {
  .card {
    padding: 20px 16px;
  }
  
  .card_info .number {
    font-size: 24px;
  }
  
  .icon {
    width: 48px;
    height: 48px;
  }
  
  .icon i {
    font-size: 22px;
  }
}
</style>