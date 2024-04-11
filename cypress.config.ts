import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'tests/__e2e__/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'tests/__e2e__/**/*.cy.{js,jsx,ts,tsx}',
  },
});
