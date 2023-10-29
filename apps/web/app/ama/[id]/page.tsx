"use client";

import { useEffect, useRef, useState } from "react";

const webSocket = new WebSocket("ws://localhost:8080");

function AMA(): JSX.Element {
  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

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
    // connect to room
    webSocket.onopen = () => {
      const roomId = 1;

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
      const data: { type: string; payload: { message: string } } = JSON.parse(
        event.data,
      );

      if (data.type === "message") {
        setMessages((prevMessages: string[]) => [
          ...prevMessages,
          data.payload.message,
        ]);
      }
    };
  }, []);

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
        <button
          className="rounded-full bg-cyan-500 p-3"
          onClick={handleSendMessage}
          type="button"
        >
          Post question
        </button>
      </div>
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </main>
  );
}

export default AMA;
