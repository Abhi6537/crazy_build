import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Find team by email
    const { data: team, error: lookupError } = await supabase
      .from("teams")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (lookupError || !team) {
      return NextResponse.json(
        { error: "No team found with this email." },
        { status: 401 }
      );
    }

    if (!team.is_registered) {
      return NextResponse.json(
        { error: "This team hasn't registered yet. Please sign up first." },
        { status: 401 }
      );
    }

    // Verify password
    if (team.password_hash !== hashPassword(password)) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      team: {
        id: team.id,
        team_name: team.team_name,
        email: team.email,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
