// Database setup script — run with: node scripts/setup-db.mjs
// Creates tables, enables RLS, and sets up storage via Supabase Management API

const SUPABASE_URL = "https://ituvukhajkxmrwdxkmbs.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dXZ1a2hhamt4bXJ3ZHhrbWJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzE4NDEyNCwiZXhwIjoyMDk4NzYwMTI0fQ.Ufhg0CKk4SsY845ykXnEH3yshjwzdO66bLwdmZY6ES4";

async function runSQL(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  return res;
}

async function setup() {
  console.log("🔧 Setting up Supabase database...\n");

  // 1. Create teams table
  console.log("📋 Creating teams table...");
  const teamsRes = await fetch(`${SUPABASE_URL}/rest/v1/teams`, {
    method: "GET",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
  });
  
  if (teamsRes.status === 404 || teamsRes.status === 400) {
    console.log("   ⚠️  Tables don't exist yet. You need to run the SQL setup first.");
    console.log("   📄 Go to your Supabase Dashboard → SQL Editor");
    console.log("   📄 Copy and paste the contents of scripts/setup.sql");
    console.log("   📄 Click 'Run'");
    console.log("");
    console.log("   After running the SQL, come back and run this script again to seed the teams.");
    return false;
  }
  
  if (teamsRes.ok) {
    const existingTeams = await teamsRes.json();
    if (existingTeams.length > 0) {
      console.log(`   ✅ Teams table exists with ${existingTeams.length} teams already.`);
      console.log("   Skipping seed to avoid duplicates.");
      return true;
    }
    console.log("   ✅ Teams table exists but is empty. Will seed now.");
  }
  
  return true;
}

async function seedTeams() {
  const teams = [
    { team_name: "SmartBits", email: "aritradutta6426@gmail.com" },
    { team_name: "Bingo_Tedemede", email: "sourjyabiswas03@gmail.com" },
    { team_name: "Cyber Sages", email: "sreeja77428@gmail.com" },
    { team_name: "Hack horizons", email: "arpanbasak2211@gmail.com" },
    { team_name: "Rosogolla Rebels", email: "chatterjeedibyendu166@gmail.com" },
    { team_name: "SMOOTH OPERATORZ", email: "deyamit0044l@gmail.com" },
    { team_name: "Team JAGUAAR", email: "mohitpandey.827680165@gmail.com" },
    { team_name: "CodeNova", email: "prataya5001@gmail.com" },
    { team_name: "Alu Posto", email: "sunithkonar5@gmail.com" },
    { team_name: "Team AANPADH", email: "niladric006@gmail.com" },
    { team_name: "Misti doi", email: "swapnanilrick10@gmail.com" },
    { team_name: "Knight Riders", email: "dhrubamarik91259@gmail.com" },
    { team_name: "Aspirers", email: "debjeetmazumder3232@gmail.com" },
    { team_name: "Infinite Looper", email: "ankanparamanik101@gmail.com" },
    { team_name: "Hack Coders", email: "hritikkrgupta7746@gmail.com" },
    { team_name: "Gublet Gang", email: "srinjoypramanick15@gmail.com" },
    { team_name: "The Elite Coders", email: "uditnarayanganguly10@gmail.com" },
    { team_name: "Aloo Siddo", email: "palsamiranpal2004@gmail.com" },
    { team_name: "Vector", email: "swagatamg032@gmail.com" },
    { team_name: "Kernel", email: "adulhayat123@gmail.com" },
    { team_name: "Binary Beasts", email: "sinhatumpa84@gmail.com" },
    { team_name: "Hackathon party", email: "kumaranujgupta2005@gmail.com" },
    { team_name: "MuttonBiryani", email: "biswaranjannag91@gmail.com" },
    { team_name: "ATOMIX", email: "shaan36777@gmail.com" },
    { team_name: "The-Crackers", email: "debnathjoker123@gmail.com" },
  ];

  // Generate unique codes
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const usedCodes = new Set();
  
  function generateCode() {
    let code;
    do {
      code = "";
      for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
  }

  const teamsWithCodes = teams.map((t) => ({
    ...t,
    invite_code: generateCode(),
  }));

  // Insert into Supabase
  const res = await fetch(`${SUPABASE_URL}/rest/v1/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(teamsWithCodes),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Seed failed:", err);
    return;
  }

  const data = await res.json();
  console.log(`\n✅ Successfully seeded ${data.length} teams!\n`);

  // Print the table
  console.log("=".repeat(75));
  console.log("  📧 INVITE CODES — Distribute these privately to each team");
  console.log("=".repeat(75));
  console.log("");
  console.log(
    "  " + "Team Name".padEnd(22) + "Email".padEnd(38) + "Code"
  );
  console.log("  " + "-".repeat(70));
  teamsWithCodes.forEach((t) => {
    console.log(
      "  " + t.team_name.padEnd(22) + t.email.padEnd(38) + t.invite_code
    );
  });
  console.log("");
  console.log("=".repeat(75));
}

async function main() {
  const ready = await setup();
  if (ready) {
    // Check if already seeded
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/teams?select=id`, {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    });
    const existing = await checkRes.json();
    if (existing.length === 0) {
      await seedTeams();
    }
  }
}

main();
