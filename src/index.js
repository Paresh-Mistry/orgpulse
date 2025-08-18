const { Command } = require('commander')
const program = new Command()


// Programme For Get version & helper 
program
    .name('orgpulse')
    .description("Orgpulse CLI tools for fetch Github org data..")
    .version("0.1.0")


// Programmme for Initializing CLI
// Make connection with db & Indexing Collections
program
    .command("init")
    .description("Initialized the Orgpulse CLI within your environment.")
    .action(require('./cli/init'))


// Storing Organization from db by fetching
program
    .command("fetch <org>")
    .description("Fetch repos & issues for an org")
    .action(require('./cli/fetch'));


// Get top organization with measures & limits collections
program
    .command("top")
    .requiredOption("--org <org>", "Organization name")
    .option("--metric <metric>", "stars|issues", "stars")
    .option("--limit <n>", "Limit results", 10)
    .description("Show top repos by stars or issues")
    .action(require("./cli/top"));


// Export Collection of organizations in .csv
program
    .command("exports")
    .requiredOption("--org <org>", "Organization name")
    .option("--metric <metric>", "stars|issues", "stars")
    .option("--limit <n>", "Limit results", 10)
    .description("Show top repos by stars or issues")
    .action((options) => {
        console.log(`Top repos for org: ${options.org}, metric: ${options.metric}`);
    });




program
    .command("sync-stars")
    .requiredOption("--org <org>", "Organization name")
    .description("Refresh stars & forks for repos")
    .action(require('./cli/syncstar'))



program.parse()