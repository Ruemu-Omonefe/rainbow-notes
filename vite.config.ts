import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("@mui") || id.includes("@emotion")) {
            return "mui";
          }

          if (id.includes("react-router")) {
            return "router";
          }

          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
            return "redux";
          }

          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (id.includes("jquery")) {
            return "notebook-vendor";
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "react-vendor";
          }
        },
      },
    },
  },
})
