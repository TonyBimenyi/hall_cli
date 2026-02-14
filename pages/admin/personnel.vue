<!-- pages/admin/personnel.vue -->
<template>
  <div class="personnel-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>Personnel</h1>
        <p>Manage staff and schedules</p>
      </div>
      <button class="btn-add">
        <i class="fas fa-plus"></i>
        Add Staff
      </button>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active">Staff Directory</button>
      <button class="tab">Shift Schedule</button>
    </div>

    <!-- Search -->
    <div class="search-wrapper">
      <input
        type="text"
        placeholder="Search staff..."
        class="search-input"
      />
    </div>

    <!-- Staff Grid -->
    <div class="staff-grid">
      <div
        v-for="staff in personnel"
        :key="staff.id"
        class="staff-card"
      >
        <div class="card-header">
          <div class="avatar-circle" :class="staff.avatarColor">
            {{ staff.initials }}
          </div>
          <button class="edit-btn" title="Edit staff">
            <i class="fas fa-pencil-alt"></i>
          </button>
        </div>

        <div class="staff-name">{{ staff.name }}</div>
        <div class="staff-role" :class="staff.roleColor">
          {{ staff.role }}
        </div>

        <div class="staff-contact">
          <div class="contact-row">
            <i class="fas fa-envelope"></i>
            {{ staff.email }}
          </div>
          <div class="contact-row">
            <i class="fas fa-phone"></i>
            {{ staff.phone }}
          </div>
        </div>

        <div class="staff-meta">
          <div class="hired-date">
            Hired: {{ staff.hired }}
          </div>
          <span :class="['status-badge', staff.status.toLowerCase()]">
            {{ staff.status }}
          </span>
        </div>
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
      personnel: [
        {
          id: 1,
          initials: 'RM',
          avatarColor: 'purple',
          name: 'Robert Martinez',
          role: 'manager',
          roleColor: 'purple-role',
          email: 'robert@hallreception.com',
          phone: '+1 555-0201',
          hired: 'Mar 2022',
          status: 'Active'
        },
        {
          id: 2,
          initials: 'JL',
          avatarColor: 'blue',
          name: 'Jennifer Lee',
          role: 'receptionist',
          roleColor: 'blue-role',
          email: 'jennifer@hallreception.com',
          phone: '+1 555-0202',
          hired: 'Jun 2023',
          status: 'Active'
        },
        {
          id: 3,
          initials: 'DT',
          avatarColor: 'green',
          name: 'David Thompson',
          role: 'technician',
          roleColor: 'green-role',
          email: 'david@hallreception.com',
          phone: '+1 555-0203',
          hired: 'Sep 2023',
          status: 'Active'
        },
        {
          id: 4,
          initials: 'MG',
          avatarColor: 'orange',
          name: 'Maria Garcia',
          role: 'cleaner',
          roleColor: 'orange-role',
          email: 'maria@hallreception.com',
          phone: '+1 555-0204',
          hired: 'Jan 2024',
          status: 'Active'
        },
        {
          id: 5,
          initials: 'KB',
          avatarColor: 'red',
          name: 'Kevin Brown',
          role: 'security',
          roleColor: 'red-role',
          email: 'kevin@hallreception.com',
          phone: '+1 555-0205',
          hired: 'Nov 2023',
          status: 'Inactive'
        }
      ]
    }
  }
}
</script>

<style scoped>
.personnel-page {
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

.btn-add {
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

.btn-add:hover {
  background: #6d28d9;
}

/* Tabs */
.tabs {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  padding: 12px 28px;
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

/* Search */
.search-wrapper {
  max-width: 420px;
  margin-bottom: 32px;
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

/* Staff Grid */
.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.staff-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 24px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: all 0.18s ease;
}

.staff-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  border-color: #d1d5db;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.avatar-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
}

.avatar-circle.purple { background: #7c3aed; }
.avatar-circle.blue   { background: #3b82f6; }
.avatar-circle.green  { background: #10b981; }
.avatar-circle.orange { background: #f59e0b; }
.avatar-circle.red    { background: #ef4444; }

.edit-btn {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}

.edit-btn:hover {
  color: #7c3aed;
  background: #f1f5f9;
}

.staff-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.staff-role {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 16px;
}

.purple-role { background: #f3e8ff; color: #6b21a8; }
.blue-role   { background: #dbeafe; color: #1d4ed8; }
.green-role  { background: #d1fae5; color: #065f46; }
.orange-role { background: #fef3c7; color: #92400e; }
.red-role    { background: #fee2e2; color: #991b1b; }

.staff-contact {
  margin-bottom: 16px;
  color: #4b5563;
  font-size: 0.95rem;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.contact-row i {
  width: 18px;
  color: #6b7280;
}

.staff-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.hired-date {
  color: #6b7280;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #f3f4f6;
  color: #4b5563;
}

/* Responsive */
@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-add {
    width: fit-content;
    align-self: flex-end;
  }
}

@media (max-width: 768px) {
  .staff-grid {
    grid-template-columns: 1fr;
  }
}
</style>