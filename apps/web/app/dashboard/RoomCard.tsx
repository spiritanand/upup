"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "ui";
import type { SelectRooms } from "../../db/schema";

function RoomCard({ room }: { room: SelectRooms }) {
  return (
    <div className="m-4 flex flex-col gap-8 rounded-xl bg-cyan-100 p-8">
      <div className="flex flex-col">
        <p>Name:- {room.name}</p>
        <p>Password:- {room.password}</p>
      </div>

      <div className="flex justify-between">
        <Link href={`/ama/${room.id}`}>
          <Button>Join Room</Button>
        </Link>
        <button
          className="text-cyan-500 transition-colors hover:text-cyan-600"
          onClick={() => {
            void navigator.clipboard.writeText(`
            Meeting Details
            Join @ https://upup.vercel.app/ama/${room.id}
            Password:- ${room.password}
            `);

            toast.success("Copied to clipboard");
          }}
          type="button"
        >
          <CopyIcon height={20} width={20} />
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
