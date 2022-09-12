/// <reference types="cypress" />

import { Given, Before, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {LoadConfigData} from '../../../../dist/utils/LoadConfigData'

//const {AfterStep, BeforeStep} = require('cucumber')


let config;


Before(() =>{
    cy.log(`Loading configurations from configurations.json`)
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
})

// https://dev.to/leading-edje/using-gherkin-with-your-cypress-tests-4p20
// https://www.npmjs.com/package/cypress-cucumber-preprocessor
// https://www.npmjs.com/package/cypress-cucumber-preprocessor

/*
BeforeStep(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => true
    })
}) */

Given("an user with correct credentials from the configurations", () => {
    expect(config.getUser()).not.null
    cy.log('validar se logou :)')
})


Then('Have to login and access the home page', () => {
    cy.login(config.getUser().getUsername(), config.getUser().getPassword())
})

Then('Do logout', () => {
  cy.logout()
})
