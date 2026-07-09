import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { team_id, is_winner, winner_position, winner_message } = body;

    if (!team_id) {
      return NextResponse.json({ error: "Missing team_id" }, { status: 400 });
    }

    const { error } = await supabase
      .from("submissions")
      .update({
        is_winner,
        winner_position,
        winner_message
      })
      .eq("team_id", team_id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error updating winner status:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
