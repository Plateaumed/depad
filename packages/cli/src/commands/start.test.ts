import { startServer } from "@depad/api";
import { start } from "./start";

describe("start command", () => {
  it("starts the API server", async () => {
    // @ts-ignore
    startServer = jest.fn();

    // @ts-ignore
    await start({
      // @ts-ignore
      argv: new Promise((res) => res({ port: 3000 })),
    });

    expect(startServer).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(startServer).toHaveBeenCalledWith(3000);
  });

  it("fails to start the API server when port is invalid", async () => {
    // @ts-ignore
    startServer = jest.fn();

    // @ts-ignore
    await start({
      // @ts-ignore
      argv: new Promise((res) => res({ port: "hdhyef" })),
    });

    expect(startServer).toHaveBeenCalledTimes(0);
  });

  it("fails to start the API server when port is not specified", async () => {
    // @ts-ignore
    startServer = jest.fn();

    // @ts-ignore
    await start({
      // @ts-ignore
      argv: new Promise((res) => res({})),
    });

    expect(startServer).toHaveBeenCalledTimes(0);
  });
});
