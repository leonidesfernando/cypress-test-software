
/// <reference types="cypress" />

import {LoadConfigData} from '../../dist/utils/LoadConfigData'

var config = null;

describe('Login test', () => {

  before(() =>{
    cy.log(`Loading configurations from configurations.json`)
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
  })

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => true
    })
  })

  context('Login failed', () => {
    it('Wrong user', () => {
        cy.loginFail(config.getUser().getWrongUsername(), config.getUser().getPassword());
    })

    it('Wrong Password', () => {
        cy.loginFail(config.getUser().getUsername(), config.getUser().getWrongPassword());
    })
  })

})