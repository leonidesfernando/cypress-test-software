import { EntryAction } from "./EntryAction";

import { BySelector, ByXPath, Selector, ById, ByName, By } from 'cypress-selectors';

export class EntryListAction{

  private LISTING_PAGE_WAIT = "LISTING_PAGE_WAIT";
  private ENTRY_PAGE_WAIT = "ENTRY_PAGE_WAIT";

  @ById('novoLancamento')
  private btnNewEntry !: Selector;


  public newEntry(): EntryAction{
    cy.intercept('GET', '**/lancamento/').as(this.ENTRY_PAGE_WAIT)
    this.btnNewEntry.click()
    cy.wait(`@${this.ENTRY_PAGE_WAIT}`)

    return new EntryAction();
  }
}
