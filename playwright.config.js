import { defineConfig, devices } from "@playwright/test";

// Own port, so tests never reuse another project's dev server.
const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "*.spec.js",
  fullyParallel: true,
  use: {
    baseURL: BASE_URL,
  },
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: BASE_URL,
    timeout: 300_000,
  },
  projects: [
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "Pixel", use: { ...devices["Pixel 7"] } },
    { name: "iPhone", use: { ...devices["iPhone 15"] } },
  ],
});
