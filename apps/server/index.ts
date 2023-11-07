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
  };
} = {};

wss.on("connection", async (ws, req) => {
  const wsId = uuidv4();

  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());
    console.log({ data });

    if (data.type === "join") {
      // assign a new unique id to any new user
      users[wsId] = {
        room: data.payload.roomId,
      };

      RedisPubSubManager.getInstance().subscribe(
        wsId.toString(),
        data.payload.roomId,
        ws,
      );
    }

    if (data.type === "message") {
      const roomId = users[wsId]?.room;
      if (!roomId) ws.close();

      const message = data.payload.message;
      if (!message) return;

      // publish message to redis channel
      RedisPubSubManager.getInstance().sendMessage(roomId, message);
    }

    if (data.type === "upvote") {
      const roomId = users[wsId]?.room;
      if (!roomId) ws.close();

      const messageId = data.payload.message;
      if (!messageId) return;

      // publish upvote to redis channel
      RedisPubSubManager.getInstance().upvoteMessage(
        roomId,
        wsId.toString(),
        messageId,
      );
    }

    if (data.type === "clear") {
      const roomId = users[wsId]?.room;
      if (!roomId) ws.close();

      const messageId = data.payload.message;
      if (!messageId) return;

      // clear message from redis channel
      RedisPubSubManager.getInstance().clearMessage(roomId, messageId);
    }
  });

  ws.on("close", () => {
    RedisPubSubManager.getInstance().unsubscribe(wsId, users[wsId]?.room);
  });
});

server.listen(port, () => {
  console.log("[server]: Listening on port " + port);
});
