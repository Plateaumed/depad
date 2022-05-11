import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

export async function getVersionHandler(req: Request, res: Response) {
    const packageJson = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../../package.json"), {
            encoding: "utf8",
            flag: "r",
        })
    );
    return res.send(packageJson.version);
}