/// <reference types="cypress" />

import { Given, Before } from '@badeball/cypress-cucumber-preprocessor'
import { LoadConfigData } from '../../../../dist/utils/LoadConfigData'
import { UserUtil } from '../../../../dist/utils/UserUtil'

let config;
const url = Cypress.config('baseUrl')

Before(() => {
  cy.log('Loading configurations from configurations.json')
  cy.fixture('configuration.json').then(configData => {
    config = LoadConfigData.loadData(configData)
    expect(config).not.null
  })
  cy.visit(url)
})


Given('The follow credentials then', function(table){
  const loginData = table.hashes()
  for(const row of loginData ){
    tryToLogin(row);
  }
});

Given('The follow credentials {string} and {string}', function (user, password) {
  const credential = {"User": user, "Password": password};
  tryToLogin(credential);
});

function tryToLogin(credential){
  const user = UserUtil.getUserByParam(config, credential);
  if (UserUtil.isValidCredentials(credential)) {
    cy.login(user.getUsername(), user.getPassword());
    cy.logout();
  } else {
    cy.loginFail(user.getUsername(), user.getPassword());
  }
}
