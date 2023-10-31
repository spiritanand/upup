import express from "express";
import http from "http";
import { Redis } from "ioredis";
import { nanoid } from "nanoid";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const redis = new Redis();

const users: {
  [key: string]: {
    room: string;
    ws: any;
  };
} = {};

wss.on("connection", async (ws, req) => {
  ws.on("", () => {
    ws.send(JSON.stringify({ success: true, message: "created" }));
  });

  const wsId = nanoid();
  console.log(`[server]: New connection ${wsId}`);

  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());

    // handle new user join
    if (data.type === "join") {
      users[wsId] = {
        room: data.payload.roomId,
        ws,
      };
    }

    // handle messages
    if (data.type === "message") {
      const roomId = users[wsId].room;
      const message = data.payload.message;

      Object.keys(users).forEach((wsId) => {
        if (users[wsId].room === roomId) {
          users[wsId].ws.send(
            JSON.stringify({
              type: "message",
              payload: {
                message,
              },
            }),
          );
        }
      });
    }

    // ping pong to maintain active connection
    if (data.type === "ping") {
      ws.send(JSON.stringify({ success: true, type: "pong" }));
    }
  });
});

server.listen(port, () => {
  console.log(`[server]: Server listening on port ${port}`);
});
