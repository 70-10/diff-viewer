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
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
