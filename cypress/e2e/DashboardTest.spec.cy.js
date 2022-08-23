/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DashboardAction } from '../../dist/actions/DashboardAction'



describe('Dashboard test', () => {

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => true
    })
  })


  context('Dashboard validations', () => {

    var entryList = null;

    it('Accessing home', () => {
      cy.login('user', 'a');
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
