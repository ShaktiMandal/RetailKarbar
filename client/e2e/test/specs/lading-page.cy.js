describe('Ruting test', ()=> {
    beforeEach(()=>{
        cy.login();
    });

    it('First test', ()=> {
        cy.get('[data-logo-cy=login-logo]').children().should('have.length', 1)
    })
})