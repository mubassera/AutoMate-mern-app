import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Correct import

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
