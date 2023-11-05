"use client";

import { useEffect, useState } from "react";
import type { message } from "types";
import SendMessage from "./SendMessage";
import { Messages } from "./messages";

function AmaApplication({ roomId }: { roomId: string }) {
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
          { id: data.payload.id, message: data.payload.message },
        ]);
    };

    // pinging ws server to maintain connection
    const pingInterval = setInterval(() => {
      webSocket.send(
        JSON.stringify({
          type: "ping",
          payload: {},
        }),
      );
    }, 250 * 1000);

    webSocket.onclose = () => {
      setWebSocket(new WebSocket("ws://localhost:8080"));
    };

    return () => {
      clearInterval(pingInterval);
      webSocket.close();
    };
  }, [webSocket, roomId]);

  return (
    <main>
      <h1>AMA</h1>
      <p>Ask me Anything page</p>

      <Messages messages={messages} />

      <SendMessage webSocket={webSocket} />
    </main>
  );
}

export default AmaApplication;
