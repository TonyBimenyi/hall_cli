<template>
  <section class="booking-section">
    <div class="container">
      <h1 class="page-title">Book Your Perfect Event</h1>

      <div class="booking-layout">
        <!-- Left: Calendar & Quick Info -->
        <div class="left-panel card">
          <h2 class="panel-title">Choose Your Dates</h2>

          <div class="calendar-wrapper">
            <div class="calendar-header">
              <button class="nav-btn prev" @click="prevMonth">‹</button>
              <div class="month-year" @click="toggleMonthDropdown">
                {{ monthYearLabel }}
              </div>
              <button class="nav-btn next" @click="nextMonth">›</button>
            </div>

            <transition name="fade">
              <div v-if="showMonthDropdown" class="month-dropdown">
                <div
                  v-for="(month, idx) in monthNames"
                  :key="month"
                  class="month-option"
                  @click="selectMonth(idx)"
                >
                  {{ month }} {{ viewMonth.getFullYear() }}
                </div>
              </div>
            </transition>

            <div class="weekdays">
              <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
            </div>

            <div class="days-grid">
              <div
                v-for="(cell, idx) in calendarCells"
                :key="idx"
                class="day-cell"
                :class="{
                  'other-month': !cell.currentMonth,
                  'past disabled': isPastDate(cell.date),
                  'reserved disabled': cell.isReserved,
                  'selected-start': isSameDate(cell.date, rangeStart),
                  'selected-end': isSameDate(cell.date, rangeEnd),
                  'in-range': isInRange(cell.date, rangeStart, rangeEnd)
                }"
                @click="!isPastDate(cell.date) && !cell.isReserved && onDayClick(cell.date)"
              >
                <span class="day-number">{{ cell.date.getDate() }}</span>
              </div>
            </div>

            <div class="calendar-legend">
              <div class="legend-item">
                <span class="legend-circle reserved"></span> Reserved
              </div>
              <div class="legend-item">
                <span class="legend-circle selected"></span> Selected
              </div>
              <div class="legend-item">
                <span class="legend-circle range"></span> In Range
              </div>
            </div>

            <div class="selection-info">
              <button v-if="rangeStart" class="clear-btn" @click="clearRange">
                Clear Dates
              </button>
              <div class="selected-dates">
                <div><strong>From:</strong> {{ startDate || 'Not selected' }}</div>
                <div><strong>To:</strong> {{ endDate || 'Not selected' }}</div>
              </div>
            </div>
          </div>

          <div class="quick-info mt-32">
            <div class="form-group">
              <label>Event Type</label>
              <select v-model="eventType" :class="{ 'error-border': fieldErrors.event_type }">
                <option value="">Select event type</option>
                <option value="mariage">Mariage</option>
                <option value="dot">Dot</option>
                <option value="conference">Conference</option>
                <option value="graduation">Graduation</option>
                <option value="autres">Autres</option>
              </select>
              <p v-if="fieldErrors.event_type" class="field-error">{{ fieldErrors.event_type }}</p>
            </div>

            <div class="price-display">
              <span class="price-label">Estimated Total:</span>
              <span class="price-value">${{ totalCost }} USD</span>
            </div>
          </div>
        </div>

        <!-- Right: Booking Form -->
        <div class="right-panel card">
          <h2 class="panel-title">Booking Information</h2>

          <div class="form-grid">
            <div class="form-group">
              <label>Start Date</label>
              <input type="text" :value="startDate" readonly :class="{ 'error-border': fieldErrors.date_start }" />
              <p v-if="fieldErrors.date_start" class="field-error">{{ fieldErrors.date_start }}</p>
            </div>

            <div class="form-group">
              <label>End Date</label>
              <input type="text" :value="endDate" readonly :class="{ 'error-border': fieldErrors.date_end }" />
              <p v-if="fieldErrors.date_end" class="field-error">{{ fieldErrors.date_end }}</p>
            </div>

            <div class="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                v-model.number="guestCount"
                min="10"
                :class="{ 'error-border': fieldErrors.guest_count }"
              />
              <p v-if="fieldErrors.guest_count" class="field-error">{{ fieldErrors.guest_count }}</p>
            </div>

            <div class="form-group">
              <label>Your Name</label>
              <input type="text" v-model="name" readonly />
            </div>

            <div class="form-group">
              <label>Email Address</label>
              <input type="email" v-model="email" readonly />
            </div>

            <div class="form-group">
              <label>Phone Number <span class="required">*</span></label>
              <input
                type="tel"
                v-model="phone"
                :class="{ 'error-border': fieldErrors.phone }"
              />
              <p v-if="fieldErrors.phone" class="field-error">{{ fieldErrors.phone }}</p>
            </div>

            <div class="form-group full-width">
              <label>Additional Notes</label>
              <textarea
                v-model="notes"
                rows="4"
                placeholder="Any special requests, catering preferences, setup details..."
              ></textarea>
              <p v-if="fieldErrors.notes" class="field-error">{{ fieldErrors.notes }}</p>
            </div>
          </div>

          <button
            class="submit-btn"
            @click="submitBooking"
            :disabled="loading || !rangeStart || !rangeEnd"
          >
            <span v-if="loading">
              <span class="spinner"></span> Processing...
            </span>
            <span v-else>Confirm Booking</span>
          </button>
        </div>
      </div>
    </div>

    <Notification />
  </section>
</template>

<script>
import axios from 'axios'
import Notification from '~/components/Notification.vue'
import { notify } from '~/composables/useNotification'

export default {
  components: { Notification },
  data() {
    return {
      viewMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      monthNames: [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ],
      showMonthDropdown: false,

      rangeStart: null,
      rangeEnd: null,

      eventType: "",
      guestCount: 100,
      name: "",
      email: "",
      phone: "",
      notes: "",

      hallPrice: 0,
      hallId: 1,

      fieldErrors: {},
      loading: false,
      reservedDates: [], // add this to data
    }
  },

  computed: {
    monthYearLabel() {
      return this.viewMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })
    },

   calendarCells() {
  const first = new Date(this.viewMonth.getFullYear(), this.viewMonth.getMonth(), 1)
  const startDate = new Date(first)
  startDate.setDate(first.getDate() - first.getDay())

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    const formatted = this.formatYMD(d)
    return { 
      date: d, 
      currentMonth: d.getMonth() === this.viewMonth.getMonth(),
      isReserved: this.reservedDates.includes(formatted) // add reserved flag
    }
  })
},


    startDate() {
      return this.rangeStart ? this.formatYMD(this.rangeStart) : ""
    },

    endDate() {
      return this.rangeEnd ? this.formatYMD(this.rangeEnd) : ""
    },

    totalCost() {
      if (!this.rangeStart || !this.rangeEnd) return 0
      const days = (this.rangeEnd - this.rangeStart) / (1000 * 60 * 60 * 24) + 1
      return (days * this.hallPrice).toFixed(2)
    }
  },

  mounted() {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    this.name = `${user.first_name || ''} ${user.last_name || ''}`
    this.email = user.email || ''
    this.fetchHall()
    this.fetchHall()
  this.fetchReservedDates()

  },

  methods: {
    async fetchHall() {
      try {
        const token = localStorage.getItem('access_token')
        const res = await axios.get('http://localhost:8000/api/halls/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const hall = res.data.find(h => h.id === this.hallId)
        this.hallPrice = hall ? Number(hall.price_per_day) : 0
      } catch (err) {
        console.error('Failed to fetch hall', err)
      }
    },

    async submitBooking() {
  this.fieldErrors = {}

  // Frontend validation
  if (!this.rangeStart) this.fieldErrors.date_start = 'Start date is required'
  if (!this.rangeEnd) this.fieldErrors.date_end = 'End date is required'
  if (!this.eventType) this.fieldErrors.event_type = 'Event type is required'
  if (!this.phone) this.fieldErrors.phone = 'Phone is required'

  if (Object.keys(this.fieldErrors).length) {
    notify('Please correct the errors in the form.', 'danger')
    return
  }

  try {
    this.loading = true
    const token = localStorage.getItem('access_token')
    const response = await axios.post('http://localhost:8000/api/bookings/', {
      hall: this.hallId,
      agency: 1,
      date_start: this.startDate,
      date_end: this.endDate,
      event_type: this.eventType,
      total_cost: this.totalCost,
      notes: this.notes
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // If response is 200 or 201, show success
    notify('Booking created successfully!', 'success')
    this.fetchReservedDates()

    // Reset form
    this.clearRange()
    this.eventType = ''
    this.guestCount = 100
    this.phone = ''
    this.notes = ''

  } catch (err) {
    if (err.response && err.response.data) {
      const data = err.response.data

      // Map backend field errors
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          const msg = data[key][0]
          if (key === 'hall') {
            // Map hall errors to date fields
            this.fieldErrors.date_start = msg
            this.fieldErrors.date_end = msg
            // Show notify using backend message
            notify(msg, 'danger')
          } else {
            this.fieldErrors[key] = msg
            notify(msg, 'danger')
          }
        }
      })
    } else {
      notify('Booking failed. Please try again.', 'danger')
    }
  } finally {
    this.loading = false
    this.fetchReservedDates()
  }
},


async fetchReservedDates() {
  try {
    const token = localStorage.getItem('access_token')
    const res = await axios.get(`http://localhost:8000/api/bookings/?hall=${this.hallId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Store all dates in YYYY-MM-DD format
    this.reservedDates = res.data.flatMap(b => {
      const start = new Date(b.date_start)
      const end = new Date(b.date_end)
      const dates = []
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(this.formatYMD(new Date(d)))
      }
      return dates
    })
  } catch (err) {
    console.error('Failed to fetch reserved dates', err)
  }
},




    prevMonth() { this.viewMonth = new Date(this.viewMonth.getFullYear(), this.viewMonth.getMonth() - 1, 1) },
    nextMonth() { this.viewMonth = new Date(this.viewMonth.getFullYear(), this.viewMonth.getMonth() + 1, 1) },
    toggleMonthDropdown() { this.showMonthDropdown = !this.showMonthDropdown },
    selectMonth(i) { this.viewMonth = new Date(this.viewMonth.getFullYear(), i, 1); this.showMonthDropdown = false },

    onDayClick(d) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = d
        this.rangeEnd = null
      } else if (d >= this.rangeStart) {
        this.rangeEnd = d
      }
    },

    clearRange() { this.rangeStart = this.rangeEnd = null },

    formatYMD(d) {
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    },

    isSameDate(a,b){ return a && b && a.toDateString() === b.toDateString() },
    isInRange(d,s,e){ return s && e && d >= s && d <= e },
    isPastDate(d){ return d < new Date().setHours(0,0,0,0) }
  }
}
</script>

<style scoped>
/* Keep your previous styles as-is */
/* ... (same as your original styles) ... */
</style>


<style scoped>
.booking-section {
  padding: clamp(4.5rem, 9vw, 8rem) 0;
  background: #f8faff;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: clamp(2.3rem, 6vw, 3.4rem);
  color: #061b49;
  text-align: center;
  margin-bottom: 3.5rem;
}

/* ─── Layout ─── */
.booking-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 992px) {
    grid-template-columns: 5fr 6fr;
    gap: 3rem;
  }
}

.card {
  background: white;
  border-radius: 16px;
  padding: 2.2rem;
  box-shadow: 0 10px 35px rgba(6, 27, 73, 0.07);
}

.panel-title {
  font-family: var(--font-secondary);
  font-size: 1.85rem;
  color: #061b49;
  margin-bottom: 1.8rem;
}

/* Calendar ──────────────────────────────── */
.calendar-wrapper {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.4rem;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.04);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.4rem;
}

.month-year {
  font-weight: 600;
  font-size: 1.18rem;
  color: #061b49;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
}

.month-year:hover {
  background: #f0f5ff;
}

.nav-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--accent-color);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: #d4a017cc;
}

.month-dropdown {
  position: absolute;
  z-index: 10;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  max-height: 240px;
  overflow-y: auto;
  width: 180px;
}

.month-option {
  padding: 10px 14px;
  cursor: pointer;
}

.month-option:hover {
  background: #f0f7ff;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.8rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.18s;
  font-size: 0.98rem;
  cursor: pointer;
}

.day-cell:hover:not(.past):not(.reserved) {
  background: #f0f7ff;
  transform: scale(1.06);
}

.past, .reserved {
  opacity: 0.45;
  cursor: not-allowed;
}

.reserved {
  background: #fee2e2;
  color: #991b1b;
}

.selected-start, .selected-end {
  background: var(--primary-color) !important;
  color: white !important;
  font-weight: bold;
  box-shadow: 0 0 0 3px rgba(6,27,73,0.15);
}

.in-range {
  background: #eff6ff;
}

.day-number {
  padding: 10px 12px;
  border-radius: 8px;
}

.calendar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin: 1.2rem 0;
  font-size: 0.9rem;
  color: #4b5563;
}

.legend-circle {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
}

.legend-circle.reserved { background: #fee2e2; }
.legend-circle.selected { background: var(--primary-color); }
.legend-circle.range { background: #dbeafe; }

.selection-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.clear-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.selected-dates {
  display: flex;
  gap: 2rem;
  font-size: 0.95rem;
  color: #374151;
}

/* Form & Quick Info */
.quick-info {
  margin-top: 2.2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

input, select, textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3751ff;
  box-shadow: 0 0 0 3px rgba(55,81,255,0.1);
}

.error-border {
  border-color: #ef4444 !important;
}

.field-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.4rem;
}

.price-display {
  margin-top: 1.8rem;
  padding: 1.2rem;
  background: #f0f7ff;
  border-radius: 12px;
  text-align: center;
}

.price-label {
  font-size: 1.05rem;
  color: #4b5563;
}

.price-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  display: block;
  margin-top: 0.4rem;
}

.submit-btn {
  width: 100%;
  margin-top: 2rem;
  padding: 1.15rem;
  background: #061b49;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}

.submit-btn:hover:not(:disabled) {
  background: #0a255f;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner (simple) */
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 991px) {
  .booking-layout {
    grid-template-columns: 1fr;
  }
}
</style>