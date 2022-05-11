import { startServer } from "@depad/api";
import yargs from "yargs";

const start: yargs.CommandModule<{}, {}> = {
  command: "start",
  // aliases: ["run"],
  describe: "Start the API server",
  // deprecated: false,
  builder: (yargs: yargs.Argv<{}>) => {
    return yargs
      .option("port", {
        alias: "p",
        type: "number",
        description: "Specify a port for the server",
      })
      .demandOption("port");
  },
  handler: (argv: yargs.ArgumentsCamelCase<{}>) => {
    if (argv.port) {
      const port = parseInt(String(argv.port));
      if (!isNaN(port)) startServer(port);
    }
  },
};

export default start;
