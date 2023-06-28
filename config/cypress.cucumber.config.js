const { defineConfig } = require("cypress");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

const afterRunHandler = require("@badeball/cypress-cucumber-preprocessor").afterRunHandler;

const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const fs = require('fs');

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

      on('after:run', async (results) => {
        if (results) {
          await afterRunHandler(config);
          fs.writeFileSync(
            './../cypress/cucumber-report/results.json',
            JSON.stringify(
              {
                browserName: results.browserName,
                browserVersion: results.browserVersion,
                osName: results.osName,
                osVersion: results.osVersion,
                nodeVersion: results.config.resolvedNodeVersion,
                cypressVersion: results.cypressVersion,
                startedTestsAt: results.startedTestsAt,
                endedTestsAt: results.endedTestsAt,
              },
              null,
              '\t',
            ),
          );
        }
      });

      return config;
    },
  },
  chromeWebSecurity: false,
});
