import type { message } from "types";

const handleRecMessage = (
  prevMessages: message["payload"][],
  data: message,
) => [
  ...prevMessages,
  {
    id: data.payload.id,
    message: data.payload.message,
    upvotes: data.payload.upvotes,
  },
];

export default handleRecMessage;
