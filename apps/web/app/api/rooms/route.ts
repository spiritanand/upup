import { NextResponse } from "next/server";

export async function GET() {
  // Not Signed in
  return NextResponse.json(
    { message: "Not signed in", success: false },
    // { status: 401 },
  );
}
