import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase";

export async function PATCH(req: NextRequest) {
  try {
    const adminToken = (await cookies()).get("cb_admin_token");
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId, field, value } = await req.json();

    if (!memberId || !field || value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure we only update specific allowed fields to prevent SQL injection or bad updates
    if (field !== "has_checked_in" && field !== "has_received_food") {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase
      .from("team_members")
      .update({ [field]: value })
      .eq("id", memberId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Update member error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
