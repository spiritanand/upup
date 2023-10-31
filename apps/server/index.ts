import express from "express";
import http from "http";
import { v4 as uuidv4 } from "uuid";
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

wss.on("connection", async (ws, req) => {
  const wsId = uuidv4();
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
      RedisPubSubManager.getInstance().sendMessage(roomId, message);
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
