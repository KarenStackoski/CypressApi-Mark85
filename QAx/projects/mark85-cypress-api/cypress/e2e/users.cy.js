///<reference types="cypress"/>

describe('POST /users', ()=> {
    it('register a new user', () => {
        const user = {
            name: 'Jake Peralta',
            email: 'peralta@hotmail.com',
            password: 'peraltiago'
        }

        cy.task('removeUser', user.email)

        cy.postUser(user)
        .then(response => {
            expect(response.status).eq(200)
            cy.log(JSON.stringify(response.body))
        })
    })

    it('duplicate user', () => {
        const user = {
            name: 'Raymond Holt',
            email: 'rayray@hotmail.com',
            password: 'cheddar'
        }

        cy.task('removeUser', user.email)

        //first time posting
        cy.postUser(user)

        //second time posting
        cy.postUser(user)
        .then(response => {
            const { message } = response.body
            expect(response.status).eq(409)
            expect(message).eq('Duplicated email!')
        })
    })

    context('requred fields', () => {
        //test dough - data fields
        let user

        beforeEach(() => {
            user = {
                name: 'Jake Peralta',
                email: 'peralta@hotmail.com',
                password: 'peraltiago'
            }
        })

        it('name is required', () => {
            //delete data from name field
            delete user.name
            //post data
            cy.postUser(user)
                .then(response => {
                    const { message } = response.body
                    expect(response.status).eq(400)
                    expect(message).eq('ValidationError: \"name\" is required')
                })
        })

        it('email is required', () => {
            delete user.email

            cy.postUser(user)
                .then(response => {
                    const { message } = response.body
                    expect(response.status).eq(400)
                    expect(message).eq('ValidationError: \"email\" is required')
                })
        })

        it('password is required', () => {
            delete user.password

            cy.postUser(user)
                .then(response => {
                    const { message } = response.body
                    expect(response.status).eq(400)
                    expect(message).eq('ValidationError: \"password\" is required')
                })
        })
    })
})