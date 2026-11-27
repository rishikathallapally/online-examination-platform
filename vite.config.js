
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/online-examination-platform/",
  plugins: [react(), tailwindcss()],
});
