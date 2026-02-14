<!-- layouts/admin.vue  (or default.vue / custom layout) -->
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

    <!-- Main area -->
    <div class="main">
      <header class="header">
        <button class="menu-btn" @click="toggleSidebar">
          <i class="fa-solid fa-bars"></i>
        </button>
        <h1 class="page-title">
          {{ currentPageTitle }}
        </h1>
      </header>

      <main class="content">
        <slot />
      </main>
    </div>

    <!-- Mobile overlay -->
    <div
      v-if="!isCollapsed && isMobile"
      class="mobile-overlay"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      isMobile: false,
      navigation: [
        { title: 'Dashboard',   url: '/admin',          icon: 'fa-solid fa-house' },
        { title: 'Bookings',    url: '/admin/bookings', icon: 'fa-solid fa-calendar-days' },
        { title: 'Payments',    url: '/admin/payments', icon: 'fa-solid fa-credit-card' },
        { title: 'Halls',       url: '/admin/halls',    icon: 'fa-solid fa-building' },
        { title: 'Personnel',   url: '/admin/personnel',icon: 'fa-solid fa-users' }
      ]
    }
  },

  computed: {
    currentPageTitle() {
      const item = this.navigation.find(i => 
        this.$route.path === i.url || this.$route.path.startsWith(i.url + '/')
      )
      return item ? item.title : 'Dashboard'
    }
  },

  mounted() {
    if (process.client) {
      this.isMobile = window.innerWidth <= 992
      // Auto collapse on small screens
      if (this.isMobile) {
        this.isCollapsed = true
      }

      window.addEventListener('resize', this.handleResize)
    }
  },

  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('resize', this.handleResize)
    }
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },

    isActive(url) {
      return this.$route.path === url || this.$route.path.startsWith(url + '/')
    },

    handleResize() {
      this.isMobile = window.innerWidth <= 992
      // On mobile → force collapsed when window becomes small
      if (this.isMobile && !this.isCollapsed) {
        this.isCollapsed = true
      }
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  transition: width 0.35s ease;
  position: relative;
  z-index: 100;
  overflow: hidden;
  flex-shrink: 0;
  
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 16px 14px;
  gap: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.logo {
  width: 44px;
  height: 44px;
  background: #6366f1;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.title {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 700;
  font-size: 17px;
  color: #1f2937;
}

.sub {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

/* Menu */
.menu {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin: 0 4px;
}

.menu-item i {
  font-size: 20px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
  margin-right: 14px;
}

.menu-item span {
  font-size: 15px;
  font-weight: 500;
}

.menu-item:hover {
  background: #f1f5f9;
  color: #6366f1;
}

.menu-item.active {
  background: #eef2ff;
  color: #6366f1;
  font-weight: 600;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #f5f6fa;
}

.header {
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  flex-shrink: 0;
  width: 100%;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #4b5563;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
}

.menu-btn:hover {
  background: #f1f5f9;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

/* Mobile overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 90;
}

/* Responsive */
@media (max-width: 992px) {
  .sidebar {
    position: fixed;
    height: 100%;
    transform: translateX(0);
    transition: transform 0.35s ease;
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
    width: 260px; /* full width when visible */
  }

  .main {
    margin-left: 0 !important;
  }

  .content {
    padding: 16px;
  }
}
</style>