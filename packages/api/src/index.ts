import cors from "cors";
import express from "express";
import http from "http"; // https
import { Server } from "socket.io";

const port = 3000;

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

app.get("*", (req, res, next) => res.send("Hello World from Depad"))

export const websocket = io;

server.listen(port, () => {
    console.log(`Depad is running at http://localhost:${port}`);
});