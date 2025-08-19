// const axios = require("axios");
// const { connectToMongo } = require("../db/connect");

// // Function to fetch repo stats from GitHub API
// async function fetchRepoStars(org, repoName) {
//   const url = `https://api.github.com/repos/${org}/${repoName}`;
//   const headers = {};

//   if (process.env.GITHUB_TOKEN) {
//     headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
//   }

//   const res = await axios.get(url, { headers });

//   return {
//     stars: res.data.stargazers_count,
//     forks: res.data.forks_count,
//   };
// }

// // Main command to sync stars
// async function syncStarsCommand(options) {
//   const db = await connectToMongo();
//   const repos = db.collection("repos");

//   const docs = await repos.find({ org: options.org }).toArray();

//   for (const repo of docs) {
//     try {
//       const updated = await fetchRepoStars(options.org, repo.name);

//       await repos.updateOne(
//         { org: options.org, name: repo.name },
//         { $set: { stars: updated.stars, forks: updated.forks } }
//       );

//       console.log(
//         `Updated ${repo.name} → ${updated.stars} stars, ${updated.forks} forks`
//       );
//     } catch (err) {
//       console.error(`Failed to update ${repo.name}`, err.message);
//     }
//   }

//   const star = await fetchRepoStars(options.org, "go");
//   console.log(options.org, "\n", star);

//   console.log("Sync complete");
// }

// // Export using CommonJS
// module.exports = { syncStarsCommand };
























const axios = require("axios");
const { connectToMongo } = require("../db/connect");

async function fetchRepoStars(org, repoName) {
    const url = `https://api.github.com/repos/${org}/${repoName}`;
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    const res = await axios.get(url, { headers });
    return {
        stars: res.data.stargazers_count,
        forks: res.data.forks_count,
    };
}

async function syncStarsCommand(options) {
      const db = await connectToMongo();
      const repos = db.collection("repos");

      const docs = await repos.find({ org: options.org }).toArray();

      for (const repo of docs) {
        try {
          const updated = await fetchRepoStars(options.org, repo.name);

          await repos.updateOne(
            { org: options.org, name: repo.name },
            { $set: { stars: updated.stars, forks: updated.forks } }
          );

          console.log(
            `Updated ${repo.name} → ${updated.stars} stars, ${updated.forks} forks`
          );
        } catch (err) {
          console.error(`Failed to update ${repo.name}`, err.message);
        }
      }
    const star = await fetchRepoStars(options.org, 'go')
    try {
        console.log(options.org , "\n", star);
    }
    catch (error) {
        console.log("error", error)
    }

    console.log("Sync complete");
}

module.exports = syncStarsCommand;