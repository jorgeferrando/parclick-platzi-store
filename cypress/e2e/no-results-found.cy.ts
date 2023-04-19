describe('Home Page', () => {
  it('should show "No results found messge" if comes empty array from API', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/products/?title=prod',
      },
      {
        statusCode: 200,
        body: [],
      }
    ).as('getProducts');
    cy.visit('http://localhost:4200');
    cy.get('#search').type('prod');
    cy.wait('@getProducts');
    cy.get('.homePage__results__notFound').should('be.visible');
  });
});
