<!-- pages/admin/payments.vue -->
<template>
  <div class="payments-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>Payments</h1>
        <p>Manage invoices and financial reports</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value">$5,600</div>
        <div class="stat-icon purple">
          <i class="fas fa-dollar-sign"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Paid</div>
        <div class="stat-value">$3,500</div>
        <div class="stat-icon green">
          <i class="fas fa-chart-line"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Pending</div>
        <div class="stat-value">$1,800</div>
        <div class="stat-icon orange">
          <i class="fas fa-file-invoice-dollar"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Overdue</div>
        <div class="stat-value">$300</div>
        <div class="stat-icon red">
          <i class="fas fa-exclamation-circle"></i>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active">Invoices</button>
      <button class="tab">Financial Reports</button>
    </div>

    <!-- Table Section -->
    <div class="table-container">
      <h2 class="table-title">All Invoices</h2>
      <p class="table-subtitle">View and manage all payment invoices</p>

      <div class="table-wrapper">
        <table class="bookings-table">  <!-- reusing same table class -->
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Hall</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="invoice-num">{{ invoice.invoiceNumber }}</td>
              <td class="customer-cell">
                <div class="customer-name">{{ invoice.customer }}</div>
              </td>
              <td>{{ invoice.hall }}</td>
              <td class="amount-cell">{{ invoice.amount }}</td>
              <td class="date-cell">
                {{ invoice.dueDate }}<br />
                <span class="year">{{ invoice.year }}</span>
              </td>
              <td>
                <span :class="['status-badge', invoice.status]">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="action-btn view" title="View invoice">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn print" title="Download / Print">
                  <i class="fas fa-print"></i>
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
      invoices: [
        {
          id: 1,
          invoiceNumber: 'INV-2026-001',
          customer: 'Sarah Johnson',
          hall: 'Grand Ballroom',
          amount: '$2,500',
          dueDate: 'Feb 10, 2026',
          year: '2026',
          status: 'paid'
        },
        {
          id: 2,
          invoiceNumber: 'INV-2026-002',
          customer: 'Michael Chen',
          hall: 'Executive Conference Room',
          amount: '$1,000',
          dueDate: 'Feb 01, 2026',
          year: '2026',
          status: 'paid'
        },
        {
          id: 3,
          invoiceNumber: 'INV-2026-003',
          customer: 'Emily Davis',
          hall: 'Garden Pavilion',
          amount: '$1,800',
          dueDate: 'Feb 15, 2026',
          year: '2026',
          status: 'pending'
        },
        {
          id: 4,
          invoiceNumber: 'INV-2026-004',
          customer: 'James Wilson',
          hall: 'Intimate Lounge',
          amount: '$300',
          dueDate: 'Jan 25, 2026',
          year: '2026',
          status: 'overdue'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* ────────────────────────────────────────────────
   Most styles reused from bookings page — only new/changed added
   ──────────────────────────────────────────────── */

.payments-page {
  /* padding: 24px; */
  background: #f8fafc;
  min-height: 100vh;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;
}

.stat-label {
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: white;
}

.stat-icon.purple { background: #7c3aed; }
.stat-icon.green  { background: #10b981; }
.stat-icon.orange { background: #f59e0b; }
.stat-icon.red    { background: #ef4444; }

/* Tabs */
.tabs {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  padding: 12px 24px;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.tab.active {
  color: #7c3aed;
  border-bottom: 3px solid #7c3aed;
  font-weight: 600;
}

.tab:hover:not(.active) {
  color: #4b5563;
}

/* Table subtitle */
.table-subtitle {
  padding: 0 24px 16px;
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

/* Reused classes from bookings page */
.page-header,
.table-container,
.table-title,
.table-wrapper,
.bookings-table,
.status-badge,
.actions-cell,
.action-btn,
.customer-cell,
.customer-name,
.amount-cell,
.date-cell,
.year {
  /* all inherited from previous bookings page styles */
}

/* Status colors — extended for payments */
.status-badge.paid {
  background: #dcfce7;
  color: #166534;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.overdue {
  background: #fee2e2;
  color: #991b1b;
}

/* Action button - print */
.action-btn.print {
  color: #059669;
}

.action-btn.print:hover {
  background: #ecfdf5;
}

/* Responsive (same as bookings) */
@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }
}

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