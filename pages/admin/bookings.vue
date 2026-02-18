<!-- pages/admin/bookings.vue -->
<template>
  <div class="bookings-page">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>Bookings</h1>
        <p>Manage all hall reservations</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="search-wrapper">
        <input
          type="text"
          v-model="search"
          placeholder="Search bookings..."
          class="search-input"
        />
      </div>

      <div class="filter-wrapper">
        <select v-model="statusFilter" class="filter-select">
          <option value="">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="table-container">
      <h2 class="table-title">
        All Bookings ({{ filteredBookings.length }})
      </h2>

      <div class="table-wrapper">
        <table class="bookings-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Hall</th>
              <th>Event Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="7">Loading bookings...</td>
            </tr>

            <tr v-else-if="filteredBookings.length === 0">
              <td colspan="7">No bookings found.</td>
            </tr>

            <tr v-for="booking in filteredBookings" :key="booking.id">
              <td class="customer-cell">
                <div class="customer-name">
                  {{ booking.clients?.first_name }} {{ booking.clients?.last_name }}
                </div>
                <div class="customer-email">
                  {{ booking.clients?.email }}
                </div>
              </td>

              <td>{{ booking.halls?.name }}</td>

              <td>{{ booking.event_type }}</td>

              <td class="date-cell">
                {{ formatDate(booking.date_start) }}
                <br />
                <span class="year">
                  to {{ formatDate(booking.date_end) }}
                </span>
              </td>

              <td class="amount-cell">
                ${{ booking.total_cost }}
              </td>

              <td>
                <span :class="['status-badge', booking.status]">
                  {{ booking.status }}
                </span>
              </td>

              <td class="actions-cell">
                                <button class="action-btn view" title="View details">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Edit booking">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="action-btn delete"
                  @click="deleteBooking(booking.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
                
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>

<script>
import axios from "axios"

export default {
  data() {
    return {
      bookings: [],
      loading: false,
      search: "",
      statusFilter: ""
    }
  },

  computed: {
    filteredBookings() {
      return this.bookings.filter(b => {
        const matchesSearch =
          !this.search ||
          b.user?.first_name?.toLowerCase().includes(this.search.toLowerCase()) ||
          b.user?.last_name?.toLowerCase().includes(this.search.toLowerCase()) ||
          b.user?.email?.toLowerCase().includes(this.search.toLowerCase())

        const matchesStatus =
          !this.statusFilter || b.status === this.statusFilter

        return matchesSearch && matchesStatus
      })
    }
  },

  mounted() {
    this.fetchBookings()
  },

  methods: {

    async fetchBookings() {
  this.loading = true

  try {
    const token = localStorage.getItem("access_token")

    if (!token) {
      console.error("No token found")
      this.loading = false
      return
    }

    const res = await axios.get(
      "http://localhost:8000/api/bookings/",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log("Bookings response:", res.data)

    // If backend uses pagination
    if (res.data.results) {
      this.bookings = res.data.results
    } else {
      this.bookings = res.data
    }

  } catch (err) {
    console.error("Fetch error:", err.response || err)

  } finally {
    this.loading = false
  }
},


    async deleteBooking(id) {
      if (!confirm("Are you sure you want to delete this booking?")) return

      try {
        const token = localStorage.getItem("access_token")

        await axios.delete(
          `http://localhost:8000/api/bookings/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        this.bookings = this.bookings.filter(b => b.id !== id)

      } catch (err) {
        console.error("Failed to delete booking", err)
      }
    },

    formatDate(dateStr) {
      const d = new Date(dateStr)
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    }

  }
}
</script>

<style scoped>
/* KEEP ALL YOUR EXISTING CSS EXACTLY AS IT IS */
</style>


<style scoped>
.bookings-page {
  /* padding: 24px; */
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.page-header p {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}

.btn-new {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
}

.btn-new:hover {
  background: #6d28d9;
}

/* Controls */
.controls {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.search-wrapper {
  flex: 1;
  min-width: 280px;
  position: relative;
}

.search-input {
  width: 95%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

/* Add magnifying glass via Font Awesome instead of background image */
.search-wrapper::before {
  content: "\f002";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1.1rem;
  pointer-events: none;
}

.filter-wrapper {
  min-width: 180px;
}

.filter-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px;
}

/* Table */
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  overflow: hidden;
}

.table-title {
  padding: 20px 24px;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

.table-wrapper {
  overflow-x: auto;
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.bookings-table th,
.bookings-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.bookings-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  font-size: 0.82rem;
  letter-spacing: 0.4px;
}

.customer-cell {
  line-height: 1.45;
}

.customer-name {
  font-weight: 600;
  color: #1f2937;
}

.customer-email {
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 4px;
}

.date-cell {
  white-space: nowrap;
}

.year {
  color: #6b7280;
  font-size: 0.88rem;
}

.time-cell {
  white-space: nowrap;
  color: #374151;
}

.amount-cell {
  font-weight: 600;
  color: #1e40af;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
}

.status-badge.confirmed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.actions-cell {
  white-space: nowrap;
  text-align: center;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 6px 8px;
  margin: 0 2px;
  color: #6b7280;
  border-radius: 6px;
  transition: all 0.15s;
}

.action-btn:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.action-btn.view   { color: #3b82f6; }
.action-btn.edit   { color: #f59e0b; }
.action-btn.delete { color: #ef4444; }

/* Responsive */
@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-new {
    width: fit-content;
    align-self: flex-end;
  }
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  .bookings-table th,
  .bookings-table td {
    padding: 12px 14px;
  }
}
</style> 