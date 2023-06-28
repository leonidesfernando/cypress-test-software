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
    cy.login(config.getUser().getUsername(), config.getUser().getPassword());
  })
/*
  const Item = {
    date: "",
    description: "",
    value: "",
    category: "",
    typeEntry: ""
  }

  const data = [];

  function newItem(){
    const item = Object.create(Item);
    item.date = DataGen.strDateCurrentMonth();
    item.description = `${DataGen.productName()} on ${item.date}`;
    item.value = DataGen.moneyValue();
    item.category = DataGen.getCategory();
    return item;
  }

  const nItens = 2;
  context(`CRUD - Adding ${nItens} items`, () => {
    let entryList = new EntryListAction();
    for(let i = 1; i <= nItens; i++){
      it(`Adding ${i}th item`, () => {
        const item = newItem();
        data.push(item);
        entryList.newEntry()
        .and()
        .saveEntry(item.description, item.date, item.value, item.category, item.typeEntry)
      })
    }
  });


  context(`CRUD - Editing and removing the entry just added`, () => {

    const index = DataGen.numberByRange(data.length);
    const item = data[index];
    let editedDescription = item.description;
    let entryList = new EntryListAction();
    it(`Finding the entry just added: ${item.description}`, () => {
      
      entryList.findEntry(editedDescription);

      editedDescription += ' Edited';
      entryList.openFirstToEdit()
        .saveEntry(editedDescription, item.date, item.value, item.category, item.typeEntry);

      entryList.findEntry(editedDescription)
    })

    it(`Removing the edited entry: ${editedDescription}`, () =>{

      entryList.findEntry(editedDescription);
      entryList.removeFirstEntry(editedDescription);
    })
  })*/


  
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
          .and()
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
