import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addCrackers() {
  // Fetch team_id for The-Crackers
  const { data: team, error: fetchError } = await supabase
    .from("teams")
    .select("id")
    .eq("team_name", "The Crackers")
    .single();

  if (fetchError || !team) {
    console.error("Could not find The Crackers in DB", fetchError);
    return;
  }

  const teamId = team.id;

  const members = [
    { team_id: teamId, name: "Gunjan Roy", role: "Lead", food_preference: "Non-veg" },
    { team_id: teamId, name: "Yagnik Deb Biswas", role: "Member", food_preference: "Non-veg" },
    { team_id: teamId, name: "Jit Debnath", role: "Member", food_preference: "Non-veg" },
    { team_id: teamId, name: "Bubun Ghosh", role: "Member", food_preference: "Non-veg" }
  ];

  const { error: insertError } = await supabase
    .from("team_members")
    .insert(members);

  if (insertError) {
    console.error("Error inserting members:", insertError);
  } else {
    console.log("Successfully added members for The-Crackers!");
  }
}

addCrackers();
