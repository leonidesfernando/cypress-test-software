import { CypressUtils } from "../utils/CypressUtils";

export class GridUI{

  private id:string;

  public constructor(id:string){
    this.id = id;
  }


  public findItemAt(item: string, line: number, column: number) {
      expect(this.existsAnyItem()).to.be.true
      this.mustHaveValueAtCell(line, column, item);
  }

  public mustHaveValueAtCell(line: number, column: number, value: string): void {
    this.getValueAtLine(line, column).filter(`:contains(${value})`).should('have.length', 1)
  }

  protected getValueAtLine(lineIndex: number, column: number): Cypress.Chainable<JQuery<HTMLElement>> {
    const str = `table${this.id}.table:first-of-type tbody > tr:nth-of-type(${lineIndex}) td:nth-of-type(${column})`
    return cy.get(str)
  }

  protected mustBeEmpty(): void {
    expect(this.existsAnyItem()).not.to.be.true
  }

  private existsAnyItem(): boolean {

    let result: boolean = true;
    CypressUtils.waitElementBeVisible(this.id);
    cy.get(this.id).then($table => {
      if ($table.find("ui-empty-table").length == 0) {
        result = false;
        return false;
      }
    });
    return result;
  }

}