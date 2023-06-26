/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DataGen } from "../../dist/utils/DataGen";
import {LoadConfigData} from '../../dist/utils/LoadConfigData'

let config = null;


describe('Entry CRUD', () => {

  before(() =>{
    cy.log(`Loading configurations from configurations.json`)
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
  })

  beforeEach(() => {
    /*Cypress.Cookies.defaults({
      preserve: (cookie) => true
    })*/
    cy.login(config.getUser().getUsername(), config.getUser().getPassword());
  })


  /*it('Login', () => {
    cy.login(config.getUser().getUsername(), config.getUser().getPassword());
  }) */

  context('CRUD context - Create a new entry, find and edit, find and remove ', () => {

    let date = DataGen.strDateCurrentMonth();
    let description = `${DataGen.productName()} on ${date}`;
    let value = DataGen.moneyValue();
    let category = DataGen.getCategory();
    let typeEntry = DataGen.getTipoLancamento(category);

    let entryList = new EntryListAction();


    context(`Creating a new entry: ${description}, ${category}, ${typeEntry}`, () => {

      it('Create valid entry', () => {

          entryList.newEntry()
            .and()
          .saveEntry(description, date, value, category, typeEntry)
        })
        
        it('Finding the entry just added', () => {
          entryList.findEntry(description)
      })
    })

    context(`Editing and removing the entry just added: : ${description}, ${category}, ${typeEntry}`, () => {

      let editedDescription = description;
      it(`Finding the entry just added: ${description}`, () => {
        
        entryList.findEntry(editedDescription);

        editedDescription += ' Edited';
        entryList.openFirstToEdit()
          .saveEntry(editedDescription, date, value, category, typeEntry);

        entryList.findEntry(editedDescription)
      })

      it(`Removing the edited entry: ${editedDescription}`, () =>{

        entryList.findEntry(editedDescription);
        entryList.removeFirstEntry(editedDescription);
      })
    })
  
  })


  it('Try to create a invalid entry', () => {

    let value = DataGen.moneyValue();
    let date = DataGen.strDateCurrentMonth();
    let newCategory = DataGen.getCategory();
    let newTypeEntry = DataGen.getTipoLancamento(newCategory);

    let entryList = new EntryListAction();
    entryList.newEntry()
      .and()
      .trySaveWithoutDescription(date, value, newCategory, newTypeEntry);
  })

  context('Logout context', () => {
    it('Logout', () => {
      cy.logout();
    })
  })

})
