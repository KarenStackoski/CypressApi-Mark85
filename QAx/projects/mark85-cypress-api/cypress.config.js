const { defineConfig } = require("cypress");

const { connect } = require('./cypress/support/mongo')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const db = await connect()

      on('task', {
        async removeUser(email) {
          const users = db.collection('users')
          await users.deleteOne({ email: email })
          return null
        },
      })

      on('task', {
        async removeTask(name, email) {
          const users = db.collection('users')
          const user = users.findOne({email: email})
          const tasks = db.collection('tasks')
          await tasks.deleteOne({name: name, user: user.id})
          return null
        },
      })

      on('task', {
        async deleteTasksLike(text) {
          const tasks = db.collection('tasks')
          await tasks.deleteOne({ email: { $regex: text } })
          return null
        }
      })
    },
    baseUrl: 'http://localhost:3333'
  },
});
