import { CypressUtils } from "../utils/CypressUtils";

export class GridUI{

  private id:string;

  public constructor(id:string){
    this.id = id;
  }


  public findItemAt(item: string, line: number, column: number) {
    this.mustHaveValueAtCell(line, column, item);
    expect(this.existsAnyItem()).to.be.true
  }

  public mustNotFindItem(item: string, line:number, column: number){
    this.getValueAtLine(line, column).filter(`:contains(${item})`).should('have.length', 0)
    this.mustBeEmpty()
  }

  public mustHaveValueAtCell(line: number, column: number, value: string): void {
    this.getValueAtLine(line, column).filter(`:contains(${value})`).should('have.length', 1)
  }

  public getButtonAtByClass(line: number, column: number, btnClass: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`table${ this.id }.table:first-of-type tbody > tr:nth-of-type(${line}) td a.${btnClass}`);
  }

  protected getValueAtLine(lineIndex: number, column: number): Cypress.Chainable<JQuery<HTMLElement>> {
    const str = this.getLineSelector(lineIndex, column);
    return cy.get(str)
  }

  private getLineSelector(lineIndex: number, column: number): string {
    return `table${this.id}.table:first-of-type tbody > tr:nth-of-type(${lineIndex}) td:nth-of-type(${column})`;
  }

  protected mustBeEmpty(): void {
    expect(this.existsAnyItem()).not.to.be.false
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
