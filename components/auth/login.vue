<template>
  <div class="auth-container">
    <div class="auth-card">

      <h1>Welcome Back</h1>
      <p class="subtitle">Sign in to access your dashboard</p>

      <label>Username</label>
      <input v-model="username" type="text" placeholder="Enter your username" />
      <p v-if="fieldErrors.username" class="field-error">{{ fieldErrors.username }}</p>

      <label>Password</label>
      <input v-model="password" type="password" placeholder="••••••••" />
      <p v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password }}</p>

      <button class="submit-btn" @click="login" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span v-else>Sign In</span>
      </button>

      <p class="switch-text">
        Don't have an account?
        <NuxtLink to="/register" class="btn-signin">Register</NuxtLink>
    
      </p>

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
  name: "LoginView",
  components: { Notification },
  data() {
    return {
      username: '',
      password: '',
      fieldErrors: {},
      loading: false
    }
  },
  methods: {
    async login() {
      // Reset field errors
      this.fieldErrors = {}

      // Simple frontend validation
      if (!this.username) this.fieldErrors.username = 'Username is required'
      if (!this.password) this.fieldErrors.password = 'Password is required'
      if (Object.keys(this.fieldErrors).length) return

      const config = useRuntimeConfig()
      this.loading = true
      try {
        const response = await axios.post(`${config.public.apiBase}/users/login/`, {
          username: this.username,
          password: this.password
        })

        // Save user and tokens in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('access_token', response.data.tokens.access)
        localStorage.setItem('refresh_token', response.data.tokens.refresh)

        // Show success notification
        notify('Login successful!', 'success')

        // Redirect to dashboard after a short delay
        setTimeout(() => this.$router.push('/dashboard'), 500)
      } catch (error) {
        if (error.response && error.response.data) {
          notify(error.response.data.detail || 'Invalid credentials', 'danger')
        } else {
          notify('An error occurred. Please try again.', 'danger')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Keep your existing styles */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9fafc;
}

.auth-card {
  background: #fff;
  width: 420px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}

.auth-card h1 {
  font-size: 34px;
  font-weight: 700;
  color: #061b49;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 15px;
  color: #7a869a;
  margin-bottom: 25px;
}

label {
  display: block;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 5px;
}

input {
  width: 93%;
  padding: 12px;
  border: 1px solid #d5d9e1;
  border-radius: 10px;
  font-size: 15px;
}

.field-error {
  color: #ef4444;
  font-size: 13px;
  margin-top: 3px;
  margin-bottom: 5px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #061b49;
  color: white;
  border: none;
  border-radius: 10px;
  margin-top: 25px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Loading spinner */
.spinner {
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #fff; /* White */
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.switch-text {
  text-align: center;
  margin-top: 18px;
  font-size: 14px;
}

.switch-text a {
  color: #0a2b6a;
  font-weight: 600;
  text-decoration: underline;
}
</style>
