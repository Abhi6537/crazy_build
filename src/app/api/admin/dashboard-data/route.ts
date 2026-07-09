import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const adminToken = (await cookies()).get("cb_admin_token");
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServiceClient();

    // Fetch teams
    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("*")
      .order("team_name", { ascending: true });

    if (teamsError) throw teamsError;

    // Fetch team members
    const { data: members, error: membersError } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: true });

    if (membersError && membersError.code !== '42P01') { 
      // 42P01 is relation does not exist, safe to ignore if table isn't created yet
      throw membersError;
    }

    // Fetch submissions
    const { data: submissions, error: subError } = await supabase
      .from("submissions")
      .select("team_id, is_winner, winner_position, winner_message");

    if (subError && subError.code !== '42P01') throw subError;

    // Fetch app settings
    const { data: appSettings, error: settingsError } = await supabase
      .from("app_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (settingsError && settingsError.code !== '42P01' && settingsError.code !== 'PGRST116') {
      throw settingsError;
    }

    // Assemble the payload
    const submissionMap = (submissions || []).reduce((acc: any, sub: any) => {
      acc[sub.team_id] = sub;
      return acc;
    }, {});
    const membersByTeam: Record<string, any[]> = {};
    
    if (members) {
      members.forEach((m) => {
        if (!membersByTeam[m.team_id]) {
          membersByTeam[m.team_id] = [];
        }
        membersByTeam[m.team_id].push(m);
      });
    }

    const enrichedTeams = teams.map((t) => ({
      ...t,
      members: membersByTeam[t.id] || [],
      submission: submissionMap[t.id] || null,
      has_submitted: !!submissionMap[t.id],
    }));

    return NextResponse.json({ 
      success: true, 
      teams: enrichedTeams,
      appSettings: appSettings || { submission_status: 'PRE_HACKATHON', admin_message: '' },
      error: null,
    });
  } catch (err: any) {
    console.error("Dashboard data error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
