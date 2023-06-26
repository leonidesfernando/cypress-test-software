const { defineConfig } = require("cypress");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const addCucumberPreprocessorPlugin  = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

const createEsbuildPlugin  = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;



module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/',
    video: false,
    specPattern: 'cypress/e2e/features/**/*.feature',
    async setupNodeEvents(on, config) {
      // implement node event listeners here

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
  },
  chromeWebSecurity: false,
});
