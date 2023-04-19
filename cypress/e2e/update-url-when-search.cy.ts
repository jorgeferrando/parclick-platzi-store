import products from '../fixtures/searc-title-eq-prod';
import categories from '../fixtures/categories';
describe('Advanced Search', () => {
  it('it should show products when user types on the search box', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/products/*',
      },
      {
        statusCode: 200,
        body: products,
      }
    ).as('getProducts');
    cy.intercept(
      {
        method: 'GET',
        url: '**/categories',
      },
      {
        statusCode: 200,
        body: categories,
      }
    ).as('getCategories');
    cy.visit('http://localhost:4200/advanced-search');
    cy.wait('@getCategories');
    cy.get('#search').type('prod');
    cy.get('#min-price').type('0');
    cy.get('#max-price').type('100');
    cy.get('#category').select(1);
    cy.location('search').should(
      'include',
      '?title=prod&price_min=0&price_max=100&categoryId=1'
    );
  });
});
