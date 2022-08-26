// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let url = Cypress.config('baseUrl')
let HOME = "home";


Cypress.Commands.add('login', (user, password) => {

  cy.intercept('GET', '**/lancamentos/').as(HOME)
  cy.visit(url)
  cy.get('#user').type(user)
  cy.get('#password').type(password).type('{enter}')
  cy.wait(`@${HOME}`)
  cy.get('#logout').contains('Logout')
  cy.url().should('contain', '/lancamentos')
})

Cypress.Commands.add('loginFail', (user, password) => {

  cy.visit(url)
  cy.get('#user').type(user)
  cy.get('#password').type(password).type('{enter}')
  cy.get('.text-danger').should('contain.text', 'Bad credentials')
})


Cypress.Commands.add('logout', () => {

  let LOGIN = 'login'
  cy.intercept('GET', '**/login').as(LOGIN)
  cy.get('#logout').click()
  cy.wait(`@${LOGIN}`)
  cy.url().should('contain', '/login')
})



Cypress.Commands.add('goHome', () => {
  
  cy.intercept('GET', '**/lancamentos/').as(HOME)
  cy.visit(url)
  cy.wait(`@${HOME}`, { timeout: 120000 })
 
})
