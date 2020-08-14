describe('BookList.vue', () => {
  it('open it', () => {
    cy.visit('/')
    cy.get('.books').contains('.book', 'The Go Programming Language')
  })

  it('filter only one book', () => {
    cy.visit('/')
    cy.get('.search').type('The Go Programming Language')
    cy.get('.books').find('.book').should('have.length', 1)
  })

  it('create btn should be disabled for not fullfilled form', () => {
    cy.visit('/')
    cy.get('.add-new').click()
    cy.get('button').should('have.attr', 'disabled')
  })

  it('create btn should be enabled for correct form', () => {
    cy.visit('/')
    cy.get('.add-new').click()
    cy.get('.book__title').type('test book')
    cy.get('.book__promo').type('test book promo')
    cy.get('.book__isbn').type(1234567890123)
    cy.get('.book__year').type(2020)
    cy.get('.book__price').type(2020)
    cy.get('.book__category').type('test category')
    cy.get('.book__tags').type('test tags')
    cy.get('.book__src').type('test src')
    cy.get('button').should('not.have.attr', 'disabled')
  })
})
