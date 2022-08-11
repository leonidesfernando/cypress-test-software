import { Selector, BySelector, ById } from "cypress-selectors";


export class DashboardAction{

  private readonly LISTING = 'LISTING'
  
  @BySelector("a[title='Listagem']")
  private btnList !: Selector;

  @ById('pieChart')
  private pieChart !: Selector;

  @ById('tableChart')
  private tableChat !: Selector;



  public goToListing(){
    cy.intercept('GET', '**/lancamentos/').as(this.LISTING)
    this.btnList.click();
    cy.wait(`@${this.LISTING}`)
  }

  public checkingDashboard(){
    this.pieChart.should('be.visible');
    this.tableChat.should('be.visible');
    cy.log('Dashboard checked.')
  }

}
