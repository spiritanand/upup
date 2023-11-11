import type { message } from "types";

const handleRecUpvote = (prevMessages: message["payload"][], data: message) => {
  const messageIndex = prevMessages.findIndex(
    (message) => message.id === data.payload.message,
  );

  if (messageIndex === -1) return prevMessages;

  const newMessages = [...prevMessages];

  if (newMessages[messageIndex].upvotes)
    newMessages[messageIndex].upvotes =
      (newMessages[messageIndex].upvotes || 0) + 1;
  else newMessages[messageIndex].upvotes = 1;

  // sort messages by upvotes. Highest upvotes first
  newMessages.sort((a, b) => {
    if (typeof a.upvotes === "number" && typeof b.upvotes === "number")
      return b.upvotes - a.upvotes;

    return 0;
  });

  return newMessages;
};

export default handleRecUpvote;
