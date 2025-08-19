const { connectToMongo } = require("../db/connect");

async function checkCommand() {
  try {
    const db = await connectToMongo();
    const reposCol = db.collection("repos");

    // Get distinct organization names from repos collection
    const orgs = await reposCol.distinct("org");

    console.log(orgs)

    if (orgs.length > 0) {
      console.log("✅ Available organizations in the database:");
      orgs.forEach((org, i) => {
        console.log(`${i + 1}. ${org}`);
      });
    } else {
      console.log("❌ No organizations have been fetched yet.");
    }
  } catch (err) {
    console.error("Error fetching organizations:", err.message);
  }
}

module.exports = checkCommand;
