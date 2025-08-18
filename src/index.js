const { Command } = require('commander')
const program = new Command()

program
    .name('orgpulse')
    .description("Orgpulse CLI tools for fetch Github org data..")
    .version("0.1.0")


program
    .command("init")
    .description("Initialized the Orgpulse CLI within your environment.")
    .action((options) => {
        console.log("orgpulse init executed (setup DB here)")
    })


program
    .command("fetch <org>")
    .description("Fetch repos & issues for an org")
    .action((org) => {
        console.log(`Fetching repos for org: ${org}`);
    });


program
    .command("top")
    .requiredOption("--org <org>", "Organization name")
    .option("--metric <metric>", "stars|issues", "stars")
    .option("--limit <n>", "Limit results", 10)
    .description("Show top repos by stars or issues")
    .action((options) => {
        console.log(`✅ Top repos for org: ${options.org}, metric: ${options.metric}`);
    });



program
    .command("exports")
    .requiredOption("--org <org>", "Organization name")
    .option("--metric <metric>", "stars|issues", "stars")
    .option("--limit <n>", "Limit results", 10)
    .description("Show top repos by stars or issues")
    .action((options) => {
        console.log(`✅ Top repos for org: ${options.org}, metric: ${options.metric}`);
    });




program
    .command("sync-stars")
    .requiredOption("--org <org>", "Organization name")
    .description("Refresh stars & forks for repos")
    .action(require('./cli/syncstar'));



program.parse()