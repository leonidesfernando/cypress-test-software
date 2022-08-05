/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DashboardAction } from '../../dist/actions/DashboardAction'


let url = Cypress.config('baseUrl')
let HOME = "home";


function goHome() {
  cy.intercept('GET', '**/lancamentos/').as(HOME)
  cy.visit(url)
  cy.wait(`@${HOME}`, { timeout: 120000 })
}


describe('Dashboard test', () => {

  context('Dashboard validations', () => {

    var entryList = null;

    it('Accessing home', () => {
      goHome();
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