export default defineNuxtConfig({
  alias: {
    assets: "/<rootDir>/assets",
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          integrity:
            "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
    },
  },

  css: [
    "@/assets/css/main.css",
    "@/assets/css/components.css",
  ],

  plugins: [
    "@/plugins/iconify.js",
    "@/plugins/datepicker.client.js",
  ],

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
