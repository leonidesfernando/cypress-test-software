import { CypressUtils } from "../utils/CypressUtils";

export class GridUI{

  private id:string;

  public constructor(id:string){
    this.id = id;
  }

  /**
  * 
  * @param line - which line the text must be found
  * @param item - where should used to perform the search(description, category, entryType)
  */
  public getTextItemAtLineBy(line: number, item:string){
    return cy.get(`td#${item}${line}`);
  }
  
  public mustNotFindItem(item: string, line:number, columnName: string){
    this.mustBeEmpty();
  }

  public getButtonAtByClass(line: number, column: number, btnClass: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`table${ this.id }.table:first-of-type tbody > tr:nth-of-type(${line}) td a.${btnClass}`);
  }


  private getLineSelector(lineIndex: number, column: number): string {
    return `table${this.id}.table:first-of-type tbody > tr:nth-of-type(${lineIndex}) td:nth-of-type(${column})`;
  }

  protected mustBeEmpty(): void {
    this.existsAnyItem().then($table => 
      expect($table.find('ui-empty-table').length).be.eq(0)
    );
  }

  private existsAnyItem() {
    CypressUtils.waitElementBeVisible(this.id);
    return cy.get(this.id);
  }

}
