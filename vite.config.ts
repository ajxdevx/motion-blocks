import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  resolve: {
    alias: {
      "@ajxdevx/motion-blocks": resolve(__dirname, "src/index.ts"),
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: "demo-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
});
