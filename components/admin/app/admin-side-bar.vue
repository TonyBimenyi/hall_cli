<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="sidebar-header">
        <div class="logo">
          <i class="fa-solid fa-building"></i>
        </div>

        <div class="title" v-if="!isCollapsed">
          <span class="name">Hall Admin</span>
          <span class="sub">Reception Dashboard</span>
        </div>
      </div>

      <nav class="menu">
  <NuxtLink
    v-for="item in navigation"
    :key="item.title"
    :to="item.url"
    class="menu-item"
    :class="{ active: isActive(item.url) }"
  >
    <i :class="item.icon"></i>
    <span v-if="!isCollapsed">{{ item.title }}</span>
  </NuxtLink>
</nav>

    </aside>

    <!-- Main -->
    <div class="main">
      <!-- Header -->
      <header class="header">
        <button class="menu-btn" @click="toggleSidebar">
          <i class="fa-solid fa-bars"></i>
        </button>

        <h1 class="page-title">Dashboard</h1>
      </header>

      <!-- Page content -->
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const isCollapsed = ref(false);
const route = useRoute();

const navigation = [
  { title: "Dashboard", url: "/admin", icon: "fa-solid fa-house" },
  { title: "Bookings", url: "/admin/bookings", icon: "fa-solid fa-calendar-days" },
  { title: "Payments", url: "/admin/payments", icon: "fa-solid fa-credit-card" },
  { title: "Halls", url: "/admin/halls", icon: "fa-solid fa-building" },
  { title: "Personnel", url: "/admin/personnel", icon: "fa-solid fa-users" },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const isActive = (url) => {
  return route.path === url;
};
</script>


<style>
/* Layout */
.layout {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
  font-family: Arial, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 80px;
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
}


.logo {
  width: 42px;
  height: 42px;
  background: var(--primary-color);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.title {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: bold;
  font-size: 16px;
}

.sub {
  font-size: 12px;
  color: #6b7280;
}

/* Sidebar Menu */
.menu {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: stretch; /* make links full width */
}

.menu-item {
  text-align: left;            /* text left */
  width: 100%;                 /* full width */
  padding: 15px 14px;
  gap: 15px;                   /* space between icon and text */
  border-radius: 6px;
  color: #6b7280;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  box-sizing: border-box;
  margin-left: 5px;
}

.menu-item i {
  min-width: 24px;  /* icon takes fixed width */
  text-align: left;
  font-size: 18px;
  margin-right: 10px;
}

.menu-item:hover {
  background-color: #f1f5f9;
  color: var(--primary-color);
}

.menu-item.active {
  background-color: #e0e7ff;
  color: var(--primary-color);
  font-weight: 600;
}

.menu-item i {
  font-size: 18px;
  min-width: 22px;
}

.menu-item:hover {
  background: #f1f5f9;
  color: var(--primary-color);
}

.menu-item.active {
  background: #e0e7ff;
  color: var(--primary-color);
  font-weight: 600;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
}

/* Header */
.header {
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  width: 100%;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin: 0;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
}

/* Content */
.content {
  padding: 20px;
  overflow-y: auto;
  margin: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100%;
    z-index: 1000;
  }

  .main {
    margin-left: 80px;
  }
  .menu-item.active {

}
}
</style>
