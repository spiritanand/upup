"use client";

import { useForm } from "react-hook-form";
import type { AmaError } from "../../types";

interface JoinRoomForm {
  name: string;
  roomId: string;
  password: string;
}

function Ama({
  searchParams,
}: {
  searchParams: {
    r?: string;
    n?: string;
    e?: AmaError;
  };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<JoinRoomForm>({
    defaultValues: {
      name: searchParams.n || "",
      roomId: searchParams.r || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  if (searchParams.e)
    setError("root.redirect", {
      type: searchParams.e,
    });

  return (
    <main>
      <form
        onSubmit={() => {
          void handleSubmit(onSubmit)();
        }}
      >
        <input type="text" {...register("name", {})} />
      </form>
    </main>
  );
}

export default Ama;
