// Seed script — run with: node scripts/seed-team-members.mjs
import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const membersData = [
  {
    "team_name": "SmartBits",
    "members": [
      {
        "name": "Aritra Dutta",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Debayan Chowdhury",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aeshan Chowdhury",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Anisha Paul",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Bingo_Tedemede",
    "members": [
      {
        "name": "Sourjya Biswas",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Shreya Dutta",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Sayan Paul",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Subhankar Saha",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Hack horizons",
    "members": [
      {
        "name": "Arpan Basak",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Rupa Howlader",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aiyush Ghosh",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Prabortika Chakraborty",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Rosogolla Rebels",
    "members": [
      {
        "name": "Dibyendu Chatterjee",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Bidisha Das",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aritra Patra",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Srijita Dutta",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "SMOOTH OPERATORZ",
    "members": [
      {
        "name": "AMIT DEY",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "ABHIGYAN PASWAN",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "ADITYA KUMAR",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "BILTU SAMANTA",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Team JAGUAAR",
    "members": [
      {
        "name": "Mohit Pandey",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Nabanita Biswas",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Shuvayan Sarakar",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "MD Rafi Ahmed",
        "role": "Member",
        "food_preference": "Veg"
      }
    ]
  },
  {
    "team_name": "CodeNova",
    "members": [
      {
        "name": "Prataya Ghosh",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Avik Mitra",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Payel Biswas",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Preshona Pal",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Alu Posto",
    "members": [
      {
        "name": "Subhankar Dey",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Sukanya Gupta",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Sunith konar",
        "role": "Lead",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Team AANPADH",
    "members": [
      {
        "name": "Niladri Choudhury",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aarav Pandey",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aryan Yadav",
        "role": "Member",
        "food_preference": "Veg"
      },
      {
        "name": "Prasheel Kumar Singh",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Misti doi",
    "members": [
      {
        "name": "Swapnanil Banerjee",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Sayani Chakraborty",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Souvik Sarkar",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Soma Basak",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Knight Riders",
    "members": [
      {
        "name": "Dhruba Marik",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Harsha Adhikary",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Ishan Maji",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Debojyoti Ghosh",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Aspirers",
    "members": [
      {
        "name": "Debjeet Mazumder",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Debadrita Baksi",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Mehul Kumar Jaiswal",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Anik Sarkar",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Infinite Looper",
    "members": [
      {
        "name": "Ankan Paramanik",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Shibam kundu",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Anik Pal",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Hack Coders",
    "members": [
      {
        "name": "Ritik Kumar",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Rudro Chakraborty",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Priyanka Bhagat",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Sagnik Chakraborty",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Gublet Gang",
    "members": [
      {
        "name": "Srinoy Pramanick",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Anwesha Das",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Soudip Biswas",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "The Elite Coders",
    "members": [
      {
        "name": "Udit Narayan Ganguly",
        "role": "Lead",
        "food_preference": "Veg"
      },
      {
        "name": "Trijit Roy",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Chintu Behera",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Swarnajit Das",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Aloo Siddo",
    "members": [
      {
        "name": "Tiasha Biswas",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Sudipta Ghorami",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Piyush Paul",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Samiran Pal",
        "role": "Lead",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Vector",
    "members": [
      {
        "name": "Swagatam Ghosh",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Hrisav khanra",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Susmita Chatterji",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Tannistha Chakraborty",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Kernel",
    "members": [
      {
        "name": "Abul Hayatul Hossain",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Pritom Day",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Soumi Dutta",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aftab Ansari",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "Binary Beasts",
    "members": [
      {
        "name": "Swagata Ghosh",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Aritro de",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Supratik Sinha",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Zahidur Rahman",
        "role": "Member",
        "food_preference": "Veg"
      }
    ]
  },
  {
    "team_name": "Hackathon party",
    "members": [
      {
        "name": "Anuj Kumar Gupta",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Ankita Pauli",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Ashish Tiwari",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "MuttonBiryani",
    "members": [
      {
        "name": "Biswaranjan Nag",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Raja Banarjee",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Akanksha Kumari",
        "role": "Member",
        "food_preference": "Veg"
      },
      {
        "name": "Shraya Saha",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "ATOMIX",
    "members": [
      {
        "name": "Santanu Mandal",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "INDRANIL KARMAKAR",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "RISHAV ROY",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "RUDRA PROSHAD GHOSH",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  },
  {
    "team_name": "The Crackers",
    "members": [
      {
        "name": "Gunjan Roy",
        "role": "Lead",
        "food_preference": "Non-veg"
      },
      {
        "name": "Jit Debnath",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Yagnik Deb Biswas",
        "role": "Member",
        "food_preference": "Non-veg"
      },
      {
        "name": "Bubun Ghosh",
        "role": "Member",
        "food_preference": "Non-veg"
      }
    ]
  }
];

async function seedTeamMembers() {
  console.log("Fetching teams from DB to map UUIDs...");
  const { data: dbTeams, error: fetchError } = await supabase.from("teams").select("id, team_name");
  if (fetchError) {
    console.error("Error fetching teams from DB:", fetchError);
    process.exit(1);
  }

  const teamMap = {};
  dbTeams.forEach((t) => {
    teamMap[t.team_name.toLowerCase().trim()] = t.id;
  });

  const membersToInsert = [];

  for (const teamData of membersData) {
    const teamId = teamMap[teamData.team_name.toLowerCase().trim()];
    if (!teamId) {
      console.warn(`WARNING: Could not find team "${teamData.team_name}" in DB. Skipping.`);
      continue;
    }

    for (const m of teamData.members) {
      membersToInsert.push({
        team_id: teamId,
        name: m.name,
        role: m.role,
        food_preference: m.food_preference
      });
    }
  }

  console.log(`Prepared ${membersToInsert.length} team members for insertion.`);
  if (membersToInsert.length === 0) return;

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
