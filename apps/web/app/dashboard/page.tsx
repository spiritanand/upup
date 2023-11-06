import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "../../db";
import { rooms } from "../../db/schema";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CreateRoom from "./CreateRoom";
import RoomCard from "./RoomCard";
import Welcome from "./Welcome";

async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const usersRooms = await db
    .select()
    .from(rooms)
    .where(eq(rooms.userId, session.user.id));

  return (
    <main className="sm:mt-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-10 p-4 sm:mb-10 sm:flex-row">
        <Welcome />
        <CreateRoom />
      </div>
      <div className="sm:gap-18 flex flex-col items-center justify-center gap-8 lg:flex-row">
        {usersRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
