import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs-extra";
import path from "path";
import { showTitleAndBanner } from "./utils/logger";

export async function cli(): Promise<any> {
    showTitleAndBanner();

    yargs(hideBin(process.argv)).command(
            "version",
            "Print the CLI and API version info",
            (_yargs) => {
                const packageJson = JSON.parse(
                    fs.readFileSync(path.resolve(__dirname, "../package.json"), {
                        encoding: "utf8",
                        flag: "r",
                    })
                );
                console.log(packageJson.version)

                // server version
            }
        ).parse();
}