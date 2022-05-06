import cors from "cors";
import express from "express";
import http from "http"; // https
import { Server } from "socket.io";
import routes from "./routes";

// const port = 3000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

app.use(express.json());

export const websocket = io;

export const startServer = (port: number) => {
    server.listen(port, () => {
        console.log(`Depad is running at http://localhost:${port}`);
    
        routes(app);
    });
}
