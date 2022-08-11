import { EntryAction } from "./EntryAction";

import { BySelector, ByXPath, Selector, ById, ByName, By } from 'cypress-selectors';
import { GridUI } from "../components/GridUI";
import { DashboardAction } from "./DashboardAction";


enum Button {
  EDIT = 'btn-primary',
  DELETE = 'btn-danger'
}


export class EntryListAction{

  private LISTING_PAGE_WAIT = "LISTING_PAGE_WAIT";
  private ENTRY_PAGE_WAIT = "ENTRY_PAGE_WAIT";
  private SEARCH_WAIT = "SEARCH_WAIT";
  private DASHBOARD = "DASHBOARD";

  @ById('novoLancamento')
  private btnNewEntry !: Selector;

  @ById('itemBusca')
  private inputSearch !: Selector;

  @BySelector("a[title='Gráfico']")
  private btnDashboard !: Selector;

  public newEntry(): EntryAction{
    cy.intercept('GET', '**/lancamento/').as(this.ENTRY_PAGE_WAIT)
    this.btnNewEntry.click()
    cy.wait(`@${this.ENTRY_PAGE_WAIT}`)

    return new EntryAction();
  }

  public findEntry(description: string){
    this.searchByDescription(description);
    let grid = this.getGrid();
    grid.findItemAt(description, 1, 1);
  }

  public goToDashboard(){

    cy.intercept('GET', '**/dashboard').as(this.DASHBOARD)
    this.btnDashboard.click();
    cy.wait(`@${this.DASHBOARD}`)
    let dashboard = new DashboardAction();
    dashboard.checkingDashboard();
  }

  public removeFirstEntry(description: string):void{
    this.clickButton(Button.DELETE)
    let grid = this.getGrid();
    grid.mustNotFindItem(description, 1, 1);
  }

  public openFirstToEdit(): EntryAction {
    this.clickButton(Button.EDIT)
    return new EntryAction();
  }

  protected clickButton(btn: Button){
    let grid = this.getGrid();
    cy.log('btn class: ' + btn.toString())
    grid.getButtonAtByClass(1, 6, btn.toString()).click()
  }

  private getGrid(): GridUI{
    return new GridUI('#tabelaLancamentos');
  }

  private searchByDescription(description: string){
    expect(description).not.be.null;
    cy.intercept('POST', '**/buscaLancamentos').as(this.SEARCH_WAIT)
    this.inputSearch.clear().type(description).type('{enter}')
    cy.wait(`@${this.SEARCH_WAIT}`)
  }
}
