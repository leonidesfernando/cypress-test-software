/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DashboardAction } from '../../dist/actions/DashboardAction'



describe('Dashboard test', () => {

  context('Dashboard validations', () => {

    var entryList = null;

    it('Accessing home', () => {
      cy.goHome();
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


})
