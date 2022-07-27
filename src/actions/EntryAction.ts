import { DataGen } from "../utils/dataGen";

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

  @ById('tipoLancamento1')
  private radioEntry !: Selector;

  @ById('tipoLancamento2')
  private radioSpent !: Selector;

  private readonly CATEGORIES: string[] = ['ALIMENTACAO', 'SALARIO', 'LAZER'
     ,'TELEFONE_INTERNET', 'CARRO', 'EMPRESTIMO', 'INVESTIMENTOS', 'OUTROS']


  public and(): EntryAction {
    return this;
  }

  public then(): EntryAction {
    return this;
  }

  public saveEntry() {

    let description = DataGen.productName();
    let value = DataGen.moneyValue();
    let date = DataGen.strDateCurrentMonth();

    let index = DataGen.numberByRange(this.CATEGORIES.length);

    cy.log(description)
    cy.log(value)
    cy.log(date)
    this.fillData(description, date, value, this.CATEGORIES[index]);
    this.btnSave.click();
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
    this.inputDescription.type(`Cypress - ${description}`);
  }

}