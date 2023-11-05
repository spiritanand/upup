import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { message } from "types";
import { Button } from "ui";

interface MessageForm {
  message: string;
}

function SendMessage({ webSocket }: { webSocket: WebSocket }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<MessageForm>();

  const handleSendMessage: SubmitHandler<MessageForm> = (data) => {
    const message = data.message;

    const packet: message = {
      type: "message",
      payload: {
        message: message.trim(),
      },
    };

    webSocket.send(JSON.stringify(packet));

    resetField("message");
  };

  return (
    <form
      className="border-top flex w-full flex-col items-center justify-center gap-4 space-x-2 p-2 md:bottom-10 md:flex-row md:gap-2"
      onSubmit={(e) => {
        e.preventDefault();

        void handleSubmit(handleSendMessage)();
      }}
    >
      <div className="flex w-full flex-1 flex-col gap-1">
        <textarea
          className="rounded-lg border border-black p-3 shadow-2xl focus:border-transparent focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
          {...register("message", {
            required: { value: true, message: "Type a message" },
            pattern: {
              value: /^(?!\s)/,
              message: "Message cannot be empty or have leading spaces",
            },
          })}
          placeholder="Ask Away..."
        />
        {errors.message ? (
          <span className="text-xs text-red-600">{errors.message.message}</span>
        ) : null}
      </div>

      <Button
        className="text-sm shadow-2xl"
        disabled={Boolean(!webSocket.OPEN)}
        type="submit"
      >
        Post Question
      </Button>
    </form>
  );
}

export default SendMessage;
