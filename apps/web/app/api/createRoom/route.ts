import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "../../../db";
import { rooms } from "../../../db/schema";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Not Signed in
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { message: "Not signed in", success: false },
        { status: 401 },
      );

    const data = await request.json();

    const { name } = data;

    // Invalid name
    if (!name)
      return NextResponse.json(
        { message: "No name provided", success: false },
        { status: 400 },
      );

    await db.insert(rooms).values({ name, userId: session.user.id });

    return NextResponse.json({ message: "Room Created", success: true });
  } catch (e) {
    return NextResponse.json(
      { message: "Error", success: false },
      { status: 500 },
    );
  }
}
