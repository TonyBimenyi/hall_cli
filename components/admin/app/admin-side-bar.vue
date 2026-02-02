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
          active-class="active"
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

<script>
export default {
  name: "AppLayout",

  data() {
    return {
      isCollapsed: false,
      navigation: [
        { title: "Dashboard", url: "/", icon: "fa-solid fa-house" },
        { title: "Bookings", url: "/bookings", icon: "fa-solid fa-calendar-days" },
        { title: "Payments", url: "/payments", icon: "fa-solid fa-credit-card" },
        { title: "Halls", url: "/halls", icon: "fa-solid fa-building" },
        { title: "Personnel", url: "/personnel", icon: "fa-solid fa-users" },
      ],
    };
  },

  mounted() {
    // Collapse sidebar on mobile by default
    if (window.innerWidth < 768) {
      this.isCollapsed = true;
    }

    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleResize() {
      if (window.innerWidth < 768) {
        this.isCollapsed = true;
      }
    },
  },
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
  background: #2563eb;
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

/* Menu */
.menu {
  padding: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border-radius: 8px;
  color: #6b7280;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.menu-item i {
  font-size: 18px;
  min-width: 22px;
}

.menu-item:hover {
  background: #f1f5f9;
  color: #2563eb;
}

.menu-item.active {
  background: #e0e7ff;
  color: #2563eb;
  font-weight: 600;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
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
}

.menu-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
}

/* Content */
.content {
  padding: 20px;
  overflow-y: auto;
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
}
</style>
