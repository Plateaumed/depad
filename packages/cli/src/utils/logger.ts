import { red, green, cyan } from "kleur";
import figlet from "figlet";
import { ConsoleMessage } from "./console-message";

export const showTitleAndBanner = (): void => {
    // const boxenOptions: Options = {
    //     padding: 1,
    //     margin: 1,
    //     borderStyle: "round",
    //     borderColor: "green",
    //     backgroundColor: "#555555"
    // };
    // const title = chalk.cyan.bold(ConsoleMessage.TITLE);
    // const titleBox = boxen( title, boxenOptions );

    // console.log(ConsoleMessage.TITLE);

    console.log(
        cyan(figlet.textSync(ConsoleMessage.TITLE, { horizontalLayout: "full" }))
    );
    console.info(cyan(ConsoleMessage.BANNER));
}