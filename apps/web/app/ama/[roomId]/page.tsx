import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import db from "../../../db";
import { rooms } from "../../../db/schema";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AmaApplication from "./AmaApplication";

async function AMA({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams: { p: string; n: string };
}) {
  const session = await getServerSession(authOptions);
  const roomId = params.roomId;
  const { p: password, n: name } = searchParams;

  const room = await db
    .select()
    .from(rooms)
    .where(
      and(
        eq(rooms.id, roomId),
        eq(rooms.userId, session?.user?.id || ""),
        eq(rooms.password, password),
      ),
    )
    .then((r) => r[0])
    .catch(() => undefined);

  if (!room) return <div>Room not found</div>;

  return (
    <main>
      <AmaApplication name={name} room={room} roomId={roomId} />
    </main>
  );
}

export default AMA;
