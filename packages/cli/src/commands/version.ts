import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import RootService from "../services/RootService";
import { showTitleAndBanner } from "../utils/logger";

const version: yargs.CommandModule<{}, {}> = {
  command: "version",
  describe: "Print the CLI and API version info",
  handler: async () => {
    try {
      showTitleAndBanner();

      const packageJson = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../../package.json"), {
          encoding: "utf8",
          flag: "r",
        })
      );
      console.log(`CLI Version: ${packageJson.version}`);

      const response = await new RootService().getVersion();
      console.log(`API Version: ${response}`);
    } catch (error) {
      console.error(error);
    }
  },
};

export default version;
