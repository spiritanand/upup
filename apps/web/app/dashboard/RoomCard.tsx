"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "ui";
import type { SelectRooms } from "../../db/schema";

function RoomCard({ room }: { room: SelectRooms }) {
  return (
    <div className="m-4 flex flex-col gap-8 rounded-lg bg-cyan-100 p-8">
      <div className="flex flex-col">
        <p>Name:- {room.name}</p>
        <p>Password:- {room.password}</p>
      </div>

      <div className="flex justify-between">
        <Link href={`/ama/${room.id}`}>
          <Button>Join Room</Button>
        </Link>
        <button
          className="text-cyan-500 transition-colors hover:text-cyan-700"
          type="button"
        >
          <CopyIcon height={20} width={20} />
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
