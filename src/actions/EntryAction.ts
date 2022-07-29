

import { BySelector, ByXPath, Selector, ById, ByName, By } from 'cypress-selectors';

export class EntryAction {


  @ById('descricao')
  private inputDescription!: Selector;

  @ById('datepicker')
  private inputDate!: Selector;


  @ByName('valor')
  private inputAmount!: Selector;

  @ById('categoria')
  private selectCategory!: Selector;

  @ById('btnSalvar')
  private btnSave!: Selector;

  @ById('cancelar')
  private btnCancel!: Selector;
  
  @ById('tipoLancamento1')
  private radioEntry !: Selector;

  @ById('tipoLancamento2')
  private radioSpent !: Selector;


  public and(): EntryAction {
    return this;
  }

  public then(): EntryAction {
    return this;
  }

  public saveEntry(description: string, date: string, value: string, category:string) {


    this.fillData(description, date, value, category);
    this.btnSave.click();
  }

  public trySaveWithoutDescription(date: string, value: string, category: string){

    this.saveEntry('', date, value, category)
    cy.get('.alert').should('contain', 'A descrição deve ser informada');
    this.btnCancel.click();
  }

  private fillData(description: string, date: string, value: string, category: string) {
    this.fillDescription(description);
    this.inputDate.type(date);
    this.inputDescription.click();
    this.inputAmount.type(value);
    this.selectCategory.select(category)
  }

  private fillDescription(description: string) {
    this.inputDescription.clear();
    if(description && (description.trim() != ''))
      this.inputDescription.type(description);
  }

}