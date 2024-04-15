import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'tests/__unit__/support/unit.ts',
    include: ['tests/__unit__/**/*.spec.{js,jsx,ts,tsx}'],
    globals: true,
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: fileURLToPath(new URL('./src/core/', import.meta.url)),
      },
    ],
  },
});
