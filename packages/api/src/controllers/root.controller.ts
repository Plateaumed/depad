import { Request, Response } from "express";

export async function getVersionHandler(req: Request, res: Response) {
    return res.send(process.env.npm_package_version);
}