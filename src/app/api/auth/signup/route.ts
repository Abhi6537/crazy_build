import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import crypto from "crypto";

// Simple password hashing (for this use case)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { teamName, email, inviteCode, password } = await req.json();

    if (!teamName || !email || !inviteCode || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Check if team exists with matching email and invite code
    const { data: team, error: lookupError } = await supabase
      .from("teams")
      .select("*")
      .ilike("team_name", teamName)
      .eq("email", email.toLowerCase().trim())
      .eq("invite_code", inviteCode.toUpperCase().trim())
      .single();

    if (lookupError || !team) {
      return NextResponse.json(
        { error: "Invalid credentials. Team name, email, or invite code doesn't match." },
        { status: 401 }
      );
    }

    // Check if already registered
    if (team.is_registered) {
      return NextResponse.json(
        { error: "This team has already registered. Please login instead." },
        { status: 409 }
      );
    }

    // Register the team
    const { error: updateError } = await supabase
      .from("teams")
      .update({
        is_registered: true,
        password_hash: hashPassword(password),
        registered_at: new Date().toISOString(),
      })
      .eq("id", team.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Registration failed. Please try again." },
        { status: 500 }
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
