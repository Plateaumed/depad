import { Express } from "express";
import rootRoutes from "./root.routes";

export default function routes(app: Express) {
    app.use(rootRoutes);
}