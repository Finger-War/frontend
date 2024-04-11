import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

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
        replacement: fileURLToPath(new URL('./src/', import.meta.url)),
      },
    ],
  },
});
