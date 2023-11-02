"use client";

import { useEffect, useState } from "react";
import type { message } from "types";
import { Button } from "ui";
import { Messages } from "./messages";

function AMA({ params }: { params: { roomId: string } }) {
  const roomId = params.roomId;

  const [webSocket, setWebSocket] = useState<WebSocket>(
    () => new WebSocket("ws://localhost:8080"),
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<message["payload"][]>([]);

  function handleSendMessage() {
    if (!message) return;

    const packet: message = {
      type: "message",
      payload: {
        message,
      },
    };

    webSocket.send(JSON.stringify(packet));

    setMessage("");
  }

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

  // console.log({ messages });

  return (
    <main>
      <h1>AMA</h1>
      <p>Ask me Anything page</p>

      <Messages messages={messages} />

      <div className="border-top flex w-full flex-col items-center justify-center gap-4 space-x-2 p-2 md:bottom-10 md:flex-row md:gap-2">
        <textarea
          className="w-full flex-1 rounded-lg border border-black p-3 shadow-2xl focus:border-transparent focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
          name="send-message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Ask Away..."
          value={message}
        />

        <Button
          className="text-sm shadow-2xl"
          disabled={Boolean(!webSocket.OPEN)}
          onClick={handleSendMessage}
        >
          Post Question
        </Button>
      </div>
    </main>
  );
}

export default AMA;
