// const { connectToMongo } = require("../db/connect")

// async function topCommand(options) {
//   const db = await connectToMongo();
//   const repos = db.collection("repos");

//   // Decide which metric to sort by
//   let sortField = options.metric === "issues" ? "openIssues" : "stars";

//   // Query MongoDB
//   const docs = await repos
//     .find({ org: options.org })
//     .sort({ [sortField]: -1 }) // descending
//     .limit(parseInt(options.limit))
//     .toArray();

//   // Print results
//   console.table(
//     docs.map((r) => ({
//       name: r.name || null,
//       stars: r.stars || null,
//       forks: r.forks || null,
//       openIssues: r.openIssues || null,
//       pushedAt: r.pushedAt || null,
//       language: r.language || null,
//     }))
//   );
// }

// module.exports = topCommand
















const { connectToMongo } = require("../db/connect");

async function topCommand(options) {
  const db = await connectToMongo();
  const repos = db.collection("repos");

  // Decide which metric to sort by
  let sortField = options.metric === "issues" ? "openIssues" : "stars";

  // Query MongoDB
  const docs = await repos
    .find({ org: options.org })
    .sort({ [sortField]: -1 }) // descending
    .limit(parseInt(options.limit))
    .toArray();

  // Print results
  console.table(
    docs.map((r) => ({
      name: r.name || null,
      stars: r.stars || null,
      forks: r.forks || null,
      openIssues: r.openIssues || null,
      pushedAt: r.pushedAt || null,
      language: r.language || null,
    }))
  );
}

module.exports = topCommand;