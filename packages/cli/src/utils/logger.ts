import { red, green, cyan } from "kleur";
import figlet from "figlet";
import { ConsoleMessage } from "./console-message";

export const showTitleAndBanner = (): void => {
  console.log(
    cyan(figlet.textSync(ConsoleMessage.TITLE, { horizontalLayout: "full" }))
  );
  console.log(cyan(ConsoleMessage.BANNER));
};
