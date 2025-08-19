const { MongoClient } = require("mongodb")

require("dotenv").config()

let client;

// Connect to Mongo DB
async function connectToMongo() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO DB URI IS NOT SET IN .env");
  }

  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("Connection Successful to MongoDB");
  }

  // Create DB
  return client.db("orgpulse");
}

module.exports = {connectToMongo}