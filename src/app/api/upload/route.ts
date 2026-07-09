import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const teamId = formData.get("teamId") as string;
    const type = formData.get("type") as string; // "screenshot" or "logo"

    if (!file || (type !== "memory" && !teamId)) {
      return NextResponse.json(
        { error: "File and teamId are required." },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed." },
        { status: 400 }
      );
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be under 5MB." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const timestamp = Date.now();
    let folder = "screenshots";
    if (type === "logo") folder = "logos";
    else if (type === "memory") folder = "memories";
    const filePath = type === "memory" ? `admin/${folder}/${timestamp}.${ext}` : `${teamId}/${folder}/${timestamp}.${ext}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("project-assets")
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Upload failed. Please try again." },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("project-assets")
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: urlData.publicUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
