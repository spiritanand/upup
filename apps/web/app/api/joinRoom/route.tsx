import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validate as uuidValidate } from "uuid";
import db from "../../../db";
import { rooms } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const data: { roomId?: string; password?: string; name?: string } =
      await request.json();

    const { roomId, password, name } = data;

    // Invalid name
    if (
      !name ||
      !roomId ||
      !password ||
      !uuidValidate(roomId) ||
      !uuidValidate(password)
    )
      return NextResponse.json(
        { message: "Invalid inputs 🗑️", success: false },
        { status: 400 },
      );

    const room = await db
      .select()
      .from(rooms)
      .where(eq(rooms.id, roomId))
      .then((r) => r[0])
      .catch(() => undefined);

    if (!room)
      return NextResponse.json(
        { message: "Invalid Room 😶", success: false },
        { status: 400 },
      );

    const isPasswordMatch = room.password === password;
    if (!isPasswordMatch)
      return NextResponse.json(
        { message: "Invalid Password 🔐", success: false },
        { status: 400 },
      );

    const redirectPath = encodeURI(
      `/ama/${room.id}/?p=${room.password}&n=${name}`,
    );

    return NextResponse.json({
      message: "Valid Room",
      redirect: redirectPath,
      success: true,
    });
  } catch (e) {
    return NextResponse.json(
      { message: "Error", success: false },
      { status: 500 },
    );
  }
}
