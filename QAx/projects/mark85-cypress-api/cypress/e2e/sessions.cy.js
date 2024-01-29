///<reference types="cypress"/>

describe('POST /sessions', () => {
    it('user session', () => {
        const user = {
            email: 'peralta@hotmail.com',
            password: 'peraltiago'
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).eq(200)
            })
    })
})