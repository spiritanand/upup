"use client";

import { useSession } from "next-auth/react";
import { Avatar } from "ui";

function Welcome() {
  const session = useSession();

  return (
    <div className="flex items-center gap-4">
      {session.data?.user?.name ? (
        <Avatar
          alt={session.data.user.name}
          fallback={session.data.user.name}
          src={session.data.user.image || ""}
        />
      ) : null}
      <h1 className="flex flex-col text-2xl sm:text-4xl">
        Welcome, <span className="font-bold">{session.data?.user?.name}</span>
      </h1>
    </div>
  );
}

export default Welcome;
