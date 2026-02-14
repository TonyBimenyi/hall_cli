<!-- pages/admin/bookings.vue -->
<template>
  <div class="bookings-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>Bookings</h1>
        <p>Manage all hall reservations</p>
      </div>
      <button class="btn-new">
        <i class="fas fa-plus"></i>
        New Booking
      </button>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="search-wrapper">
        <input
          type="text"
          placeholder="Search bookings..."
          class="search-input"
        />
      </div>
      <div class="filter-wrapper">
        <select class="filter-select">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-container">
      <h2 class="table-title">All Bookings ({{ bookings.length }})</h2>

      <div class="table-wrapper">
        <table class="bookings-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Hall</th>
              <th>Event Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td class="customer-cell">
                <div class="customer-name">{{ booking.customer }}</div>
                <div class="customer-email">{{ booking.email }}</div>
              </td>
              <td>{{ booking.hall }}</td>
              <td>{{ booking.eventType }}</td>
              <td class="date-cell">
                {{ booking.dateDay }}<br />
                <span class="year">{{ booking.year }}</span>
              </td>
              <td class="time-cell">{{ booking.time }}</td>
              <td class="amount-cell">{{ booking.amount }}</td>
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
                <button class="action-btn delete" title="Cancel / Delete">
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
export default {
  data() {
    return {
      bookings: [
        {
          id: 1,
          customer: 'Sarah Johnson',
          email: 'sarah@email.com',
          hall: 'Grand Ballroom',
          eventType: 'Wedding Reception',
          dateDay: 'Feb 15, 2026',
          year: '2026',
          time: '18:00 – 23:00',
          amount: '$2,500',
          status: 'confirmed'
        },
        {
          id: 2,
          customer: 'Michael Chen',
          email: 'mchen@corp.com',
          hall: 'Executive Conference Room',
          eventType: 'Corporate Meeting',
          dateDay: 'Feb 05, 2026',
          year: '2026',
          time: '09:00 – 17:00',
          amount: '$1,000',
          status: 'confirmed'
        },
        {
          id: 3,
          customer: 'Emily Davis',
          email: 'emily@email.com',
          hall: 'Garden Pavilion',
          eventType: 'Birthday Party',
          dateDay: 'Feb 20, 2026',
          year: '2026',
          time: '14:00 – 20:00',
          amount: '$1,800',
          status: 'pending'
        },
        {
          id: 4,
          customer: 'James Wilson',
          email: 'jwilson@email.com',
          hall: 'Intimate Lounge',
          eventType: 'Private Dinner',
          dateDay: 'Feb 10, 2026',
          year: '2026',
          time: '19:00 – 22:00',
          amount: '$300',
          status: 'confirmed'
        },
        {
          id: 5,
          customer: 'Lisa Anderson',
          email: 'lisa@startup.io',
          hall: 'Executive Conference Room',
          eventType: 'Product Launch',
          dateDay: 'Feb 08, 2026',
          year: '2026',
          time: '10:00 – 16:00',
          amount: '$900',
          status: 'cancelled'
        }
      ]
    }
  }
}
</script>

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
  width: 100%;
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