/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DataGen } from "../../dist/utils/DataGen";

let url = Cypress.config('baseUrl')
let HOME = "home";

let CATEGORIES = ['ALIMENTACAO', 'SALARIO', 'LAZER'
  , 'TELEFONE_INTERNET', 'CARRO', 'EMPRESTIMO', 'INVESTIMENTOS', 'OUTROS']


/*-----------------------------------------------
 *  # Ordinay functions
 -------------------------------------------------*/
function getCategory(){
  let index = DataGen.numberByRange(CATEGORIES.length);
  return CATEGORIES[index];
}

function goHome(){
  cy.intercept('GET', '**/lancamentos/').as(HOME)
  cy.visit(url)
  cy.wait(`@${HOME}`, { timeout: 120000 })
}



describe('Open the system', () => {

  it('Access ...: ' + url , () => {
    goHome()
  })


  context('Create a new entry and find it', () => {

    let date = DataGen.strDateCurrentMonth();
    let description = `${DataGen.productName()} on ${date}`;
    let value = DataGen.moneyValue();

    let entryList = new EntryListAction();
  
    it('Create valid entry', () => {
    
      entryList.newEntry()
          .and()
        .saveEntry(description, date, value, getCategory())
      })
      
      it('Finding the entry', () => {
        entryList.findEntry(description)
    })
  })


  it('Try to create a invalid entry', () => {

    let value = DataGen.moneyValue();
    let date = DataGen.strDateCurrentMonth();

    let entryList = new EntryListAction();
    entryList.newEntry()
      .and()
      .trySaveWithoutDescription(date, value, getCategory());
  })
  
})
