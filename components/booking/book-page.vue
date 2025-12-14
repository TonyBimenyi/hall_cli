<template>
  <div class="booking-container">

    <div class="card">

      <!-- LEFT PANEL -->
      <div class="left-panel">

        <h2 class="title">Select Date & Package</h2>

        <div class="calendar-wrapper">
          <div class="calendar-header">
            <button class="nav" @click="prevMonth">‹</button>
            <div class="month-title" @click="toggleMonthDropdown">
              {{ monthYearLabel }}
            </div>
            <button class="nav" @click="nextMonth">›</button>
          </div>

          <div v-if="showMonthDropdown" class="month-dropdown">
            <div
              class="month-option"
              v-for="(m,index) in monthNames"
              :key="m"
              @click="selectMonth(index)"
            >
              {{ m }} {{ viewMonth.getFullYear() }}
            </div>
          </div>

          <div class="weekday-row">
            <div class="weekday" v-for="d in weekdays" :key="d">{{ d }}</div>
          </div>

          <div class="days-grid">
            <div
              v-for="(cell, idx) in calendarCells"
              :key="idx"
              class="day-cell"
              :class="{
                'other-month': !cell.currentMonth,
                'disabled': isPastDate(cell.date),
                'selected-start': isSameDate(cell.date, rangeStart),
                'selected-end': isSameDate(cell.date, rangeEnd),
                'in-range': isInRange(cell.date, rangeStart, rangeEnd)
              }"
              @click="!isPastDate(cell.date) && onDayClick(cell.date)"
            >
              <div class="day-number">{{ cell.date.getDate() }}</div>
            </div>
          </div>

          <div class="calendar-actions">
            <button class="clear-btn" @click="clearRange" v-if="rangeStart">Clear</button>
            <div class="selected-labels">
              <div><strong>Start:</strong> {{ startDate || '—' }}</div>
              <div><strong>End:</strong> {{ endDate || '—' }}</div>
            </div>
          </div>
        </div>

        <div class="form-group mt-20">
          <label>Event Type</label>
          <select v-model="eventType">
            <option value="">Select type</option>
            <option value="mariage">Mariage</option>
            <option value="dot">Dot</option>
            <option value="conference">Conference</option>
            <option value="graduation">Graduation</option>
            <option value="autres">Autres</option>
          </select>
          <p v-if="fieldErrors.event_type" class="field-error">{{ fieldErrors.event_type }}</p>
        </div>

        <div class="prices">
          <p><strong>Total:</strong> {{ totalCost }} USD</p>
        </div>

      </div>

      <!-- RIGHT PANEL -->
      <div class="right-panel">
        <h2 class="title">Event Details</h2>

        <div class="form-group">
          <label>Start Date</label>
          <input type="text" :value="startDate" readonly />
          <p v-if="fieldErrors.date_start" class="field-error">{{ fieldErrors.date_start }}</p>
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input type="text" :value="endDate" readonly />
          <p v-if="fieldErrors.date_end" class="field-error">{{ fieldErrors.date_end }}</p>
        </div>

        <div class="form-group">
          <label>Guest Count</label>
          <input type="number" v-model="guestCount" />
          <p v-if="fieldErrors.guest_count" class="field-error">{{ fieldErrors.guest_count }}</p>
        </div>

        <div class="form-group">
          <label>Your Name</label>
          <input type="text" v-model="name" readonly />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" readonly />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input type="number" v-model="phone" />
          <p v-if="fieldErrors.phone" class="field-error">{{ fieldErrors.phone }}</p>
        </div>

        <div class="form-group">
          <label>Notes</label>
          <textarea v-model="notes"></textarea>
          <p v-if="fieldErrors.notes" class="field-error">{{ fieldErrors.notes }}</p>
        </div>

        <button class="submit-btn" @click="submitBooking" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Confirm Booking</span>
        </button>

      </div>
      
      <!-- Notification component -->
      <Notification />
    </div>

  </div>
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
      loading: false
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
        return { date: d, currentMonth: d.getMonth() === this.viewMonth.getMonth() }
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
/* layout */
.booking-container {
  display: flex;
  justify-content: center;
  padding: 40px ;
  background: #f7f9fc;
  /* width: 100%; */
  /* min-height: 100vh; */
}
.calendar-header button{
  background: var(--accent-color);
  padding: 5px 12px;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
}
.left-panel, .right-panel{
    background: #fff;
    padding: 28px;
    border-radius: 18px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    width: 90%;
}
.selected-labels{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.card {
  /* width: 1100px; */
  /* background: #fff; */
  padding: 28px;
  border-radius: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  /* box-shadow: 0 10px 40px rgba(0,0,0,0.08); */
}

/* titles */
.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #061b49;
  font-family: var(--font-secondary);
}

/* calendar */
.calendar-wrapper {
  background: #ffffff;
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.04);
  max-width: 520px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.month-title {
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  color: #061b49;
}

.month-title:hover {
  text-decoration: underline;
}

/* month dropdown */
.month-dropdown {
  background: #fff;
  border: 1px solid #d8dbe2;
  border-radius: 10px;
  max-height: 260px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.month-option {
  padding: 10px 12px;
  cursor: pointer;
}

.month-option:hover {
  background: rgba(55,81,255,0.08);
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 6px;
}

.weekday {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
}

/* days */
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 20px;
}
.clear-btn{
  background: var(--accent-color);
  padding: 8px 14px;
  /* border: 2px solid var(--primary-color); */
  border: none;
  border-radius: 5px;
  color: white;
  margin-bottom: 10px;
}

.day-cell {
  padding: 8px;
  /* min-height: 46px; */
  border-radius: 8px;
  text-align: right;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  transition: 0.1s;
}

.day-cell:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(6,27,73,0.06);
}

/* disabled days */
.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.other-month {
  opacity: 0.45;
}

.day-number {
  font-size: 13px;
  padding: 6px 8px;
}

/* today */
.is-today .day-number {
  box-shadow: inset 0 0 0 1px rgba(3,102,214,0.12);
}

/* selection */
.selected-start .day-number,
.selected-end .day-number {
  background: var(--primary-color);
  border-radius: 5px;
  color: white;
  font-weight: 700;
}

.in-range {
  background: rgba(55,81,255,0.06);
}

/* form */
.form-group {
  margin-bottom: 18px;

}

label { font-weight: 500; margin-bottom: 6px; }

input, select, textarea {
  padding-left: 5px;
  border-radius: 8px;
  border: 1px solid #d8dbe2;
  outline: none;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
height: 48px;
}
select{
      height: 50px;
}

input:focus, textarea:focus, select:focus {
  border-color: #3751ff;
  box-shadow: 0 0 0 3px rgba(55,81,255,0.08);
}

textarea { height: 100px; resize: none; }

.submit-btn {
  background: #061b49;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  border: none;
  height: 50px;
  font-size: var(--fs-base);
}

.mt-20 { margin-top: 20px; }

</style>
