<template>
  <div class="auth-container">
    <div class="auth-card">

      <h1>Welcome Back</h1>
      <p class="subtitle">Sign in to access your dashboard</p>

      <label>Email</label>
      <input type="email" placeholder="you@example.com" />

      <label>Password</label>
      <input type="password" placeholder="••••••••" />

      <button class="submit-btn">Sign In</button>

      <p class="switch-text">
        Don't have an account?
        <a href="/register">Sign up</a>
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
};
</script>

<style scoped>
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
