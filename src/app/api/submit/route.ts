import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

// Deadline: July 8, 2026, 5:00 PM IST (UTC+5:30) = 11:30 AM UTC
const DEADLINE = new Date("2026-07-08T11:30:00Z");
// 15 minute grace period for submissions
const GRACE_PERIOD_MS = 15 * 60 * 1000; 

async function getSettings() {
  const supabase = createServiceClient();
  const { data } = await supabase.from("app_settings").select("*").eq("id", 1).single();
  return data || { submission_status: 'PRE_HACKATHON', admin_message: '' };
}

// GET — fetch submission for a team
export async function GET(req: NextRequest) {
  try {
    const teamId = req.nextUrl.searchParams.get("teamId");
    if (!teamId) {
      return NextResponse.json({ error: "teamId is required." }, { status: 400 });
    }

    const settings = await getSettings();
    const now = new Date();
    
    // UI is locked if PRE_HACKATHON or if LIVE and past deadline
    const isLockedUI = settings.submission_status === 'PRE_HACKATHON' || 
                       (settings.submission_status === 'LIVE' && now > DEADLINE);

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
      isLocked: isLockedUI,
      settings: settings,
      deadline: DEADLINE.toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// POST — create or update submission (or draft)
export async function POST(req: NextRequest) {
  try {
    const settings = await getSettings();
    const now = new Date();
    
    if (settings.submission_status === 'PRE_HACKATHON') {
      return NextResponse.json({ error: "Submissions are currently locked." }, { status: 403 });
    }

    const isPastDeadline = now.getTime() > DEADLINE.getTime();
    const isPastGracePeriod = now.getTime() > (DEADLINE.getTime() + GRACE_PERIOD_MS);
    
    if (settings.submission_status === 'LIVE' && isPastGracePeriod) {
      return NextResponse.json({ error: "The submission deadline has passed." }, { status: 403 });
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
      isDraft, // NEW: boolean to differentiate Save vs Submit
    } = body;

    // Validate required fields ONLY if it's a final submission
    if (!isDraft) {
      if (!teamId || !projectTitle || !problemStatement || !shortDescription || !ourApproach || !challenges || !techStack || !githubLink) {
        return NextResponse.json(
          { error: "All required fields must be filled for final submission." },
          { status: 400 }
        );
      }
    } else {
      // Drafts just need teamId
      if (!teamId) {
         return NextResponse.json({ error: "Team ID is required to save draft." }, { status: 400 });
      }
    }

    if (shortDescription && shortDescription.length > 300) {
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

    const isLate = (settings.submission_status === 'LIVE' && isPastDeadline) || settings.submission_status === 'OVERRIDE_EXTENDED';

    const submissionData = {
      team_id: teamId,
      project_title: projectTitle || "",
      problem_statement: problemStatement || "",
      short_description: shortDescription || "",
      our_approach: ourApproach || "",
      challenges: challenges || "",
      tech_stack: techStack || "",
      github_link: githubLink || "",
      live_demo_link: liveDemoLink || null,
      youtube_link: youtubeLink || null,
      screenshots: screenshots || [],
      logo_url: logoUrl || null,
      updated_at: new Date().toISOString(),
      is_draft: isDraft,
      is_late: isLate
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
        console.error("DB Error updating submission:", error);
        return NextResponse.json({ error: "Failed to update submission." }, { status: 500 });
      }
      return NextResponse.json({ submission: data, updated: true, isDraft });
    } else {
      // Create
      const { data, error } = await supabase
        .from("submissions")
        .insert(submissionData)
        .select()
        .single();

      if (error) {
        console.error("DB Error creating submission:", error);
        return NextResponse.json({ error: "Failed to create submission." }, { status: 500 });
      }
      return NextResponse.json({ submission: data, created: true, isDraft });
    }
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
