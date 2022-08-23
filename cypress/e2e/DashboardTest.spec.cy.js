/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DashboardAction } from '../../dist/actions/DashboardAction'
import {LoadConfigData} from '../../dist/utils/LoadConfigData'

var config = null;

describe('Dashboard test', () => {

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


  context('Dashboard validations', () => {

    var entryList = null;

    it('Accessing home', () => {
      cy.login(config.getUser().getUsername(), config.getUser().getPassword());
    })

    it('Opening dashboard', () => {
      entryList = new EntryListAction();
      entryList.goToDashboard();
    })

    it('Backing to Listing', () => {
      let dashboard = new DashboardAction();
      dashboard.goToListing();
    })
  })

  context('Logout context', () => {
    it('Logout', () => {
      cy.logout();
    })
  })

})
