<template>
  <div class="booking-container">

    <div class="card">

      <!-- LEFT PANEL -->
      <div class="left-panel">

        <h2 class="title">Select Date & Package</h2>

        <div class="calendar-wrapper">

          <!-- HEADER -->
          <div class="calendar-header">

            <button class="nav" @click="prevMonth" aria-label="Previous month">‹</button>

            <!-- CLICKABLE MONTH/YEAR TITLE -->
            <div class="month-title" @click="toggleMonthDropdown">
              {{ monthYearLabel }}
            </div>

            <button class="nav" @click="nextMonth" aria-label="Next month">›</button>
          </div>

          <!-- MONTH DROPDOWN -->
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

          <!-- WEEKDAYS -->
          <div class="weekday-row">
            <div class="weekday" v-for="d in weekdays" :key="d">{{ d }}</div>
          </div>

          <!-- DAYS GRID -->
          <div class="days-grid">
            <div
              v-for="(cell, idx) in calendarCells"
              :key="idx"
              class="day-cell"
              :class="{
                'other-month': !cell.currentMonth,
                'is-today': isToday(cell.date),
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

          <!-- ACTIONS -->
          <div class="calendar-actions">
            <button class="clear-btn" @click="clearRange" v-if="rangeStart || rangeEnd">Clear</button>

            <div class="selected-labels">
              <div><strong>Start:</strong> {{ startDate || '—' }}</div>
              <div><strong>End:</strong> {{ endDate || '—' }}</div>
            </div>
          </div>

        </div>

        <!-- FORM LEFT SIDE -->
        <div class="form-group mt-20">
          <label>Event Type</label>
          <select v-model="eventType">
            <option value="">Select type</option>
            <option>Conference</option>
            <option>Wedding</option>
            <option>Corporate</option>
          </select>
        </div>

        <div class="form-group">
          <label>Package</label>
          <select v-model="packageSelected">
            <option value="">Select package</option>
            <option>Basic — $500</option>
            <option>Premium — $1,200</option>
            <option>Luxury — $2,000+</option>
          </select>
        </div>

        <!-- PRICES -->
           <div class="prices">
              <p><strong>Total avec les jours: </strong> 2300 Fbu</p> 
           </div>

      </div>

      <!-- RIGHT PANEL -->
      <div class="right-panel">
        <h2 class="title">Event Details</h2>

        <div class="form-group">
          <label>Start Date</label>
          <input type="text" :value="startDate" readonly />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input type="text" :value="endDate" readonly />
        </div>

        <div class="form-group">
          <label>Guest Count</label>
          <input type="number" v-model="guestCount" min="1" />
        </div>

        <div class="form-group">
          <label>Your Name</label>
          <input type="text" v-model="name" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input type="text" v-model="phone" />
        </div>

        <div class="form-group">
          <label>Special Requests</label>
          <textarea v-model="notes"></textarea>
        </div>

        <button class="submit-btn">Confirm Booking</button>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      viewMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      monthNames: [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ],
      showMonthDropdown: false,

      // calendar range
      rangeStart: null,
      rangeEnd: null,

      // form
      eventType: "",
      packageSelected: "",
      guestCount: 100,
      name: "",
      email: "",
      phone: "",
      notes: ""
    }
  },

  computed: {
    monthYearLabel() {
      return this.viewMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })
    },

    calendarCells() {
      const first = new Date(this.viewMonth.getFullYear(), this.viewMonth.getMonth(), 1)
      const startDay = first.getDay()
      const startDate = new Date(first)
      startDate.setDate(first.getDate() - startDay)

      const cells = []
      for (let i=0; i<42; i++) {
        const d = new Date(startDate)
        d.setDate(startDate.getDate() + i)
        cells.push({ date: d, currentMonth: d.getMonth() === this.viewMonth.getMonth() })
      }
      return cells
    },

    startDate() {
      return this.rangeStart ? this.formatYMD(this.rangeStart) : ""
    },
    endDate() {
      return this.rangeEnd ? this.formatYMD(this.rangeEnd) : ""
    }
  },

  methods: {
    // month change
    prevMonth() {
      this.viewMonth = new Date(this.viewMonth.getFullYear(), this.viewMonth.getMonth() - 1, 1)
    },
    nextMonth() {
      this.viewMonth = new Date(this.viewMonth.getFullYear(), this.viewMonth.getMonth() + 1, 1)
    },

    toggleMonthDropdown() {
      this.showMonthDropdown = !this.showMonthDropdown
    },

    selectMonth(index) {
      this.viewMonth = new Date(this.viewMonth.getFullYear(), index, 1)
      this.showMonthDropdown = false
    },

    // click day
    onDayClick(date) {
      const clicked = new Date(date.getFullYear(), date.getMonth(), date.getDate())

      if (!this.rangeStart) {
        this.rangeStart = clicked
        this.rangeEnd = null
        return
      }

      if (this.rangeStart && !this.rangeEnd) {
        if (clicked < this.rangeStart) {
          this.rangeEnd = this.rangeStart
          this.rangeStart = clicked
        } else if (this.isSameDate(clicked, this.rangeStart)) {
          this.rangeStart = null
          this.rangeEnd = null
        } else {
          this.rangeEnd = clicked
        }
        return
      }

      this.rangeStart = clicked
      this.rangeEnd = null
    },

    clearRange() {
      this.rangeStart = null
      this.rangeEnd = null
    },

    // date utils
    formatYMD(d) {
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    },

    isSameDate(a, b) {
      if (!a || !b) return false
      return a.getFullYear() === b.getFullYear() &&
             a.getMonth() === b.getMonth() &&
             a.getDate() === b.getDate()
    },

    isInRange(date, start, end) {
      if (!start || !end) return false
      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
      const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
      const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
      return d >= s && d <= e
    },

    isToday(date) {
      const t = new Date()
      return this.isSameDate(date, t)
    },

    // NEW: disable past dates
    isPastDate(date) {
      const today = new Date()
      today.setHours(0,0,0,0)

      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      return d < today
    }
  }
}
</script>

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
