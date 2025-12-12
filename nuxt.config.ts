// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias:{
    assets:"/<rootDir>/assets",
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api' // reusable base URL
    }
  },
  css:[
    '../assets/css/main.css',
    '../assets/css/components.css',
  ],
    plugins:[
    '../plugins/iconify.js', // register iconify globally
    '../plugins/datepicker.client.js'  // ← add this line
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
