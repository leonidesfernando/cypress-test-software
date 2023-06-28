const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/',
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  reporterEnabled: 'spec, mocha-junit-reporter',
  mochaJunitReporterReporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml',
  },
});
