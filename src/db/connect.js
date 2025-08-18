const { MongoClient } = require('mongodb');

require('dotenv').config()

let client;

async function connectToMongo(){

    if(!process.env.MONGO_URI){
        throw new error("MONGO DB URI IS NOT SET IN .env")
    }

    if(!client){
        client = new MongoClient.U(process.env.MONGO_URI)
        await client.connect()
        if(client.connect == true){
            console.log("Connection Succesfull to MongoDB")
        }
    }

    return client.db
}



module.exports = {connectToMongo}