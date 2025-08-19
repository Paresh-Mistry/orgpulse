// fetch.js
const { connectToMongo } = require("../db/connect");
const { readFileSync, writeFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");
const { fetchRepos, mapRepo } = require("../github/repos");
const { fetchIssues, mapIssue } = require("../github/issues");

const checkpointFile = join(process.cwd(), "checkpoint.json");

// Load checkpoint
function loadCheckpoint() {
  if (existsSync(checkpointFile)) {
    return JSON.parse(readFileSync(checkpointFile, "utf8"));
  }
  return null;
}

// Save checkpoint
function saveCheckpoint(data) {
  writeFileSync(checkpointFile, JSON.stringify(data, null, 2));
}

async function fetchCommand(org) {
  const db = await connectToMongo();
  const reposCol = db.collection("repos");
  const issuesCol = db.collection("issues");

  let checkpoint = loadCheckpoint();
  let page = checkpoint && checkpoint.org === org ? checkpoint.lastPage : 1;

  console.log(`Fetching repos for org: ${org}, starting from page ${page}`);

  while (true) {
    const { data: repos, hasNext } = await fetchRepos(org, page);

    for (const repo of repos) {
      const repoDoc = mapRepo(repo, org);

      await reposCol.updateOne(
        { org, name: repoDoc.name },
        { $set: repoDoc },
        { upsert: true }
      );

      console.log(`Stored repo: ${repoDoc.name}`);

      // Fetch issues for this repo
      try {
        let issuePage = 1;
        while (true) {
          const { data: issues, hasNext: issuesNext } = await fetchIssues(
            repo.owner.login,
            repo.name,
            issuePage
          );

          for (const issue of issues) {
            const issueDoc = mapIssue(issue, repoDoc.name);
            await issuesCol.updateOne(
              { repo: issueDoc.repo, number: issueDoc.number },
              { $set: issueDoc },
              { upsert: true }
            );
          }

          console.log(
            `Stored ${issues.length} issues for ${repoDoc.name} (page ${issuePage})`
          );

          if (!issuesNext) break;
          issuePage++;
        }
      } catch (err) {
        console.error(`Failed to fetch issues for ${repoDoc.name}:`, err.message);
      }
    }

    console.log(`Checkpoint saved (page ${page})`);
    saveCheckpoint({ org, lastPage: page });

    if (!hasNext) break;
    page++;
  }

  console.log(`Finished fetching repos & issues for ${org}`);
}

module.exports = fetchCommand;
