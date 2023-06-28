
/// <reference types="cypress" />

import {LoadConfigData} from '../../dist/utils/LoadConfigData'

let config = null;


let url = Cypress.config('baseUrl')

describe('Login test', () => {

  before(async ()=>{
    await cy.clearCookies();
    cy.log(`Loading configurations from configurations.json`)
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
  })

  beforeEach(() => {
    cy.visit(url)
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