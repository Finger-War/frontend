import { defineConfig } from 'cypress';
import { env } from 'process';

export default defineConfig({
  e2e: {
    baseUrl: env.PORT,
    supportFile: 'tests/__e2e__/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'tests/__e2e__/**/*.cy.{js,jsx,ts,tsx}',
  },
});
