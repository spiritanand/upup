"use client";

import { useEffect, useRef, useState } from "react";
import type { message } from "types";
import { Button } from "ui";

// const webSocket = new WebSocket("ws://localhost:8080");

function AMA({ params }: { params: { roomId: string } }): JSX.Element {
  const roomId = params.roomId;

  const [webSocket, setWebSocket] = useState<WebSocket>(
    () => new WebSocket("ws://localhost:8080"),
  );

  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const [isWebsocketOpen, setIsWebsocketOpen] = useState(true);

  function handleSendMessage() {
    if (!messageRef.current?.value) {
      return;
    }

    webSocket.send(
      JSON.stringify({
        type: "message",
        payload: {
          message: messageRef.current.value,
        },
      }),
    );
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
      const data: message = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages((prevMessages: string[]) => [
          ...prevMessages,
          data.payload.message,
        ]);
      }
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
      setIsWebsocketOpen(false);
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
      <div className="flex w-full items-center justify-center space-x-2 p-2">
        <input
          className="max-w-sm rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Ask away..."
          ref={messageRef}
          type="text"
        />
        <Button onClick={handleSendMessage}>Post Question</Button>
      </div>
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
      {!isWebsocketOpen ? (
        <>
          <p>Websocket connection closed</p>
          <Button
            onClick={() => {
              setWebSocket(new WebSocket("ws://localhost:8080"));
              setIsWebsocketOpen(true);
            }}
            variant="secondary"
          >
            Reconnect
          </Button>
        </>
      ) : null}
    </main>
  );
}

export default AMA;
