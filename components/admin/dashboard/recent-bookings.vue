<template>
  <div class="recent-bookings">
    <div class="section-header">
      <h2>
        <i class="fas fa-clock"></i>
        Recent Bookings
      </h2>
      <p>Latest hall reservations and their current status</p>
    </div>

    <div v-if="bookings.length === 0" class="empty-state">
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
            {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
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
export default {
  data() {
    return {
      bookings: [
        {
          id: 1,
          event_type: 'Wedding Reception',
          status: 'confirmed',
          date_start: '2026-03-15',
          date_end: '2026-03-16',
          total_cost: 7200
        },
        {
          id: 2,
          event_type: 'Corporate Seminar',
          status: 'pending',
          date_start: '2026-03-22',
          date_end: '2026-03-22',
          total_cost: 3400
        },
        {
          id: 3,
          event_type: 'Birthday Celebration',
          status: 'canceled',
          date_start: '2026-03-28',
          date_end: '2026-03-28',
          total_cost: 1800
        },
        // ─── Newly added 4 bookings ───
        {
          id: 5,
          event_type: 'Charity Gala Dinner',
          status: 'confirmed',
          date_start: '2026-04-12',
          date_end: '2026-04-12',
          total_cost: 8900
        },
        {
          id: 6,
          event_type: 'Training Workshop',
          status: 'pending',
          date_start: '2026-04-18',
          date_end: '2026-04-19',
          total_cost: 2800
        },
        {
          id: 7,
          event_type: 'Cultural Festival',
          status: 'confirmed',
          date_start: '2026-04-25',
          date_end: '2026-04-26',
          total_cost: 6500
        }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
/* ────────────────────────────────────────────────
   The <style> section remains exactly the same as before
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
/* Empty state */
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
/* Grid */
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
/* Card */
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
.status-badge.canceled {
  background: #fee2e2;
  color: #991b1b;
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