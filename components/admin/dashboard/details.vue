<template>
  <div class="dashboard_details">
    <div class="cards">
      <div class="card">
        <div class="card_info">
          <div class="p">Total Bookings</div>
          <div class="number">1,234</div>
          <div class="trend">+5% since last month</div>
        </div>
        <div class="icon">
          <i class="fas fa-calendar-check"></i>
        </div>
      </div>

      <div class="card">
        <div class="card_info">
          <div class="p">Active Halls</div>
          <div class="number">18</div>
          <div class="trend">+2 new this month</div>
        </div>
        <div class="icon">
          <i class="fas fa-building"></i>
        </div>
      </div>

      <div class="card">
        <div class="card_info">
          <div class="p">Total Revenue</div>
          <div class="number">$48,920</div>
          <div class="trend">+12% since last month</div>
        </div>
        <div class="icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
      </div>

      <div class="card">
        <div class="card_info">
          <div class="p">Pending Payments</div>
          <div class="number">7</div>
          <div class="trend negative">-3 this week</div>
        </div>
        <div class="icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // You can later fetch real data here
}
</script>

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