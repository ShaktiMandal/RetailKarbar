

const username = Cypress.env('username');
const password = Cypress.env('password');
const baseUrl = Cypress.env('baseUrlAlias');


Cypress.Commands.add('login', ()=> {
    cy.visit(baseUrl);
})