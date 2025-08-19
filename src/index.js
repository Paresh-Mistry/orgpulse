const { Command } = require('commander')
const program = new Command()


// Programme For Get version & helper 
program
  .name('orgpulse')
  .description("Orgpulse CLI tools for fetch Github org data..")
  .version("0.1.0", '-v, --version', 'output the current version')
  .hook('preAction', (thisCommand, actionCommand) => {
    console.log(`Executing command: ${actionCommand.name()}`);
  });

// Programmme for Initializing CLI
// Make connection with db & Indexing Collections
program
  .command("init")
  .description("Initialized the Orgpulse CLI within your environment.")
  .action(() => {
    console.log("Running init command...");
    require('./cli/init')();
  });


program
  .command("check-org")
  .description("Check if an organization has been fetched already")
  .action(() => {
    console.log("Running check-org command...");
    require("./cli/check")();
  });

// Storing Organization from db by fetching
program
  .command("fetch <org>")
  .description("Fetch repos & issues for an org")
  .action((org) => {
    console.log(`Running fetch command for org: ${org}`);
    require('./cli/fetch')(org);
  });


// Get top organization with measures & limits collections
program
  .command("top")
  .requiredOption("--org <org>", "Organization name")
  .option("--metric <metric>", "stars|issues", "stars")
  .option("--limit <n>", "Limit results", 10)
  .description("Show top repos by stars or issues")
  .action((options) => {
    console.log(`Running top command for org: ${options.org}, metric: ${options.metric}, limit: ${options.limit}`);
    require("./cli/top")(options);
  });


// Export Collection of organizations in .csv
program
  .command("exports")
  .requiredOption("--org <org>", "Organization name")
  .option("--metric <metric>", "stars|issues", "stars")
  .option("--limit <n>", "Limit results", 10)
  .option("--type <type>", "File Type", "")
  .description("Show top repos by stars or issues")
  .action((options) => {
    console.log(`Running exports command for org: ${options.org}, metric: ${options.metric}, limit: ${options.limit}, type: ${options.type}`);
    require("./cli/export")(options);
  });

program
  .command("sync-stars")
  .requiredOption("--org <org>", "Organization name")
  .description("Refresh stars & forks for repos")
  .action((options) => {
    console.log(`Running sync-stars command for org: ${options.org}, type: ${options.type || 'default'}`);
    require('./cli/syncstar')(options);
  });


program.parse()