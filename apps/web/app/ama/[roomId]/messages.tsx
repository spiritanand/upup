import { CheckIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import type { message } from "types";

function Messages({
  messages,
  webSocket,
  isAdmin,
}: {
  messages: message["payload"][];
  webSocket: WebSocket;
  isAdmin: boolean;
}) {
  const handleUpvoteMessage = (messageId: string) => {
    if (!messageId) return;

    const packet: message = {
      type: "upvote",
      payload: {
        message: messageId,
      },
    };
    webSocket.send(JSON.stringify(packet));
  };

  return (
    <ul className="m-4 h-[55vh] overflow-y-auto rounded-md border border-gray-400 p-2 shadow-lg md:h-[70vh] md:p-4">
      {messages.map((payload) => (
        <div
          className=" flex flex-col gap-1 border-b-2 border-gray-300 p-3"
          key={payload.id}
        >
          <li className="flex items-center gap-2">
            <span className="font-semibold">Name:</span>
            <p className="text-xl">{payload.message}</p>
          </li>
          <div className="flex gap-6">
            <button
              className="flex gap-2"
              onClick={() => {
                handleUpvoteMessage(payload.id || "");
              }}
              type="button"
            >
              <ThickArrowUpIcon
                className="text-green-800 transition-colors hover:text-green-600"
                height={25}
                width={25}
              />
              {payload.upvotes}
            </button>

            {isAdmin ? (
              <button type="button">
                <CheckIcon
                  className="text-red-800 transition-colors hover:text-red-600"
                  height={25}
                  width={25}
                />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </ul>
  );
}

export { Messages };
