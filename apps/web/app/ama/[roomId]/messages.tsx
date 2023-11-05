import { ThickArrowUpIcon } from "@radix-ui/react-icons";
import type { message } from "types";

function Messages({
  messages,
  webSocket,
}: {
  messages: message["payload"][];
  webSocket: WebSocket;
}) {
  const handleUpvoteMessage = () => {
    // const message = data.message;
    // const packet: message = {
    //   type: "message",
    //   payload: {
    //     message: message.trim(),
    //   },
    // };
    // webSocket.send(JSON.stringify(packet));
  };

  return (
    <ul className="m-4 h-[55vh] overflow-y-auto rounded-md border border-black p-2 shadow-lg md:h-[70vh] md:p-4">
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
              onClick={handleUpvoteMessage}
              type="button"
            >
              <ThickArrowUpIcon
                className="text-green-800 transition-colors hover:text-green-600"
                height={25}
                width={25}
              />
              {payload.upvotes}
            </button>
            {/* <button>
              <CheckIcon
                className="text-red-800 transition-colors hover:text-red-600"
                height={30}
                width={30}
              />
            </button> */}
          </div>
        </div>
      ))}
    </ul>
  );
}

export { Messages };
