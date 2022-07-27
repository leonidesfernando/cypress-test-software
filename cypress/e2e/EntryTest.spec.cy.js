/// <reference types="cypress" />


import { EntryListAction } from '../../dist/actions/EntryListAction'



let url = Cypress.config('baseUrl')

let HOME = "home";

describe('Open the system', () => {

  it('Access ...: ' + url , () => {
    cy.intercept('GET', '**/lancamentos/').as(HOME)
    cy.visit(url)
    cy.wait(`@${HOME}`, { timeout: 120000 })
  })

  it('create entry', () => {

    let entryList = new EntryListAction();
    entryList.newEntry()
        .and()
        .saveEntry()
  })
  
})
