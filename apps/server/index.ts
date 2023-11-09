import express from "express";
import http from "http";
import { message } from "types";
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

wss.on("connection", async (ws) => {
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

    const payload: message["payload"] = data.payload;

    // handle message
    if (data.type === "message") {
      const roomId = users[wsId]?.room;
      if (!roomId) ws.close();

      const message = payload.message;
      const sender = payload.sender;
      if (!message || !sender) return;

      // publish message to redis channel
      RedisPubSubManager.getInstance().sendMessage(roomId, message, sender);
    }

    // handle upvote
    if (data.type === "upvote") {
      const roomId = users[wsId]?.room;
      if (!roomId) ws.close();

      const messageId = payload.message;
      if (!messageId) return;

      // publish upvote to redis channel
      RedisPubSubManager.getInstance().upvoteMessage(
        roomId,
        wsId.toString(),
        messageId,
      );
    }

    // handle clear
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
