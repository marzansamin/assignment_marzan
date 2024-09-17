const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl:"https://opensource-demo.orangehrmlive.com//",
    watchForFileChanges:false,
    autoRefresh:false,
    setupNodeEvents(on, config) {
      reporter: 'cypress-mochawesome-reporter',
      // implement node event listeners here
      config.specPattern = [
        'cypress/e2e/assignment_marzan.cy.js', 
      ]
      return config;
    },
  },
});
