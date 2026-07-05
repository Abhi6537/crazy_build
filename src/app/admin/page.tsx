"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Circle, Utensils, Download, LogIn, ChevronRight, Users } from "lucide-react";
import Link from "next/link";

interface Member {
  id: string;
  name: string;
  role: string;
  food_preference: string;
  has_checked_in: boolean;
  has_received_food: boolean;
}

interface Team {
  id: string;
  team_name: string;
  invite_code: string;
  has_submitted: boolean;
  members: Member[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const checkAuthAndFetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard-data", { cache: "no-store" });
      if (res.status === 401) {
        setIsAuthenticated(false);
      } else if (res.ok) {
        const data = await res.json();
        setTeams(data.teams || []);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        await checkAuthAndFetchData();
      } else {
        const err = await res.json();
        setLoginError(err.error || "Login failed");
      }
    } catch (err) {
      setLoginError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Status updates
  const toggleMemberStatus = async (teamId: string, memberId: string, field: "has_checked_in" | "has_received_food", currentValue: boolean) => {
    // Optimistic update
    setTeams((prev) => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          members: t.members.map(m => m.id === memberId ? { ...m, [field]: !currentValue } : m)
        };
      }
      return t;
    }));

    try {
      await fetch("/api/admin/update-member", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, field, value: !currentValue })
      });
    } catch (err) {
      console.error(err);
      // Rollback on failure could be implemented here
    }
  };

  const handleCheckInAll = async (teamId: string) => {
    // Optimistic update
    setTeams((prev) => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          members: t.members.map(m => ({ ...m, has_checked_in: true }))
        };
      }
      return t;
    }));

    try {
      await fetch("/api/admin/checkin-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Team Name", "Invite Code", "Submitted", "Member Name", "Role", "Food Pref", "Checked In", "Got Food"];
    const rows: string[][] = [];

    teams.forEach(t => {
      if (t.members.length === 0) {
        rows.push([t.team_name, t.invite_code, t.has_submitted ? "Yes" : "No", "", "", "", "", ""]);
      } else {
        t.members.forEach(m => {
          rows.push([
            t.team_name,
            t.invite_code,
            t.has_submitted ? "Yes" : "No",
            m.name,
            m.role,
            m.food_preference,
            m.has_checked_in ? "Yes" : "No",
            m.has_received_food ? "Yes" : "No"
          ]);
        });
      }
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "crazy_build_logistics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Analytics derived from local state
  const stats = useMemo(() => {
    let totalMembers = 0;
    let checkedInMembers = 0;
    let totalVeg = 0;
    let totalNonVeg = 0;
    let vegReceived = 0;
    let nonVegReceived = 0;
    let teamsArrived = 0;
    let submittedTeams = 0;

    teams.forEach(t => {
      if (t.has_submitted) submittedTeams++;
      let teamHasArrival = false;

      t.members.forEach(m => {
        totalMembers++;
        if (m.has_checked_in) {
          checkedInMembers++;
          teamHasArrival = true;
        }
        
        const isVeg = m.food_preference.toLowerCase() === "veg";
        if (isVeg) totalVeg++;
        else totalNonVeg++;

        if (m.has_received_food) {
          if (isVeg) vegReceived++;
          else nonVegReceived++;
        }
      });

      if (teamHasArrival) teamsArrived++;
    });

    return { totalMembers, checkedInMembers, totalVeg, totalNonVeg, vegReceived, nonVegReceived, teamsArrived, totalTeams: teams.length, submittedTeams };
  }, [teams]);

  // Filtering
  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return teams;
    const q = searchQuery.toLowerCase();
    return teams.filter(t => 
      t.team_name.toLowerCase().includes(q) || 
      t.invite_code.toLowerCase().includes(q)
    );
  }, [teams, searchQuery]);


  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center font-mono uppercase font-bold">Loading HQ...</div>;
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4" style={{ backgroundImage: "var(--paper-grain)" }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white border-4 border-black p-8 w-full max-w-md shadow-[12px_12px_0_0_#FF4D00]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-xl">HQ</div>
            <h1 className="font-display font-black text-3xl uppercase">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-black p-3 font-sans focus:outline-none focus:ring-2 ring-[#0055FF] shadow-[4px_4px_0_0_#1a1a1a]"
                placeholder="Enter secret code..."
              />
            </div>
            {loginError && <p className="text-[#FF0033] font-bold font-mono text-xs uppercase">{loginError}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0055FF] text-white border-2 border-black py-3 font-display font-bold text-lg uppercase tracking-wider hover:bg-[#FF4D00] transition-colors shadow-[4px_4px_0_0_#1a1a1a] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" /> {loading ? "Verifying..." : "Enter Command Center"}
            </button>
          </form>
          <div className="mt-6 text-center">
             <Link href="/" className="font-mono text-xs uppercase font-bold text-gray-500 hover:text-black">← Back to Site</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ backgroundImage: "var(--paper-grain)" }}>
      {/* Top Nav */}
      <div className="w-full border-b-4 border-black bg-black px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF4D00] text-black font-black px-2 py-0.5 text-sm transform -rotate-2 border border-white">HQ</span>
            <span className="font-display font-bold uppercase tracking-widest text-lg">Command Center</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleExportCSV} className="hidden md:flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-white text-black px-3 py-1.5 hover:bg-[#FFB800] transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <Link href="/" className="font-mono text-xs uppercase font-bold text-gray-400 hover:text-white flex items-center">
              Exit <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#1a1a1a]">
            <p className="font-mono text-[10px] uppercase font-bold text-gray-500 mb-1">Teams Arrived</p>
            <p className="font-display font-black text-3xl text-[#0A1128]">{stats.teamsArrived}<span className="text-xl text-gray-400">/{stats.totalTeams}</span></p>
          </div>
          <div className="bg-[#FFB800] border-2 border-black p-4 shadow-[4px_4px_0_0_#1a1a1a]">
            <p className="font-mono text-[10px] uppercase font-bold text-black mb-1">Total Headcount</p>
            <p className="font-display font-black text-3xl text-black">{stats.checkedInMembers}<span className="text-xl text-black/50">/{stats.totalMembers}</span></p>
          </div>
          <div className="bg-[#FF4D00] border-2 border-black p-4 shadow-[4px_4px_0_0_#1a1a1a] text-white">
            <p className="font-mono text-[10px] uppercase font-bold text-white/80 mb-1">Food: Veg Delivered</p>
            <p className="font-display font-black text-3xl">{stats.vegReceived}<span className="text-xl text-white/50">/{stats.totalVeg}</span></p>
          </div>
          <div className="bg-[#0055FF] border-2 border-black p-4 shadow-[4px_4px_0_0_#1a1a1a] text-white">
            <p className="font-mono text-[10px] uppercase font-bold text-white/80 mb-1">Food: Non-Veg Delivered</p>
            <p className="font-display font-black text-3xl">{stats.nonVegReceived}<span className="text-xl text-white/50">/{stats.totalNonVeg}</span></p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative z-10">
          <div className="relative bg-white border-4 border-black flex items-center p-2 md:p-3 shadow-[8px_8px_0_0_#1a1a1a]">
            <Search className="w-6 h-6 text-[#FF0033] ml-2 mr-3" />
            <input 
              type="text" 
              placeholder="QUICK SEARCH: Enter Invite Code or Team Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent font-display text-lg md:text-2xl uppercase font-bold w-full focus:outline-none placeholder:text-gray-300"
              autoFocus
            />
            {searchQuery && (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1 absolute right-4">
                {filteredTeams.length} Found
              </span>
            )}
          </div>
        </div>

        {/* Teams List */}
        <div className="space-y-6">
          {filteredTeams.length === 0 ? (
            <div className="text-center py-20 font-display font-bold text-2xl uppercase text-gray-400">No teams found matching "{searchQuery}"</div>
          ) : (
            filteredTeams.map((team) => (
              <div key={team.id} className="bg-white border-4 border-black shadow-[8px_8px_0_0_#1a1a1a] overflow-hidden">
                {/* Team Header */}
                <div className="bg-gray-50 border-b-4 border-black p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0A1128] flex items-center justify-center border-2 border-black transform -rotate-3 shadow-sm">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-2xl uppercase tracking-wider text-[#0A1128]">{team.team_name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-gray-200 border border-black px-2 py-0.5">Code: {team.invite_code}</span>
                        {team.has_submitted ? (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-[#0055FF] text-white border border-black px-2 py-0.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Submitted
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 border border-black px-2 py-0.5">
                            Pending Submission
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Action: Check in entire team */}
                  {team.members.length > 0 && team.members.some(m => !m.has_checked_in) && (
                    <button 
                      onClick={() => handleCheckInAll(team.id)}
                      className="w-full md:w-auto font-mono text-xs font-bold uppercase tracking-wider bg-black text-white px-4 py-2 hover:bg-[#FF4D00] transition-colors border-2 border-black"
                    >
                      Check In Entire Team
                    </button>
                  )}
                </div>

                {/* Team Members List */}
                <div className="p-0">
                  {team.members.length === 0 ? (
                    <div className="p-6 text-center font-mono text-sm uppercase font-bold text-gray-400">No members uploaded for this team.</div>
                  ) : (
                    <div className="divide-y-2 divide-black/10">
                      {team.members.map((member) => {
                        const isVeg = member.food_preference.toLowerCase() === "veg";
                        return (
                          <div key={member.id} className={`p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${member.has_checked_in ? 'bg-green-50/50' : 'hover:bg-gray-50'}`}>
                            
                            <div className="flex-1 flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-lg uppercase">{member.name}</span>
                                {member.role === "Lead" && (
                                  <span className="font-mono text-[8px] font-bold bg-[#FFB800] border border-black px-1.5 py-0.5 uppercase">Lead</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`font-mono text-[10px] font-bold border border-black px-1.5 py-0.5 uppercase ${isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {member.food_preference}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                              {/* Check-In Toggle */}
                              <button 
                                onClick={() => toggleMemberStatus(team.id, member.id, "has_checked_in", member.has_checked_in)}
                                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase px-3 py-2 border-2 border-black w-32 justify-center transition-all shadow-[2px_2px_0_0_#1a1a1a] active:shadow-none active:translate-y-0.5 ${member.has_checked_in ? 'bg-[#0055FF] text-white' : 'bg-white hover:bg-gray-100'}`}
                              >
                                {member.has_checked_in ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                Checked In
                              </button>

                              {/* Food Toggle */}
                              <button 
                                onClick={() => toggleMemberStatus(team.id, member.id, "has_received_food", member.has_received_food)}
                                disabled={!member.has_checked_in}
                                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase px-3 py-2 border-2 border-black w-32 justify-center transition-all shadow-[2px_2px_0_0_#1a1a1a] active:shadow-none active:translate-y-0.5 ${!member.has_checked_in ? 'opacity-50 cursor-not-allowed bg-gray-200' : member.has_received_food ? 'bg-[#FF4D00] text-white' : 'bg-white hover:bg-gray-100'}`}
                              >
                                {member.has_received_food ? <CheckCircle2 className="w-4 h-4" /> : <Utensils className="w-4 h-4" />}
                                Got Food
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
