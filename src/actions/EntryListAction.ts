import { EntryAction } from "./EntryAction";

import { BySelector, ByXPath, Selector, ById, ByName, By } from 'cypress-selectors';
import { GridUI } from "../components/GridUI";

export class EntryListAction{

  private LISTING_PAGE_WAIT = "LISTING_PAGE_WAIT";
  private ENTRY_PAGE_WAIT = "ENTRY_PAGE_WAIT";
  private SEARCH_WAIT = "SEARCH_WAIT";

  @ById('novoLancamento')
  private btnNewEntry !: Selector;

  @ById('itemBusca')
  private inputSearch !: Selector;


  public newEntry(): EntryAction{
    cy.intercept('GET', '**/lancamento/').as(this.ENTRY_PAGE_WAIT)
    this.btnNewEntry.click()
    cy.wait(`@${this.ENTRY_PAGE_WAIT}`)

    return new EntryAction();
  }

  public findEntry(description: string){
    this.searchByDescription(description);
    let grid = new GridUI('#tabelaLancamentos');
    grid.findItemAt(description, 1, 1);
  }

  private searchByDescription(description: string){
    expect(description).not.be.null;
    cy.intercept('POST', '**/buscaLancamentos').as(this.SEARCH_WAIT)
    this.inputSearch.type(description).type('{enter}')
    cy.wait(`@${this.SEARCH_WAIT}`)
  }
}
