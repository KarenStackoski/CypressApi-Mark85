const { MongoClient } = require('mongodb')

require('dotenv').config()

const mongoUri = 'mongodb+srv://stackoskikaren:deps@cluster0.nuxqaqv.mongodb.net/markdb?retryWrites=true&w=majority'

const client = new MongoClient(mongoUri)

async function connect() {
    await client.connect()

    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }