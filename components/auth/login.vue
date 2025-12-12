<template>
  <div class="auth-container">
    <div class="auth-card">

      <h1>Welcome Back</h1>
      <p class="subtitle">Sign in to access your dashboard</p>

      <label>Username</label>
      <input v-model="username" type="text" placeholder="Enter your username" />

      <label>Password</label>
      <input v-model="password" type="password" placeholder="••••••••" />

      <button class="submit-btn" @click="login">Sign In</button>

      <p class="switch-text">
        Don't have an account?
        <a href="/register">Sign up</a>
      </p>

      <p v-if="errorMessage" style="color:red; margin-top:10px;">{{ errorMessage }}</p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "LoginView",
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      this.errorMessage = ''
      try {
        const response = await axios.post('http://localhost:8000/api/users/login/', {
          username: this.username,
          password: this.password
        })

        // Save user and tokens in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('access_token', response.data.tokens.access)
        localStorage.setItem('refresh_token', response.data.tokens.refresh)

        // Redirect to dashboard
        this.$router.push('/dashboard')
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.detail || 'Invalid credentials'
        } else {
          this.errorMessage = 'An error occurred. Please try again.'
        }
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
}

.submit-btn:hover {
  background: #0a2b6a;
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
