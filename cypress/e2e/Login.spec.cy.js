/// <reference types="cypress" />

import { LoadConfigData } from '../../dist/utils/LoadConfigData'

let config = null

const url = Cypress.config('baseUrl')

describe('Login test', { tags: '@smoke' }, () => {
  before(async () => {
    await cy.clearCookies()
    cy.log('Loading configurations from configurations.json')
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
      cy.loginFail(config.getInvalidUser().getUsername(), config.getInvalidUser().getPassword())
    })

    it('Wrong Password', () => {
      cy.loginFail(config.getUser().getUsername(), config.getInvalidUser().getPassword())
    })
  })

  context('Login successful', () => {
    it('Valid credentials', () => {
      cy.login(config.getUser().getUsername(), config.getUser().getPassword())
    })
  })
})
