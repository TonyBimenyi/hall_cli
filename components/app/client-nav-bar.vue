<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <nav class="container">
      <div class="left">
        <div class="logo">
          <Icon icon="mdi:alpha-e-circle" width="32" />
          <span>Elite Reception</span>
        </div>

        <ul class="links">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.to" active-class="active-link">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Right buttons -->
      <div class="right">
        <NuxtLink v-if="!isLoggedIn" to="/login" class="btn-signin">Sign In</NuxtLink>

        <div v-else class="user-menu">
          <NuxtLink to="/dashboard" class="btn-dashboard">Dashboard</NuxtLink>
          <button @click="logout" class="btn-logout">Log Out</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      isScrolled: false,
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
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 23px 0;
  z-index: 50;

  display: flex;
  justify-content: center;
  backdrop-filter: blur(0px);
  background: white;

  transition: backdrop-filter 0.3s ease, background-color 0.3s ease;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
}

nav.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 25px;
}
.logo span {
  font-family: var(--font-secondary);
}

.links {
  display: flex;
  gap: 10px;
  list-style: none;
}

a {
  color: var(--primary-color);
  font-weight: 500;
  padding: 10px 20px;
  text-decoration: none;
}
a:hover {
  background: var(--secondary-color);
  border-radius: 5px;
  transition: .3s;
  color: var(--primary-color);
}

.active-link, .btn-signin, .btn-logout {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  transition: .3s;
}

.btn-signin:hover, .btn-dashboard:hover, .btn-logout:hover {
  border: 2px solid var(--primary-color);
}

.user-menu {
  display: flex;
  gap: 10px;
}
</style>
