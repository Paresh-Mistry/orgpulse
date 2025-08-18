const { MongoClient } = require('mongodb');

require('dotenv').config()


let client;


// Connect to Mongo DB
async function connectToMongo() {

    if (!process.env.MONGO_URI) {
        console.error(`MONGO DB URI IS NOT SET IN .env ${process.env.MONGO_URI}`)
    }

    console.log("Running..")

    if (!client) {
        client = new MongoClient(process.env.MONGO_URI)
        console.log("Connecting..")
        await client.connect()
        console.log("Connection Succesfull to MongoDB")
    }

    // Create DB
    return client.db("orgpulse")
}


module.exports = { connectToMongo }