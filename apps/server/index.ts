import express, { Request } from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws, req: Request) => {
  ws.on("message", (message: string) => {
    console.log(`received: ${message}`);
    ws.send(`Hello, you sent -> ${message}`);
  });
});

app.get("/health", (req, res) => {
  res.json({ msg: "I am healthy" });
});

server.listen(port);
