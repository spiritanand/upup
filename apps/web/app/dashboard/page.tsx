import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "../../db";
import { rooms } from "../../db/schema";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CreateRoom from "./CreateRoom";

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
    <main className="mt-10">
      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-24">
        {usersRooms.map((room) => (
          <p key={room.id}>{room.name}</p>
        ))}
        <CreateRoom />
      </div>
    </main>
  );
}

export default Dashboard;
