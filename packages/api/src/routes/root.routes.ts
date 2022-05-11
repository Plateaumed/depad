import { Router } from "express";
import { getVersionHandler } from "../controllers/root.controller";

const router = Router();

router.get("/version", getVersionHandler);

export default router;
