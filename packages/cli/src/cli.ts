import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import start from "./commands/start";
import version from "./commands/version";

export async function cli(): Promise<any> {
  yargs(hideBin(process.argv))
    .usage("Usage: $0 [command] [options]")
    // .command({
    //   command: "get <resource>",
    //   // aliases: ['config', 'cfg'],
    //   describe: "Get a resource",
    //   // deprecated: false,
    //   builder: (yargs: yargs.Argv<{}>) => {
    //     return yargs
    //       .positional("resource", {
    //         describe: "To type of resource to get",
    //         type: "string",
    //         // default: "deployment",
    //       })
    //       .option("namespace", {
    //         alias: "n",
    //         type: "string",
    //         description: "Specify a namespacew for the server",
    //       })
    //       .demandOption("namespace");
    //   },
    //   handler: (argv: yargs.ArgumentsCamelCase<{}>) => {
    //     console.log(argv);
    //   },
    // })
    .command(start)
    .command(version)
    .demandCommand(1, "You need to provide a depad command or option")
    .parse();
}
