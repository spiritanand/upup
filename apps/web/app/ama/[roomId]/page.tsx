"use client";

import { useEffect, useState } from "react";
import type { message } from "types";
import { Button } from "ui";

function AMA({ params }: { params: { roomId: string } }): JSX.Element {
  const roomId = params.roomId;

  const [webSocket, setWebSocket] = useState<WebSocket>(
    () => new WebSocket("ws://localhost:8080"),
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<message["payload"][]>([]);

  function handleSendMessage() {
    if (!message) {
      return;
    }

    webSocket.send(
      JSON.stringify({
        type: "message",
        payload: {
          message,
        },
      }),
    );

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

      <div className="flex w-full items-center justify-center gap-2 space-x-2 p-2">
        <textarea
          className="rounded-lg border border-black p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          cols={35}
          id=""
          name=""
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Ask Away..."
          rows={3}
          value={message}
        />

        <Button onClick={handleSendMessage}>Post Question</Button>
      </div>

      {messages.map((wsMessage) => (
        <p key={wsMessage.id}>{wsMessage.message}</p>
      ))}
    </main>
  );
}

export default AMA;
