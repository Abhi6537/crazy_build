// Inject a demo team — run with: node scripts/add-demo-team.mjs

const SUPABASE_URL = "https://ituvukhajkxmrwdxkmbs.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dXZ1a2hhamt4bXJ3ZHhrbWJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzE4NDEyNCwiZXhwIjoyMDk4NzYwMTI0fQ.Ufhg0CKk4SsY845ykXnEH3yshjwzdO66bLwdmZY6ES4";

const demoTeam = {
  team_name: "juggadu",
  email: "ghoshabhinandan290@gmail.com",
  invite_code: "DEMO26",
};

async function inject() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(demoTeam),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Failed:", err);
    return;
  }

  console.log("✅ Demo team injected!\n");
  console.log("  Team Name:   juggadu");
  console.log("  Email:       ghoshabhinandan290@gmail.com");
  console.log("  Invite Code: DEMO26");
  console.log("\n  Go to /submit → Sign Up with these credentials.");
}

inject();
