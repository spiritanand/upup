"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "ui";
import { validate as uuidValidate } from "uuid";
import InputField from "../../components/ui/InputField";
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
  const router = useRouter();
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

  const onSubmit: SubmitHandler<JoinRoomForm> = async (data) => {
    try {
      const response = await axios.post("/api/joinRoom", data);

      const resData: { redirect?: string } = response.data;

      if (!resData.redirect) throw new Error();

      router.push(resData.redirect);
      toast.success("Joined Room 🤩");
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  useEffect(() => {
    if (searchParams.e)
      setError("root.redirect", {
        type: searchParams.e,
        message: `You entered the wrong ${searchParams.e}`,
      });
  }, [searchParams.e, setError]);

  return (
    <main>
      <h1 className="mb-7 mt-10 text-center text-3xl font-extrabold sm:text-4xl md:mt-16">
        Enter Room details
      </h1>

      <form
        className="m-auto flex flex-col gap-10 p-5 sm:p-0 md:max-w-md"
        onSubmit={(e) => {
          e.preventDefault();

          void handleSubmit(onSubmit)();
        }}
      >
        {errors.root?.redirect?.message ? (
          <span
            className="self-center rounded-lg bg-red-200 p-4  text-red-600"
            role="alert"
          >
            {errors.root.redirect.message}
          </span>
        ) : null}

        <InputField
          error={errors.name?.message}
          label="Name"
          placeholder="Enter your name"
          register={register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            pattern: {
              value: /^(?!\s)/,
              message: "Name cannot be empty or have leading spaces",
            },
          })}
        />

        <div className="relative">
          <InputField
            error={errors.roomId?.message}
            label="Room ID"
            placeholder="Enter Room ID"
            register={register("roomId", {
              required: {
                value: true,
                message: "Room ID is required",
              },
              pattern: {
                value: /^(?!\s)/,
                message: "Room ID cannot be empty or have leading spaces",
              },
              validate: (v) => uuidValidate(v),
            })}
          />
          {errors.roomId && !errors.roomId.message ? (
            <span
              className="absolute -bottom-5 left-[6.5rem] w-full text-xs text-red-600"
              role="alert"
            >
              Room ID is invalid
            </span>
          ) : null}
        </div>

        <div className="relative">
          <InputField
            error={errors.password?.message}
            label="Password"
            placeholder="Enter password"
            register={register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              validate: (v) => uuidValidate(v),
            })}
          />
          {errors.password && !errors.password.message ? (
            <span
              className="absolute -bottom-5 left-[6.5rem] w-full text-xs text-red-600"
              role="alert"
            >
              Password is invalid
            </span>
          ) : null}
        </div>

        <Button
          className="w-1/2 self-center text-lg"
          type="submit"
        >{`Let's Go`}</Button>
      </form>
    </main>
  );
}

export default Ama;
