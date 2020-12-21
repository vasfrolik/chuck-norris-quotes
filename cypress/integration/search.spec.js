describe('Search Function', () => {
    context('720p resolution', () => {
        beforeEach(() => {
            cy.viewport(1280, 720)
        })

        describe('When visiting homepage', () => {
            it('Should visit home page', () => {
                cy.visit('/')
            })

            describe('search input', () => {
                it('Should focus on search input', () => {
                    cy.get('[data-cy=search-input]').focus()
                })
                it('Should be able to type in search input', () => {
                    cy.get('[data-cy=search-input').type('hello').should('have.value', 'hello')
                })
            })

            describe('search form input', () => {
                it('Should submit searched input', () => {
                    cy.get('[data-cy=search-form]').submit()
                    cy.get('[data-cy=results-container]').should('be.not.empty')
                })
            })
        })

    })
})