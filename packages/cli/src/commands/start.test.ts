import yargs from "yargs";
import { startServer } from "@depad/api";
import start from "./start";

describe("start command", () => {
  it("starts the API server", async () => {
    // @ts-ignore
    startServer = jest.fn();

    const parser = yargs.command(start).help();

    await parser.parse("start --port 3000");

    expect(startServer).toHaveBeenCalledTimes(1);
    expect(startServer).toHaveBeenCalledWith(3000);
  });

  it("fails to start the API server when port is invalid", async () => {
    // @ts-ignore
    startServer = jest.fn();

    const parser = yargs.command(start).help();

    await parser.parse("start --port abcd");

    expect(startServer).toHaveBeenCalledTimes(0);
  });

  it("fails to start the API server when port is not specified", async () => {
    // @ts-ignore
    startServer = jest.fn();

    const parser = yargs.command(start).help();

    const error = await new Promise((resolve) => {
      parser.parse("start", (err, _argv, output) => {
        if (err) {
          resolve(err);
        }
        resolve(output);
      });
    });

    expect(startServer).toHaveBeenCalledTimes(0);
    expect(String(error)).toContain("Missing required argument: port");
  });
});
