/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import {LoadConfigData} from '../../dist/utils/LoadConfigData'
import { CrudUtils } from '../../dist/utils/CrudUtils';

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

  afterEach(() => {
    cy.logout();
  })

  it('Create a new entry and find it', () => {
    let entryList = new EntryListAction();
    let entry = CrudUtils.addEntry(entryList);
    entryList.findEntry(entry.description);
  });

  it('Add, find and edit', () => {
    let entryList = new EntryListAction();
    let entry = CrudUtils.addEntry(entryList);
    entryList.findEntry(entry.description);
    entry.description += ' Edited';
    entryList.openFirstToEdit()
      .and()
      .saveEntry(entry.description, entry.date, entry.value, entry.category, entry.typeEntry);
    entryList.findEntry(entry.description)
  })

  it('Add and remove an entry', () =>{
    let entryList = new EntryListAction();
    let entry = CrudUtils.addEntry(entryList);
    entryList.findEntry(entry.description);
    entryList.removeFirstEntry(entry.description);
  })
  
})
