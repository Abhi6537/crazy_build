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
      .select("team_id");

    if (subError) throw subError;

    // Assemble the payload
    const submissionSet = new Set(submissions.map((s) => s.team_id));
    const membersByTeam: Record<string, any[]> = {};
    
    if (members) {
      members.forEach((m) => {
        if (!membersByTeam[m.team_id]) {
          membersByTeam[m.team_id] = [];
        }
        membersByTeam[m.team_id].push(m);
      });
    }

    const enrichedTeams = teams.map((team) => ({
      ...team,
      has_submitted: submissionSet.has(team.id),
      members: membersByTeam[team.id] || [],
    }));

    return NextResponse.json({ success: true, teams: enrichedTeams });
  } catch (err: any) {
    console.error("Dashboard data error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
