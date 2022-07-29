
export const CypressUtils = {
  
  waitElementNotBeVisible(elemento: string): void {
    cy.get(elemento).should("not.be.visible");
  },

  waitElementBeVisible(elemento: string): void {
    cy.get(elemento).should("be.visible");
  }
}