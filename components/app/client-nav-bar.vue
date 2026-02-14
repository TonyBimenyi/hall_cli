<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <nav class="container">
      <div class="left">
        <div class="logo">
          <Icon icon="mdi:alpha-e-circle" width="32" />
          <span>Elite Reception</span>
        </div>

        <!-- Desktop links -->
        <ul class="links desktop-links">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.to" active-class="active-link">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Right side (auth + mobile toggle) -->
      <div class="right">
        <!-- Mobile hamburger -->
        <button class="hamburger md:hidden" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle menu">
          <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" width="28" />
        </button>

        <!-- Desktop auth buttons -->
        <div class="auth-desktop md:flex hidden items-center gap-3">
          <NuxtLink v-if="!isLoggedIn" to="/login" class="btn-signin">Sign In</NuxtLink>
          <div v-else class="user-menu">
            <NuxtLink to="/dashboard" class="btn-dashboard">Dashboard</NuxtLink>
            <button @click="logout" class="btn-logout">Log Out</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu overlay / dropdown -->
    <div v-if="isMenuOpen" class="mobile-menu md:hidden" @click.self="isMenuOpen = false">
      <div class="mobile-menu-content">
        <ul class="mobile-links">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.to" active-class="active-link" @click="isMenuOpen = false">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Mobile auth buttons -->
        <div class="mobile-auth mt-6 pt-6 border-t border-gray-200">
          <NuxtLink
            v-if="!isLoggedIn"
            to="/login"
            class="btn-signin block text-center mb-3"
            @click="isMenuOpen = false"
          >
            Sign In
          </NuxtLink>
          <div v-else class="flex flex-col gap-3">
            <NuxtLink
              to="/dashboard"
              class="btn-dashboard block text-center"
              @click="isMenuOpen = false"
            >
              Dashboard
            </NuxtLink>
            <button @click="logoutMobile" class="btn-logout block text-center">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
      navLinks: [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
        { name: "Gallery", to: "/gallery" },
        { name: "Services", to: "/services" },
        { name: "Book Now", to: "/book" },
        { name: "Contact", to: "/contact" }
      ],
      isLoggedIn: false
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
    this.checkLogin()
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20
    },
    checkLogin() {
      const user = localStorage.getItem("user")
      this.isLoggedIn = !!user
    },
    logout() {
      localStorage.removeItem("user")
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      this.isLoggedIn = false
      this.isMenuOpen = false
      this.$router.push("/login")
    },
    logoutMobile() {
      this.logout()
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 16px 0;
  background: white;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.5rem;
}

.logo span {
  font-family: var(--font-secondary);
}

.links {
  display: flex;
  gap: 0.5rem;
  list-style: none;
}

a {
  color: var(--primary-color);
  font-weight: 500;
  padding: 10px 16px;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

a:hover {
  background: var(--secondary-color);
  color: var(--primary-color);
}

.active-link {
  background: var(--primary-color) !important;
  color: white !important;
}

/* Buttons */
.btn-signin,
.btn-dashboard,
.btn-logout {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-signin:hover,
.btn-dashboard:hover,
.btn-logout:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Hamburger */
.hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 8px;
}

/* ──────────────────────────────────
   Mobile Menu
─────────────────────────────────── */
.mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 40;
  padding-top: 5rem;
}

.mobile-menu-content {
  background: white;
  margin: 0 16px;
  border-radius: 12px;
  padding: 1.5rem;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-links a {
  padding: 14px 16px;
  font-size: 1.1rem;
  text-align: center;
}

.mobile-auth {
  display: flex;
  flex-direction: column;
}

.mobile-auth .btn-signin,
.mobile-auth .btn-dashboard,
.mobile-auth .btn-logout {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
}

/* Desktop auth layout */
.user-menu {
  display: flex;
  gap: 0.75rem;
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  .navbar {
    padding: 23px 0;
  }
}
</style>