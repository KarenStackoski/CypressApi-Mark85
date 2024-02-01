///<reference types="cypress"/>

describe('POST /tasks', function() {
    beforeEach(function() {
        cy.fixture('tasks/post').then(function(tasks){
            this.tasks = tasks
        })
    })

    it('register a new task', function() {
        const { user, task } = this.tasks.create

        cy.task('removeUser', user.email)
        cy.postUser(user)
        
        cy.postSession(user).then(responseUser => {
            cy.task('removeTask', task.name, user.email)

            cy.postTask(task, responseUser.body.token)
                .then(response => {
                    expect(response.status).eq(201)
                    expect(response.body.name).eq(task.name)
                    expect(response.body.tags).eql(task.tags)
                    expect(response.body.is_done).to.be.false
                    expect(response.body.user).eq(responseUser.body.user._id)
                    expect(response.body._id.length).eq(24)
                })
        })        
    })

    it('duplicate task', function() {
        const { user, task } = this.tasks.dup

        cy.task('removeUser', user.email)
        cy.postUser(user)
        
        cy.postSession(user).then(responseUser => {
            cy.task('removeTask', task.name, user.email)

            cy.postTask(task, responseUser.body.token)

            cy.postTask(task, responseUser.body.token)
                .then(response => {
                    expect(response.status).eq(409)
                    expect(response.body.message).eq('Duplicated task!')
                })
        })        
    })
})