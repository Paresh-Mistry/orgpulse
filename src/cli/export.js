const { writeFileSync } = require("fs");
const { join } = require("path");
const os = require("os");
const { connectToMongo } = require("../db/connect");

async function exportCommand(options) {

    if (!options.out || typeof options.out !== "string") {
        // Default to Downloads folder
        const downloadsPath = join(os.homedir(), "Downloads", `${options.org}.${options.type || "csv"}`);
        options.out = downloadsPath;
        console.log(`No output path provided. Using default: ${options.out}`);
    }

    const db = await connectToMongo();
    const repos = db.collection("repos");
    const docs = await repos.find({ org: options.org }).toArray();

    const header = "Name,Stars,Forks,OpenIssues,Language,License,PushedAt\n";
    const rows = docs
        .map(
            (r) =>
                `${r.name},${r.stars},${r.forks},${r.openIssues},${r.language},${r.license},${r.pushedAt}`
        )
        .join("\n");

    writeFileSync(options.out, header + rows);
    console.log(`✅ Exported ${docs.length} repos to ${options.out}`);
}

module.exports = exportCommand;
