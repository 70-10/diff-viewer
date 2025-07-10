import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true,
      exclude: [
        ".next/",
        "**/*.config.{js,ts}",
        "**/src/app/layout.tsx", 
        "**/src/components/ui/**.{ts,tsx}",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
