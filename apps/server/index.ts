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

      // publish message to redis channel
      const message = data.payload.message;
      RedisPubSubManager.getInstance().sendMessage(roomId, message);
    }

    if (data.type === "upvote") {
      const roomId = users[wsId]?.room;

      if (!roomId) ws.close();

      // publish upvote to redis channel
      const messageId = data.payload.message;
      RedisPubSubManager.getInstance().upvoteMessage(
        roomId,
        wsId.toString(),
        messageId,
      );
    }
  });

  ws.on("close", () => {
    RedisPubSubManager.getInstance().unsubscribe(wsId, users[wsId]?.room);
  });
});

server.listen(port, () => {
  console.log("[server]: Listening on port " + port);
});
