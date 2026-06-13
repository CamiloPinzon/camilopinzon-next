import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error removing session cookie:", error);
    return NextResponse.json({ error: "Failed to remove session cookie" }, { status: 500 });
  }
}
