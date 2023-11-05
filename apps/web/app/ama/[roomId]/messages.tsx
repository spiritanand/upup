import type { message } from "types";

function Messages({ messages }: { messages: message["payload"][] }) {
  return (
    <ul className="m-4 h-[55vh] overflow-y-auto rounded-md border border-black p-2 shadow-lg md:h-[70vh] md:p-4">
      {messages.map((payload) => (
        <li
          className="flex items-center gap-2 border-b-2 border-gray-300 p-2"
          key={payload.id}
        >
          <span className="font-semibold">Name:</span>
          <p className="text-xl">{payload.message}</p>
        </li>
      ))}
    </ul>
  );
}

export { Messages };
