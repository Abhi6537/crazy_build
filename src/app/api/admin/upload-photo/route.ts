import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    const { error } = await supabase
      .from("event_photos")
      .insert([{ url }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error inserting photo:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
