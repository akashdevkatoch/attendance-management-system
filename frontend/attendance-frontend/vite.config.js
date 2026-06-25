import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType:
        "autoUpdate",

      includeAssets: [
        "pwa-192.png",
        "pwa-512.png",
      ],

      manifest: {
        name:
          "Attendance Management System",

        short_name:
          "Attendance",

        description:
          "Employee Attendance Management System",

        theme_color:
          "#2563eb",

        background_color:
          "#ffffff",

        display:
          "standalone",

        start_url: "/",

        icons: [
          {
            src:
              "pwa-192.png",
            sizes:
              "192x192",
            type:
              "image/png",
          },
          {
            src:
              "pwa-512.png",
            sizes:
              "512x512",
            type:
              "image/png",
          },
        ],
      },
    }),
  ],
});