import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "../../../db";
import { rooms } from "../../../db/schema";
import { AmaError } from "../../../types";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AmaApplication from "./AmaApplication";

async function AMA({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams: { p?: string; n?: string };
}) {
  const session = await getServerSession(authOptions);
  const roomId = params.roomId;
  const { p: password, n: name } = searchParams;

  // checks if room exists
  const room = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId))
    .then((r) => r[0])
    .catch(() => undefined);

  // if no room redirect to ama
  if (!room) return redirect(`/ama/?e=${AmaError.ROOM}`);

  // if password is not correct redirect to ama with error and prefilled room id
  const isPasswordMatch = room.password === password;
  if (!isPasswordMatch)
    return redirect(`/ama/?=r${roomId}&n=${name}&e=${AmaError.ROOM}`);

  // check if user is host or not (to render admin panel)
  const isAdmin = room.userId === session?.user?.id;

  return (
    <main>
      <AmaApplication room={room} roomId={roomId} />
    </main>
  );
}

export default AMA;
