const { program } = require('commander')


program
    .name('orgpulse')
    .description("Orgpulse CLI tools for fetch Github org data..")
    .version("0.1.0")


program
    .command("init")
    .description("Initialized the Orgpulse CLI within your environment. \n Setup MongoDB Indexes.")
    .action(() => {
        console.log("orgpulse init executed (setup DB here)")
    })

    
program
    .command("fetch <org>")
    .description("Fetch repos & issues for an org")
    .action((org) => {
        console.log(`✅ Fetching repos for org: ${org}`);
    });


program.parse()