import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "../../../db";
import { rooms, users } from "../../../db/schema";
import { AmaError } from "../../../types";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AmaApplication from "./AmaApplication";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams: { p?: string; n?: string };
}): Promise<Metadata> {
  const session = await getServerSession(authOptions);

  const roomId = params.roomId;
  const { p: password, n: sender } = searchParams;

  if (!sender?.trim()) return redirect(`/ama/?e=${AmaError.Name}`);

  // checks if room exists
  const room = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId))
    .leftJoin(users, eq(users.id, rooms.userId))
    .then((r) => r[0])
    .catch(() => undefined);

  // if no room redirect to ama
  if (!room?.room || !room.user)
    return redirect(`/ama/?e=${AmaError.ROOM}&n=${sender}`);

  // if password is not correct redirect to ama with error and prefilled room id
  const isPasswordMatch = room.room.password === password;
  if (!isPasswordMatch)
    return redirect(`/ama/?r=${roomId}&n=${sender}&e=${AmaError.PASSWORD}`);

  // check if user is host or not (to render admin panel)
  const isAdmin = room.room.userId === session?.user?.id;

  return {
    title: `${room.room.name} ${isAdmin ? "(Host)" : "(Attendee)"} | upup`,
    description: `${room.room.name} by ${room.user.name}`,
  };
}

async function AMA({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams: { p?: string; n?: string };
}) {
  const session = await getServerSession(authOptions);
  const roomId = params.roomId;
  const { p: password, n: sender } = searchParams;

  if (!sender?.trim()) return redirect(`/ama/?e=${AmaError.Name}`);

  // checks if room exists
  const room = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId))
    .leftJoin(users, eq(users.id, rooms.userId))
    .then((r) => r[0])
    .catch(() => undefined);

  // if no room redirect to ama
  if (!room?.room || !room.user)
    return redirect(`/ama/?e=${AmaError.ROOM}&n=${sender}`);

  // if password is not correct redirect to ama with error and prefilled room id
  const isPasswordMatch = room.room.password === password;
  if (!isPasswordMatch)
    return redirect(`/ama/?r=${roomId}&n=${sender}&e=${AmaError.PASSWORD}`);

  // check if user is host or not (to render admin panel)
  const isAdmin = room.room.userId === session?.user?.id;

  return (
    <main>
      <AmaApplication
        host={room.user}
        isAdmin={isAdmin}
        room={room.room}
        roomId={roomId}
        sender={sender.trim()}
      />
    </main>
  );
}

export default AMA;
