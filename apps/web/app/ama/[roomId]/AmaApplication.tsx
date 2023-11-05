"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { message } from "types";
import { Avatar } from "ui";
import type { SelectRooms } from "../../../db/schema";
import SendMessage from "./SendMessage";
import { Messages } from "./messages";

function AmaApplication({
  roomId,
  name,
  room,
}: {
  roomId: string;
  name: string;
  room: SelectRooms;
}) {
  const session = useSession();
  const host = session.data?.user?.name || session.data?.user?.email;

  const [webSocket, setWebSocket] = useState<WebSocket>(
    () =>
      new WebSocket(process.env.NEXT_PUBLIC_WS_SERVER || "ws://localhost:8080"),
  );
  const [messages, setMessages] = useState<message["payload"][]>([]);

  useEffect(() => {
    // connect to room (on open)
    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId,
          },
        }),
      );
    };

    // handle message
    webSocket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as message;

      if (data.type === "message")
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: data.payload.id,
            message: data.payload.message,
            upvotes: data.payload.upvotes,
          },
        ]);

      if (data.type === "upvote")
        setMessages((prevMessages) => {
          const messageIndex = prevMessages.findIndex(
            (message) => message.id === data.payload.message,
          );

          if (messageIndex === -1) return prevMessages;

          const newMessages = [...prevMessages];

          if (newMessages[messageIndex].upvotes)
            newMessages[messageIndex].upvotes =
              (newMessages[messageIndex].upvotes || 0) + 1;
          else newMessages[messageIndex].upvotes = 1;

          // sort messages by upvotes. Highest upvotes first
          newMessages.sort((a, b) => {
            if (a.upvotes && b.upvotes) return b.upvotes - a.upvotes;

            return 0;
          });

          return newMessages;
        });
    };

    // recreating ws connection on close
    webSocket.onclose = () => {
      setWebSocket(new WebSocket("ws://localhost:8080"));
    };

    return () => {
      webSocket.close();
    };
  }, [webSocket, roomId]);

  return (
    <>
      <div className="flex items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">{room.name}</h1>
        {host ? (
          <div className="flex items-center gap-2 text-xs">
            <p>by</p>
            <Avatar
              alt={host}
              fallback={host}
              src={session.data?.user?.image || ""}
            />
            <p>{host}</p>
          </div>
        ) : null}
      </div>

      <Messages messages={messages} webSocket={webSocket} />

      <SendMessage webSocket={webSocket} />
    </>
  );
}

export default AmaApplication;
