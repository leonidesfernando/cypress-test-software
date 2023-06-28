/// <reference types="cypress" />

import { Given, Before, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {LoadConfigData} from '../../../../dist/utils/LoadConfigData'
import { EntryListAction } from '../../../../dist/actions/EntryListAction'
//import { EntryAction } from '../../../../dist/actions/EntryAction'
import { DataGen } from '../../../../dist/utils/dataGen'


let config;
let entryList = new EntryListAction();
let entryAction;

let date = DataGen.strDateCurrentMonth();
let description = `${DataGen.productName()} on ${date}`;
let value = DataGen.moneyValue();
let category = DataGen.getCategory();
let typeEntry = DataGen.getTipoLancamento(category);

let url = Cypress.config('baseUrl')

Before(() =>{
    cy.log(`Loading configurations from configurations.json`)
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
    cy.visit(url)
})


Given("an user with correct credentials from the configurations", () => {
    expect(config.getUser()).not.null
    expect(config.getUser().getUsername()).not.null
    expect(config.getUser().getPassword()).not.null
    cy.log('validar se logou :)')
})

When('I input a valid credentials I must log in the system', () => {
  cy.login(config.getUser().getUsername(), config.getUser().getPassword())
})

When('I click on new button I must go to the register page', () => {
  entryAction = entryList.newEntry()
})

//https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide

Then('I generate dynamic data and save a new entry', () => {
  entryAction.saveEntry(description, date, value, category, typeEntry)
})

Then('After register we must find out the entry just added or edited', () => {
  entryList.findEntry(description)
})

Then('With the entry found I click on the button to edit it', () => {
  description += ' Edited';
  entryList.openFirstToEdit()
    .saveEntry(description, date, value, category, typeEntry);
})

Then("I should be able to remove the newly found entry", () => {
  entryList.removeFirstEntry(description);
})



Then('Do logout', () => {
  cy.logout()
})

/*

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


*/
