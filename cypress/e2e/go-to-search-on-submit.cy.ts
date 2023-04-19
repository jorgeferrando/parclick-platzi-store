import products from '../fixtures/searc-title-eq-prod';
describe('Home Page', () => {
  it('it should show products when user types on the search box', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/products/?title=prod',
      },
      {
        statusCode: 200,
        body: products,
      }
    ).as('getProducts');
    cy.visit('http://localhost:4200');
    cy.get('#search').type('prod', { delay: 200 });
    cy.wait('@getProducts');
    cy.get('form').submit();
    cy.location('pathname').should('include', 'advanced-search');
    cy.location('search').should('include', '?title=prod');
  });
});
