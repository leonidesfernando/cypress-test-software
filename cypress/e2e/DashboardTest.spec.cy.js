/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DashboardAction } from '../../dist/actions/DashboardAction'
import {LoadConfigData} from '../../dist/utils/LoadConfigData'

let config = null;

describe('Dashboard test', {tags: '@smoke'}, () => {

  before(() =>{
    cy.log(`Loading configurations from configurations.json`)
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
  })

  beforeEach(() => {
    cy.login(config.getUser().getUsername(), config.getUser().getPassword());
  })


  context('Dashboard validations', () => {

    let entryList = null;

    it('Opening dashboard', () => {
      entryList = new EntryListAction();
      entryList.goToDashboard();
    })

    it('Backing to Listing', () => {
      let dashboard = new DashboardAction();
      entryList = new EntryListAction();
      entryList.goToDashboard();
      dashboard.goToListing();
    })
  })

  context('Logout context', () => {
    it('Logout', () => {
      cy.logout();
    })
  })

})
