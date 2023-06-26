// mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.DATABASE_URL
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client = new MongoClient(uri, options)
let mongo

if (!process.env.DATABASE_URL) {
    throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {

        global._mongoClientPromise = client.connect()
    }
    mongo = global._mongoClientPromise
} else {

    mongo = client.connect()
}

export default mongo
