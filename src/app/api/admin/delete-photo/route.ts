import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const adminToken = (await cookies()).get("cb_admin_token");
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, url } = await req.json();

    if (!id || !url) {
      return NextResponse.json({ error: "Missing id or url" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // 1. Delete from Supabase Storage
    // URL example: https://[project-id].supabase.co/storage/v1/object/public/project-assets/admin/memories/123.jpg
    // We need to extract the path after 'project-assets/'
    const urlParts = url.split('/project-assets/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      const { error: storageError } = await supabase.storage
        .from("project-assets")
        .remove([filePath]);
      
      if (storageError) {
        console.error("Storage deletion error:", storageError);
        // Continue anyway to try and remove from DB
      }
    }

    // 2. Delete from database
    const { error: dbError } = await supabase
      .from("event_photos")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete photo error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
