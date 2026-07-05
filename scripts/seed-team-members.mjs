import { createClient } from "@supabase/supabase-js";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedTeamMembers() {
  const filePath = path.resolve(process.cwd(), "Food Peference Crazy Build.xlsx");
  if (!fs.existsSync(filePath)) {
    console.error("Excel file not found at", filePath);
    process.exit(1);
  }

  console.log("Loading Excel file...");
  const wb = xlsx.readFile(filePath);
  const sheetName = wb.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);

  console.log(`Found ${data.length} teams in Excel.`);

  // 1. Fetch all existing teams from DB to get their UUIDs
  const { data: dbTeams, error: fetchError } = await supabase.from("teams").select("id, team_name");
  if (fetchError) {
    console.error("Error fetching teams from DB:", fetchError);
    process.exit(1);
  }

  // Create a quick lookup map: team_name (lowercase trimmed) -> team_id
  const teamMap = {};
  dbTeams.forEach((t) => {
    teamMap[t.team_name.toLowerCase().trim()] = t.id;
  });

  const membersToInsert = [];

  for (const row of data) {
    const rawTeamName = row["Team Name "];
    if (!rawTeamName) continue;
    
    const teamNameLower = rawTeamName.toLowerCase().trim();
    const teamId = teamMap[teamNameLower];

    if (!teamId) {
      console.warn(`WARNING: Could not find team "${rawTeamName}" in database. Skipping their members.`);
      continue;
    }

    // Helper to safely format preference
    const formatPref = (pref) => {
      if (!pref) return "Veg"; // default
      return pref.toLowerCase().includes("non") ? "Non-veg" : "Veg";
    };

    // 1. Team Lead
    const leadName = row["Team Lead Name"];
    // Quirky column name for Lead's food preference
    const leadPref = formatPref(row["Team Lead Name 2"]);
    if (leadName) {
      membersToInsert.push({
        team_id: teamId,
        name: leadName.trim(),
        role: "Lead",
        food_preference: leadPref
      });
    }

    // 2. Member 1
    const m1Name = row["Member 1 name "];
    const m1Pref = formatPref(row["Member 1 food Preference "]);
    if (m1Name) {
      membersToInsert.push({
        team_id: teamId,
        name: m1Name.trim(),
        role: "Member",
        food_preference: m1Pref
      });
    }

    // 3. Member 2
    const m2Name = row["Member 2 name "];
    const m2Pref = formatPref(row["Member 2 Food Preference "]);
    if (m2Name) {
      membersToInsert.push({
        team_id: teamId,
        name: m2Name.trim(),
        role: "Member",
        food_preference: m2Pref
      });
    }

    // 4. Member 3
    const m3Name = row["Member 3 Name"];
    const m3Pref = formatPref(row["Member 3 Food Preference "]);
    if (m3Name) {
      membersToInsert.push({
        team_id: teamId,
        name: m3Name.trim(),
        role: "Member",
        food_preference: m3Pref
      });
    }
  }

  console.log(`Prepared ${membersToInsert.length} team members for insertion.`);

  if (membersToInsert.length === 0) {
    console.log("No members to insert.");
    process.exit(0);
  }

  // Clear existing members just in case we are re-running
  console.log("Clearing existing team_members...");
  await supabase.from("team_members").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Inserting team members...");
  const { error: insertError } = await supabase.from("team_members").insert(membersToInsert);

  if (insertError) {
    console.error("Error inserting team members:", insertError);
  } else {
    console.log("Successfully seeded team members!");
  }
}

seedTeamMembers();
