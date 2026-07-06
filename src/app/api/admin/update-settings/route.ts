import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const adminToken = (await cookies()).get("cb_admin_token");
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { submission_status, admin_message } = await req.json();

    const supabase = createServiceClient();
    
    // We only have one settings row (id = 1)
    const { error } = await supabase
      .from("app_settings")
      .update({ submission_status, admin_message })
      .eq("id", 1);

    if (error) {
      console.error("Error updating settings:", error);
      return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Settings update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
