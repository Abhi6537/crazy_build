import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

// Deadline: July 8, 2026, 5:00 PM IST (UTC+5:30) = 11:30 AM UTC
const DEADLINE = new Date("2026-07-08T11:30:00Z");

function isLocked() {
  return new Date() > DEADLINE;
}

// GET — fetch submission for a team
export async function GET(req: NextRequest) {
  try {
    const teamId = req.nextUrl.searchParams.get("teamId");
    if (!teamId) {
      return NextResponse.json({ error: "teamId is required." }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("team_id", teamId)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: "Failed to fetch submission." }, { status: 500 });
    }

    return NextResponse.json({
      submission: data || null,
      isLocked: isLocked(),
      deadline: DEADLINE.toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// POST — create or update submission
export async function POST(req: NextRequest) {
  try {
    if (isLocked()) {
      return NextResponse.json(
        { error: "Submissions are locked. The deadline has passed." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      teamId,
      projectTitle,
      problemStatement,
      shortDescription,
      ourApproach,
      challenges,
      techStack,
      githubLink,
      liveDemoLink,
      youtubeLink,
      screenshots,
      logoUrl,
    } = body;

    // Validate required fields
    if (!teamId || !projectTitle || !problemStatement || !shortDescription || !ourApproach || !challenges || !techStack || !githubLink) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (shortDescription.length > 300) {
      return NextResponse.json(
        { error: "Short description must be 300 characters or less." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Check if submission already exists
    const { data: existing } = await supabase
      .from("submissions")
      .select("id")
      .eq("team_id", teamId)
      .single();

    const submissionData = {
      team_id: teamId,
      project_title: projectTitle,
      problem_statement: problemStatement,
      short_description: shortDescription,
      our_approach: ourApproach,
      challenges: challenges,
      tech_stack: techStack,
      github_link: githubLink,
      live_demo_link: liveDemoLink || null,
      youtube_link: youtubeLink || null,
      screenshots: screenshots || [],
      logo_url: logoUrl || null,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      // Update
      const { data, error } = await supabase
        .from("submissions")
        .update(submissionData)
        .eq("team_id", teamId)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: "Failed to update submission." }, { status: 500 });
      }
      return NextResponse.json({ submission: data, updated: true });
    } else {
      // Create
      const { data, error } = await supabase
        .from("submissions")
        .insert(submissionData)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: "Failed to create submission." }, { status: 500 });
      }
      return NextResponse.json({ submission: data, created: true });
    }
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
