<template>
  <div class="auth-container">
    <div class="auth-card">

      <h1>Create Account</h1>
      <p class="subtitle">Join us and get started</p>

      <label>Username (numbers only)</label>
      <input v-model="username" type="text" placeholder="123456" />
      <p v-if="fieldErrors.username" class="field-error">{{ fieldErrors.username }}</p>

      <label>First Name</label>
      <input v-model="first_name" type="text" placeholder="John" />
      <p v-if="fieldErrors.first_name" class="field-error">{{ fieldErrors.first_name }}</p>

      <label>Last Name</label>
      <input v-model="last_name" type="text" placeholder="Doe" />
      <p v-if="fieldErrors.last_name" class="field-error">{{ fieldErrors.last_name }}</p>

      <label>Email</label>
      <input v-model="email" type="email" placeholder="you@example.com" />
      <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</p>

      <label>Password</label>
      <input v-model="password" type="password" placeholder="••••••••" />
      <p v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password }}</p>

      <label>Confirm Password</label>
      <input v-model="password2" type="password" placeholder="••••••••" />
      <p v-if="fieldErrors.password2" class="field-error">{{ fieldErrors.password2 }}</p>

      <button class="submit-btn" @click="register" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span v-else>Sign Up</span>
      </button>

      <p class="switch-text">
        Already have an account?
        <NuxtLink to="/login" class="btn-signin">Sign in</NuxtLink>
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
  name: "RegisterView",
  components: { Notification },
  data() {
    return {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      fieldErrors: {},
      loading: false
    }
  },
  methods: {
    async register() {
      this.fieldErrors = {}

      // Frontend validation
      if (!this.username) this.fieldErrors.username = 'Username is required'
      else if (!/^\d+$/.test(this.username)) this.fieldErrors.username = 'Username must be numbers only'

      if (!this.first_name) this.fieldErrors.first_name = 'First name is required'
      if (!this.last_name) this.fieldErrors.last_name = 'Last name is required'
      if (!this.email) this.fieldErrors.email = 'Email is required'
      if (!this.password) this.fieldErrors.password = 'Password is required'
      if (!this.password2) this.fieldErrors.password2 = 'Confirm password is required'
      if (this.password && this.password2 && this.password !== this.password2) {
        this.fieldErrors.password2 = "Passwords don't match"
      }

      if (Object.keys(this.fieldErrors).length) return

      const config = useRuntimeConfig()
      this.loading = true
      try {
        const response = await axios.post(`${config.public.apiBase}/users/register/`, {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password2: this.password2
        })

        // Show success notification
        notify('Registration successful! You can now login.', 'success')

        // Redirect to login after a short delay
        setTimeout(() => this.$router.push('/login'), 500)
      } catch (error) {
        if (error.response && error.response.data) {
          // Show backend validation errors
          const data = error.response.data
          Object.keys(data).forEach(key => {
            this.fieldErrors[key] = Array.isArray(data[key]) ? data[key][0] : data[key]
          })
          notify('Please correct the errors in the form.', 'danger')
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
/* Same styles as login */
.auth-container {
  margin-top: 80px;
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
  font-size: 32px;
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
