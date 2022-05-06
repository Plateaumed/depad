import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { startServer } from "@depad/api";
import { version } from "./commands/version";

export async function cli(): Promise<any> {
    yargs(hideBin(process.argv))
        .command(
            "start",
            "Start the API server",
            async (_yargs) => {
                const argv = await _yargs.argv;
                if (argv.port) {
                    const port = parseInt(String(argv.port));
                    if (!isNaN(port)) startServer(port);
                }
            }, (argv) => {
                // if (argv.port) {
                //     const port = parseInt(String(argv.port));
                //     if (!isNaN(port)) startServer(port);
                // }
            })
        .option('port', {
                alias: 'p',
                type: 'number',
                description: 'Specify a port for the server'
            })
        .usage("")
        .command("version", "Print the CLI and API version info", version)
        .parse();
}