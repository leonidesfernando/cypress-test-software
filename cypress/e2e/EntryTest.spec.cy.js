/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { LoadConfigData } from '../../dist/utils/LoadConfigData'
import { CrudUtils } from '../../dist/utils/CrudUtils'

let config = null

describe('Entry CRUD', () => {
  before(() => {
    cy.log('Loading configurations from configurations.json')
    cy.fixture('configuration.json').then(configData => {
      config = LoadConfigData.loadData(configData)
      expect(config).not.null
    })
  })

  beforeEach(() => {
    cy.login(config.getUser().getUsername(), config.getUser().getPassword())
  })

  afterEach(() => {
    cy.logout()
  })

  context('Hitting the real API', () => {
    it('Create a new entry and find it', () => {
      const entryList = new EntryListAction()
      const entry = CrudUtils.addEntry(entryList)
      entryList.findEntry(entry.description)
    })

    it('Add, find and edit', () => {
      const entryList = new EntryListAction()
      const entry = CrudUtils.addEntry(entryList)
      entryList.findEntry(entry.description)
      entry.description += ' Edited'
      entryList.openFirstToEdit()
        .and()
        .saveEntry(entry.description, entry.date, entry.value, entry.category, entry.typeEntry)
      entryList.findEntry(entry.description)
    })

    it('Add and remove an entry', () => {
      const entryList = new EntryListAction()
      const entry = CrudUtils.addEntry(entryList)
      entryList.findEntry(entry.description)
      entryList.removeFirstEntry(entry.description)
    })
  });

  context('Mocking the API - EMPTY RESULT', () => {
    before(() => {
      cy.intercept('POST', '**/buscaLancamentos',
        {
          fixture: 'emptySearch.json'
        },
        
      ).as('emptySearch');
    })

    it('Search an nonexistent item using mock', () => {
      const entryList = new EntryListAction();
      entryList.notFindEntry('dsfsdaf');
    })
  })


  context('Mocking the API with data', () => {
    before(() => {
      cy.intercept('POST', '**/buscaLancamentos',
        {
          fixture: 'entitiesSearch.json'
        },
      ).as('entitiesSearch');
    })

    it('Search an nonexistent item using mock', () => {
      const entryList = new EntryListAction();
      const firstItem = 'Cypress: Pizza on 01/09/2023 in chrome Edited';
      entryList.findEntry(firstItem);
    })
  })


})
