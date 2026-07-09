import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServiceClient();

    // Fetch all submissions, joining the teams table to get the team name
    const { data: submissions, error } = await supabase
      .from("submissions")
      .select(`
        id,
        project_title,
        problem_statement,
        short_description,
        our_approach,
        challenges,
        tech_stack,
        github_link,
        live_demo_link,
        youtube_link,
        screenshots,
        logo_url,
        team_id,
        is_winner,
        winner_position,
        winner_message,
        teams ( team_name )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gallery Fetch Error:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }

    // Format the response to flatten the team_name
    const formatted = submissions.map((sub: any) => {
      // Supabase returns related table fields as an object (or array if many)
      const teamName = sub.teams ? (Array.isArray(sub.teams) ? sub.teams[0]?.team_name : sub.teams.team_name) : "Unknown Team";
      return {
        ...sub,
        team_name: teamName,
      };
    });

    return NextResponse.json({ submissions: formatted }, { status: 200 });
  } catch (err) {
    console.error("Gallery Fetch Exception:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
