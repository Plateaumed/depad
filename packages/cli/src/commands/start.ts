import { startServer } from "@depad/api";
import yargs from "yargs";

export const start = async (yargs: yargs.Argv<{}>) => {
  const argv = await yargs.argv;
  if (argv.port) {
    const port = parseInt(String(argv.port));
    if (!isNaN(port)) startServer(port);
  }
};
