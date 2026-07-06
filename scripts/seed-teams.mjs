// Seed script — run with: node scripts/seed-teams.mjs
// Populates the teams table with 25 teams and auto-generated invite codes

const SUPABASE_URL = "https://ituvukhajkxmrwdxkmbs.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dXZ1a2hhamt4bXJ3ZHhrbWJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzE4NDEyNCwiZXhwIjoyMDk4NzYwMTI0fQ.Ufhg0CKk4SsY845ykXnEH3yshjwzdO66bLwdmZY6ES4";

const teams = [
  { team_name: "SmartBits", email: "aritradutta6426@gmail.com" },
  { team_name: "Bingo_Tedemede", email: "sourjyabiswas03@gmail.com" },
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

// Generate a random 6-character alphanumeric invite code
function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // removed confusing chars like 0/O, 1/I
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function seed() {
  // Generate unique codes
  const usedCodes = new Set();
  const teamsWithCodes = teams.map((t) => {
    let code;
    do {
      code = generateCode();
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return { ...t, invite_code: code };
  });

  // Insert into Supabase via REST API
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

  // Print the table for distribution
  console.log("=".repeat(70));
  console.log("  INVITE CODES — Distribute these privately to each team");
  console.log("=".repeat(70));
  console.log("");
  console.log(
    "Team Name".padEnd(22) +
      "Email".padEnd(38) +
      "Invite Code"
  );
  console.log("-".repeat(70));
  teamsWithCodes.forEach((t) => {
    console.log(
      t.team_name.padEnd(22) +
        t.email.padEnd(38) +
        t.invite_code
    );
  });
  console.log("");
  console.log("=".repeat(70));
}

seed();
