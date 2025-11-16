// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias:{
    assets:"/<rootDir>/assets",
  },
  css:[
    '../assets/css/main.css'
  ],
    plugins:[
    '../plugins/iconify.js' // register iconify globally
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
