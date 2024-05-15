import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  defaultCommandTimeout: 13000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 50,
    baseUrl: 'https://karoufeskd.fwscart.com/',
    specPattern: 'cypress/e2e/**.cy.ts',
  },
})

