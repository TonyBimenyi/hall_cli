<template>
<div class="dashboard-container">
    <h1>Admin Dashboard</h1>
<p>Welcome back! Here's what's happening today.</p>
    <AdminDashboardDetails />
    <AdminDashboardRecentBookings />
</div>

</template>

<script setup>
definePageMeta({ layout: 'admin' })
</script>
