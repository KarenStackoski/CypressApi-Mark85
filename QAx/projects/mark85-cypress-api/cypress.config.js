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
    },
    baseUrl: 'http://localhost:3333'
  },
});