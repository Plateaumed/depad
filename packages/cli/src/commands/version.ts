import fs from "fs-extra";
import path from "path";
import RootService from "../services/RootService";
import { showTitleAndBanner } from "../utils/logger";

export const version = async () => {
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
};
