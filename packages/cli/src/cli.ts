import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { start, version } from "./commands";

export async function cli(): Promise<any> {
  yargs(hideBin(process.argv))
    .command("start", "Start the API server", start)
    .option("port", {
      alias: "p",
      type: "number",
      description: "Specify a port for the server",
    })
    .usage("")
    .command("version", "Print the CLI and API version info", version)
    .parse();
}
