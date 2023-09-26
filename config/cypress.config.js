const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/',
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here

    }
  },
  
  chromeWebSecurity: false,
  experimentalMemoryManagement: true, // se ser erro, remova essa linha e volvte o video pra false na linha 6
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },
  reporterEnabled: 'spec, mocha-junit-reporter',
  mochaJunitReporterReporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml'
  }
})
