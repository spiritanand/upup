import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { RedisPubSubManager } from "./RedisClient";

const app = express();
const port = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const users: {
  [key: string]: {
    room: string;
    ws: any;
  };
} = {};

let counter = 0;

wss.on("connection", async (ws, req) => {
  const wsId = counter++;
  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());
    console.log({ data });

    if (data.type === "join") {
      users[wsId] = {
        room: data.payload.roomId,
        ws,
      };
      RedisPubSubManager.getInstance().subscribe(
        wsId.toString(),
        data.payload.roomId,
        ws,
      );
    }

    if (data.type === "message") {
      const roomId = users[wsId].room;
      const message = data.payload.message;
      RedisPubSubManager.getInstance().addChatMessage(roomId, message);
    }

    if (data.type === "ping") {
      ws.send(JSON.stringify({ type: "pong" }));
    }
  });

  ws.on("close", () => {
    RedisPubSubManager.getInstance().unsubscribe(
      wsId.toString(),
      users[wsId].room,
    );
  });
});

server.listen(port, () => {
  console.log("[server]: Listening on port " + port);
});
