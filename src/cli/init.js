const { connectToMongo } = require('../db/connect');

async function initCommand() {
  const db = await connectToMongo();

  const repos = db.collection('repos');
  await repos.createIndex({ org: 1, stars: -1 });
  await repos.createIndex({ org: 1, name: 1 }, { unique: true });

  const issues = db.collection('issues');
  await issues.createIndex({ repo: 1, state: 1 });
  await issues.createIndex({ repo: 1, number: 1 }, { unique: true });

  console.log("Great! Indexes Ready.");
}

module.exports = initCommand;