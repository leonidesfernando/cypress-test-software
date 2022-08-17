

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
  private radioIncome !: Selector;

  @ById('tipoLancamento2')
  private radioSpent !: Selector;

  @ById('tipoLancamento3')
  private radioTransf !: Selector;


  public and(): EntryAction {
    return this;
  }

  public then(): EntryAction {
    return this;
  }

  public saveEntry(description: string, date: string, value: string, category: string, typeEntry: string) {


    this.fillData(description, date, value, category, typeEntry);
    this.btnSave.click();
  }

  public trySaveWithoutDescription(date: string, value: string, category: string, typeEntry: string){

    this.saveEntry('', date, value, category, typeEntry)
    cy.get('.alert').should('contain', 'A descrição deve ser informada');
    this.btnCancel.click();
  }

  private fillData(description: string, date: string, value: string, category: string, typeEntry: string) {
    this.fillDescription(description);
    this.inputDate.type(date);
    this.inputDescription.click();
    this.inputAmount.type(value);
    this.selectTypeEntry(typeEntry)
    this.selectCategory.select(category)
  }

  private selectTypeEntry(typeEntry: string) {
    switch(typeEntry){
      case 'TRANSF':
        this.radioTransf.click();
        break;
      case 'RENDA':
        this.radioIncome.click();
        break;
      case 'DESPESA':
        this.radioSpent.click();
        break;
    }
  }



  private fillDescription(description: string) {
    this.inputDescription.clear();
    if(description && (description.trim() != ''))
      this.inputDescription.type(description);
  }

}