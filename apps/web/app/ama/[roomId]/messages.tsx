import type { message } from "types";

function Messages({ messages }: { messages: message["payload"][] }) {
  return (
    <ul className="m-4 h-[65vh] overflow-y-auto rounded-md border border-black p-4 shadow-lg md:h-[75vh]">
      {messages.map((payload) => (
        <li className="flex items-center gap-2" key={payload.id}>
          <span className="font-semibold">Name:</span>
          <p className="text-xl">{payload.message}</p>
        </li>
      ))}
    </ul>
  );
}

export { Messages };
