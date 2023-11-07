"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "ui";
import type { SelectRooms } from "../../db/schema";

function RoomCard({ room }: { room: SelectRooms }) {
  const session = useSession();

  return (
    <div className="m-4 flex flex-col gap-8 rounded-xl bg-cyan-100 p-8">
      <div className="flex flex-col sm:text-lg">
        <p>
          Name:- <span className="font-bold">{room.name}</span>
        </p>
        <p>Password:- {room.password}</p>
      </div>

      <div className="flex items-center justify-between">
        <Link
          href={`/ama/${room.id}?p=${room.password}&n=${session.data?.user?.name}`}
        >
          <Button className="text-sm sm:text-base">Join Room</Button>
        </Link>
        <div className="flex gap-4">
          <button
            className="text-cyan-500 transition-colors hover:text-cyan-600"
            onClick={() => {
              void navigator.clipboard.writeText(`
            Meeting Details
            Join @ https://upup.vercel.app/ama?r=${room.id}
            Password:- ${room.password}
            `);

              toast.success("Copied to clipboard");
            }}
            type="button"
          >
            <CopyIcon height={22} width={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
