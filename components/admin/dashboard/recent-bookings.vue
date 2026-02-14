<template>
    <div class="recent-bookings">
        <h2><i></i> Recent Bookings</h2>
        <p>Latest reservations and their status</p>
        <div class="bookings-cards">
            <div 
                class="card" 
                v-for="booking in bookings" 
                :key="booking.id"
            >
                <div class="icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="details">
                    <h3>{{ booking.event_type || 'Event' }}</h3>
                    <p><strong>Booking Ref:</strong> {{ formatBookingRef(booking) }}</p>
                    <p><strong>Status:</strong> <span :class="['status', booking.status]">{{ booking.status }}</span></p>
                    <p><strong>Start:</strong> {{ booking.date_start || '—' }}</p>
                    <p><strong>End:</strong> {{ booking.date_end || '—' }}</p>
                    <p><strong>Total Price:</strong> ${{ booking.total_cost || 0 }}</p>
                </div>
            </div>
            <p v-if="bookings.length === 0" class="no-bookings">No recent bookings available.</p>
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
                    event_type: 'Wedding',
                    status: 'confirmed',
                    date_start: '2023-10-15',
                    date_end: '2023-10-16',
                    total_cost: 5000
                },
                {
                    id: 2,
                    event_type: 'Conference',
                    status: 'pending',
                    date_start: '2023-10-20',
                    date_end: '2023-10-21',
                    total_cost: 3000
                },
                {
                    id: 3,
                    event_type: 'Birthday Party',
                    status: 'canceled',
                    date_start: '2023-10-25',
                    date_end: '2023-10-25',
                    total_cost: 1500
                }
            ]
        };
    },
    methods: {
        formatBookingRef(booking) {
            return `REF-${booking.id.toString().padStart(4, '0')}`;
        }
    }
};
</script>

<style scoped>
.recent-bookings {
    font-family: Arial, sans-serif;
    /* padding: 20px;
     */margin-top: 30px;
}



.bookings-cards {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin-top: 15px;
}

.card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.icon {
    margin-right: 15px;
    font-size: 24px;
    color: #555;
}

.details {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex: 1;
}

.details p {
    margin: 0;
    flex: 1 1 50%;
}

.status {
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 4px;
}

.status.confirmed {
    color: #fff;
    background-color: green;
}

.status.pending {
    color: #fff;
    background-color: orange;
}

.status.canceled {
    color: #fff;
    background-color: red;
}

.no-bookings {
    text-align: center;
    color: #888;
    font-style: italic;
}
</style>
