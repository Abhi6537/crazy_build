"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Code2,
  ExternalLink,
  Video,
  X,
  ChevronRight,
  Lock,
  LogOut,
  ImagePlus,
  Check,
  AlertTriangle,
  Clock,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Deadline: July 8, 2026, 5:00 PM IST
const DEADLINE = new Date("2026-07-08T11:30:00Z");

export const PROBLEM_STATEMENTS = [
  "PS 1: Talking Rabbitt - AI Powered Business Intelligence Dashboard",
  "PS 2: AI-Powered Personal Brand Marketing Engine",
  "PS 3: AI Competitor Strategy Analyzer",
  "PS 4: Signals Harvesting Engine - Agentic AI Workflow System",
  "PS 5: Agentic AI HRMS & Hiring Automation Platform"
];

interface TeamSession {
  id: string;
  team_name: string;
  email: string;
}

interface Submission {
  id?: string;
  project_title: string;
  problem_statement: string;
  short_description: string;
  our_approach: string;
  challenges: string;
  tech_stack: string;
  github_link: string;
  live_demo_link: string;
  youtube_link: string;
  screenshots: string[];
  logo_url: string;
}

const emptySubmission: Submission = {
  project_title: "",
  problem_statement: "",
  short_description: "",
  our_approach: "",
  challenges: "",
  tech_stack: "",
  github_link: "",
  live_demo_link: "",
  youtube_link: "",
  screenshots: [],
  logo_url: "",
};

export default function SubmitPage() {
  const [session, setSession] = useState<TeamSession | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isLocked, setIsLocked] = useState(false);
  const [submission, setSubmission] = useState<Submission>(emptySubmission);
  const [hasExisting, setHasExisting] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const [uploadProgressScreenshot, setUploadProgressScreenshot] = useState(0);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadProgressLogo, setUploadProgressLogo] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  // Auth form state
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [password, setPassword] = useState("");

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = DEADLINE.getTime() - now.getTime();
      if (diff <= 0) {
        setIsLocked(true);
        setTimeLeft("LOCKED");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check localStorage for session
  useEffect(() => {
    const saved = localStorage.getItem("cb_session");
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch {
        localStorage.removeItem("cb_session");
      }
    }
  }, []);

  // Fetch existing submission when session loads
  const fetchSubmission = useCallback(async () => {
    if (!session) return;
    try {
      const res = await fetch(`/api/submit?teamId=${session.id}`);
      const data = await res.json();
      if (data.submission) {
        setSubmission({
          ...emptySubmission,
          ...data.submission,
          project_title: data.submission.project_title || "",
          problem_statement: data.submission.problem_statement || "",
          short_description: data.submission.short_description || "",
          our_approach: data.submission.our_approach || "",
          challenges: data.submission.challenges || "",
          tech_stack: data.submission.tech_stack || "",
          github_link: data.submission.github_link || "",
          live_demo_link: data.submission.live_demo_link || "",
          youtube_link: data.submission.youtube_link || "",
          screenshots: data.submission.screenshots || [],
          logo_url: data.submission.logo_url || "",
        });
        setHasExisting(true);
        setViewMode(true);
      }
      setIsLocked(data.isLocked);
    } catch {
      // silent fail
    }
  }, [session]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  // Auth handlers
  const handleSignup = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, email, inviteCode, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }
      localStorage.setItem("cb_session", JSON.stringify(data.team));
      setSession(data.team);
      setMessage({ type: "success", text: "Welcome to the arena!" });
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }
      localStorage.setItem("cb_session", JSON.stringify(data.team));
      setSession(data.team);
      setMessage({ type: "success", text: `Welcome back, ${data.team.team_name}!` });
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cb_session");
    setSession(null);
    setSubmission(emptySubmission);
    setHasExisting(false);
    setMessage(null);
  };

  // Upload handler
  const handleImageUpload = (file: File, type: "screenshot" | "logo"): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!session) { resolve(null); return; }
      
      const setLoader = type === "screenshot" ? setUploadingScreenshot : setUploadingLogo;
      const setProgress = type === "screenshot" ? setUploadProgressScreenshot : setUploadProgressLogo;
      
      setLoader(true);
      setProgress(0);
      
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("teamId", session.id);
      formData.append("type", type);
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setProgress(percentCompleted);
        }
      });
      
      xhr.addEventListener("load", () => {
        setLoader(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data.url);
          } catch (e) {
            setMessage({ type: "error", text: "Invalid response from server" });
            resolve(null);
          }
        } else {
          try {
            const data = JSON.parse(xhr.responseText);
            setMessage({ type: "error", text: data.error || "Upload failed." });
          } catch (e) {
            setMessage({ type: "error", text: "Upload failed." });
          }
          resolve(null);
        }
      });
      
      xhr.addEventListener("error", () => {
        setLoader(false);
        setMessage({ type: "error", text: "Upload failed due to network error." });
        resolve(null);
      });
      
      xhr.open("POST", "/api/upload", true);
      xhr.send(formData);
    });
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (submission.screenshots.length + files.length > 4) {
      setMessage({ type: "error", text: "Maximum 4 screenshots allowed." });
      return;
    }
    for (const file of Array.from(files)) {
      const url = await handleImageUpload(file, "screenshot");
      if (url) {
        setSubmission((prev) => ({
          ...prev,
          screenshots: [...prev.screenshots, url],
        }));
      }
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handleImageUpload(file, "logo");
    if (url) {
      setSubmission((prev) => ({ ...prev, logo_url: url }));
    }
  };

  const removeScreenshot = (index: number) => {
    setSubmission((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!session || isLocked) return;
    
    // URL Validation
    if (submission.github_link && !isValidUrl(submission.github_link)) {
      setMessage({ type: "error", text: "Please enter a valid URL for GitHub Repo (must include http:// or https://)." });
      return;
    }
    if (submission.live_demo_link && !isValidUrl(submission.live_demo_link)) {
      setMessage({ type: "error", text: "Please enter a valid URL for Live Demo (must include http:// or https://)." });
      return;
    }
    if (submission.youtube_link && !isValidUrl(submission.youtube_link)) {
      setMessage({ type: "error", text: "Please enter a valid URL for YouTube Video (must include http:// or https://)." });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: session.id,
          projectTitle: submission.project_title,
          problemStatement: submission.problem_statement,
          shortDescription: submission.short_description,
          ourApproach: submission.our_approach,
          challenges: submission.challenges,
          techStack: submission.tech_stack,
          githubLink: submission.github_link,
          liveDemoLink: submission.live_demo_link,
          youtubeLink: submission.youtube_link,
          screenshots: submission.screenshots,
          logoUrl: submission.logo_url,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }
      setHasExisting(true);
      setViewMode(true);
      setMessage({
        type: "success",
        text: data.updated
          ? "Submission updated successfully!"
          : "Project submitted successfully!",
      });
    } catch {
      setMessage({ type: "error", text: "Submission failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  //  RENDER: Auth Screen (Login / Signup)
  // ============================================
  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ backgroundImage: "var(--paper-grain)" }}>
        {/* Top Bar */}
        <div className="w-full border-b-2 border-black bg-[#FF4D00] px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-display font-black text-white text-sm md:text-base uppercase tracking-widest flex items-center gap-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Site
            </Link>
            <span className="font-mono text-[10px] md:text-xs text-white/80 font-bold uppercase tracking-widest">Crazy Build 2026</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 border-4 border-black translate-x-3 translate-y-3 bg-[#0055FF]/10"></div>

            <div className="relative bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#1a1a1a]">
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 bg-[#FFB800]/80 -rotate-2 border border-black/10"></div>

              <div className="pt-4">
                <h1 className="font-display font-black text-2xl md:text-3xl uppercase tracking-widest text-center text-[#0A1128] mb-1">
                  {authMode === "signup" ? "Join Arena" : "Enter Arena"}
                </h1>
                <p className="font-mono text-[10px] md:text-xs text-center text-gray-500 uppercase tracking-widest font-bold mb-6">
                  Project Submission Portal
                </p>

                {/* Toggle */}
                <div className="flex border-2 border-black mb-6">
                  <button
                    onClick={() => { setAuthMode("login"); setMessage(null); }}
                    className={`flex-1 py-2 font-display font-bold text-xs uppercase tracking-widest transition-all ${authMode === "login" ? "bg-[#0A1128] text-white" : "bg-white text-black hover:bg-gray-50"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setAuthMode("signup"); setMessage(null); }}
                    className={`flex-1 py-2 font-display font-bold text-xs uppercase tracking-widest border-l-2 border-black transition-all ${authMode === "signup" ? "bg-[#0A1128] text-white" : "bg-white text-black hover:bg-gray-50"}`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Message */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`border-2 border-black p-2 mb-4 text-center font-mono text-xs font-bold uppercase ${message.type === "error" ? "bg-[#FF0033]/10 text-[#FF0033]" : "bg-green-50 text-green-700"}`}
                    >
                      {message.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <div className="space-y-3">
                  {authMode === "signup" && (
                    <>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-1">Team Name</label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="Type your team name"
                          className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-1">Invite Code</label>
                        <input
                          type="text"
                          value={inviteCode}
                          onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                          placeholder="e.g. AX7K9P"
                          maxLength={6}
                          className="w-full border-2 border-black px-3 py-2 font-mono text-sm tracking-[0.3em] bg-gray-50 focus:bg-white focus:outline-none focus:shadow-[3px_3px_0_0_#0055FF] transition-shadow uppercase"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-1">Official Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Team Lead Email"
                      className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={authMode === "signup" ? "Create a password (min 6 chars)" : "Your password"}
                      className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20"
                    />
                  </div>

                  <button
                    onClick={authMode === "signup" ? handleSignup : handleLogin}
                    disabled={loading}
                    className="w-full bg-[#FF4D00] text-white font-display font-bold uppercase tracking-widest text-sm py-3 border-2 border-black shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {loading ? "Processing..." : authMode === "signup" ? "Create Account" : "Login"}
                  </button>
                </div>

                <p className="mt-4 text-center font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  {authMode === "signup"
                    ? "Already registered? Switch to Login."
                    : "First time? Switch to Sign Up."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ============================================
  //  RENDER: Submission Form (Authenticated)
  // ============================================
  return (
    <div className="min-h-screen bg-[var(--background)]" style={{ backgroundImage: "var(--paper-grain)" }}>
      {/* Top Bar */}
      <div className="w-full border-b-2 border-black bg-[#0A1128] px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display font-bold text-white/60 text-xs uppercase tracking-widest hover:text-white transition-colors hidden md:block">
              ← Site
            </Link>
            <div className="w-px h-5 bg-white/20 hidden md:block"></div>
            <span className="font-display font-black text-white text-xs md:text-sm uppercase tracking-widest">{session.team_name}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Deadline countdown */}
            <div className={`flex items-center gap-1.5 px-2 py-1 border border-white/20 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider ${isLocked ? "text-[#FF0033] bg-[#FF0033]/10" : "text-[#FFB800]"}`}>
              {isLocked ? <Lock className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              <span>{isLocked ? "LOCKED" : timeLeft}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display font-black text-xl md:text-3xl uppercase tracking-widest text-[#0A1128]">
                {viewMode ? "Project Dashboard" : hasExisting ? "Edit Submission" : "Submit Project"}
              </h1>
              <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
                {viewMode ? "Your team's submission details" : hasExisting ? "Update your project details" : "Fill in your project details"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasExisting && viewMode && !isLocked && (
                <button
                  onClick={() => { setViewMode(false); setMessage(null); }}
                  className="flex items-center gap-2 bg-[#FF4D00] text-white font-display font-bold uppercase text-xs px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#1a1a1a] transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit Project
                </button>
              )}
              {hasExisting && (
                <div className="flex items-center gap-1.5 bg-green-50 border-2 border-black px-3 py-1.5 shadow-[2px_2px_0_0_#1a1a1a]">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-green-700">Submitted</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Locked Banner */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-[#FF0033]/10 border-2 border-[#FF0033] p-4 flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-[#FF0033] shrink-0" />
            <p className="font-mono text-xs font-bold text-[#FF0033] uppercase tracking-wider">
              Submissions are locked. The deadline has passed (July 8, 5:00 PM IST).
            </p>
          </motion.div>
        )}

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 border-2 border-black p-3 font-mono text-xs font-bold uppercase tracking-wider text-center ${message.type === "error" ? "bg-[#FF0033]/10 text-[#FF0033]" : "bg-green-50 text-green-700"}`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        {viewMode ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#1a1a1a] relative">
              <div className="absolute -top-4 right-8 w-16 h-6 bg-[#FF0033]/80 rotate-3 border border-black/10"></div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {submission.logo_url && (
                  <div className="w-24 h-24 shrink-0 border-2 border-black bg-gray-50 relative p-2">
                    <Image src={submission.logo_url} alt="Logo" fill className="object-contain" unoptimized />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="font-display font-black text-2xl md:text-4xl text-[#0A1128] uppercase">{submission.project_title}</h2>
                  <p className="font-mono text-sm font-bold text-[#FF4D00] mt-1">{submission.problem_statement}</p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Description</h3>
                  <p className="font-sans text-sm md:text-base leading-relaxed text-gray-800 bg-gray-50 p-4 border-2 border-black">{submission.short_description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Our Approach</h3>
                    <p className="font-sans text-sm text-gray-800 bg-gray-50 p-4 border-2 border-black whitespace-pre-wrap">{submission.our_approach}</p>
                  </div>
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Challenges We Ran Into</h3>
                    <p className="font-sans text-sm text-gray-800 bg-gray-50 p-4 border-2 border-black whitespace-pre-wrap">{submission.challenges}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {submission.tech_stack.split(',').map((tech, i) => tech.trim() && (
                      <span key={i} className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#0055FF] text-white px-3 py-1 border-2 border-black">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {submission.github_link && (
                      <a href={submission.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-white border-2 border-black px-4 py-2 hover:bg-[#0A1128] hover:text-white transition-colors">
                        <Code2 className="w-4 h-4" /> GitHub Repo
                      </a>
                    )}
                    {submission.live_demo_link && (
                      <a href={submission.live_demo_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-white border-2 border-black px-4 py-2 hover:bg-[#0A1128] hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {submission.youtube_link && (
                      <a href={submission.youtube_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-white border-2 border-black px-4 py-2 hover:bg-[#0A1128] hover:text-white transition-colors">
                        <Video className="w-4 h-4" /> YouTube Video
                      </a>
                    )}
                  </div>
                </div>

                {submission.screenshots.length > 0 && (
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Screenshots</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {submission.screenshots.map((url, i) => (
                        <div key={i} className="relative aspect-video border-2 border-black bg-gray-100 p-1">
                          <Image src={url} alt={`Screenshot ${i + 1}`} fill className="object-cover" unoptimized />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-5">
          {/* Project Title + Problem Statement Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldBlock label="Project Name*" >
              <input
                type="text"
                value={submission.project_title}
                onChange={(e) => setSubmission((p) => ({ ...p, project_title: e.target.value }))}
                disabled={isLocked}
                placeholder="Type your project name"
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 disabled:opacity-50"
              />
            </FieldBlock>
            <FieldBlock label="Problem Statement *" >
              <select
                value={submission.problem_statement}
                onChange={(e) => setSubmission((p) => ({ ...p, problem_statement: e.target.value }))}
                disabled={isLocked}
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 disabled:opacity-50 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select the official Problem Statement</option>
                {PROBLEM_STATEMENTS.map((ps, i) => (
                  <option key={i} value={ps}>{ps}</option>
                ))}
              </select>
            </FieldBlock>
          </div>

          {/* Short Description */}
          <FieldBlock label="Short Description *" hint={`${submission.short_description.length}/300 chars`}>
            <textarea
              value={submission.short_description}
              onChange={(e) => {
                if (e.target.value.length <= 300) setSubmission((p) => ({ ...p, short_description: e.target.value }));
              }}
              disabled={isLocked}
              rows={2}
              placeholder="Brief overview of your project..."
              className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 resize-none disabled:opacity-50"
            />
          </FieldBlock>

          {/* Our Approach + Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldBlock label="Our Approach *" hint="How did you tackle it?">
              <textarea
                value={submission.our_approach}
                onChange={(e) => setSubmission((p) => ({ ...p, our_approach: e.target.value }))}
                disabled={isLocked}
                rows={3}
                placeholder="Describe your approach..."
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 resize-none disabled:opacity-50"
              />
            </FieldBlock>
            <FieldBlock label="Challenges We Ran Into *" hint="What was hard?">
              <textarea
                value={submission.challenges}
                onChange={(e) => setSubmission((p) => ({ ...p, challenges: e.target.value }))}
                disabled={isLocked}
                rows={3}
                placeholder="Describe the challenges..."
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 resize-none disabled:opacity-50"
              />
            </FieldBlock>
          </div>

          {/* Tech Stack */}
          <FieldBlock label="Technology / Tech Stack *" hint="Tools, frameworks, APIs used">
            <input
              type="text"
              value={submission.tech_stack}
              onChange={(e) => setSubmission((p) => ({ ...p, tech_stack: e.target.value }))}
              disabled={isLocked}
              placeholder="e.g. React, Node.js, OpenAI API, MongoDB"
              className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 disabled:opacity-50"
            />
          </FieldBlock>

          {/* Links Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldBlock label="GitHub Repo *" icon={<Code2 className="w-3.5 h-3.5" />}>
              <input
                type="url"
                value={submission.github_link}
                onChange={(e) => setSubmission((p) => ({ ...p, github_link: e.target.value }))}
                disabled={isLocked}
                placeholder="https://github.com/..."
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 disabled:opacity-50"
              />
            </FieldBlock>
            <FieldBlock label="Live Demo" icon={<ExternalLink className="w-3.5 h-3.5" />} optional>
              <input
                type="url"
                value={submission.live_demo_link}
                onChange={(e) => setSubmission((p) => ({ ...p, live_demo_link: e.target.value }))}
                disabled={isLocked}
                placeholder="https://..."
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 disabled:opacity-50"
              />
            </FieldBlock>
            <FieldBlock label="YouTube Video" icon={<Video className="w-3.5 h-3.5" />} optional>
              <input
                type="url"
                value={submission.youtube_link}
                onChange={(e) => setSubmission((p) => ({ ...p, youtube_link: e.target.value }))}
                disabled={isLocked}
                placeholder="https://youtube.com/..."
                className="w-full border-3 border-black px-4 py-3 font-sans text-sm bg-white focus:bg-[#f4f7ff] focus:outline-none shadow-[4px_4px_0_0_#1a1a1a] focus:shadow-[4px_4px_0_0_#0055FF] focus:-translate-y-1 focus:-translate-x-1 transition-all relative z-20 disabled:opacity-50"
              />
            </FieldBlock>
          </div>

          {/* Screenshots + Logo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Screenshots */}
            <div className="md:col-span-2">
              <FieldBlock label={`Screenshots * (${submission.screenshots.length}/4)`} hint="1st image = card preview">
                <div className="grid grid-cols-2 gap-2">
                  {submission.screenshots.map((url, i) => (
                    <div key={i} className="relative border-2 border-black bg-gray-100 aspect-video group overflow-hidden">
                      <Image src={url} alt={`Screenshot ${i + 1}`} fill className="object-cover" sizes="200px" unoptimized />
                      {!isLocked && (
                        <button
                          onClick={() => removeScreenshot(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-[#FF0033] border border-black flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                      {i === 0 && (
                        <span className="absolute bottom-0 left-0 bg-[#FFB800] border-t border-r border-black px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase">Preview</span>
                      )}
                    </div>
                  ))}
                  {submission.screenshots.length < 4 && !isLocked && (
                    <label className="border-2 border-dashed border-black aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" multiple />
                      {uploadingScreenshot ? (
                        <div className="w-full h-full flex flex-col items-center justify-center px-4">
                          <span className="font-mono text-[10px] font-bold text-gray-400 uppercase mb-2">Uploading {uploadProgressScreenshot}%</span>
                          <div className="w-full h-2 bg-gray-200 border-2 border-black">
                            <div className="h-full bg-[#FF4D00] transition-all duration-200" style={{ width: `${uploadProgressScreenshot}%` }}></div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <ImagePlus className="w-5 h-5 text-gray-400 mb-1" />
                          <span className="font-mono text-[9px] font-bold text-gray-400 uppercase">Add Image</span>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </FieldBlock>
            </div>

            {/* Logo */}
            <FieldBlock label="Logo" optional>
              {submission.logo_url ? (
                <div className="relative border-2 border-black bg-gray-100 aspect-square w-full max-w-[120px] group overflow-hidden">
                  <Image src={submission.logo_url} alt="Logo" fill className="object-contain p-2" sizes="120px" unoptimized />
                  {!isLocked && (
                    <button
                      onClick={() => setSubmission((p) => ({ ...p, logo_url: "" }))}
                      className="absolute top-1 right-1 w-5 h-5 bg-[#FF0033] border border-black flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ) : !isLocked ? (
                <label className="border-2 border-dashed border-black aspect-square w-full max-w-[120px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  {uploadingLogo ? (
                        <div className="w-full h-full flex flex-col items-center justify-center px-2">
                          <span className="font-mono text-[10px] font-bold text-gray-400 uppercase mb-2">{uploadProgressLogo}%</span>
                          <div className="w-full h-1.5 bg-gray-200 border border-black">
                            <div className="h-full bg-[#FF4D00] transition-all duration-200" style={{ width: `${uploadProgressLogo}%` }}></div>
                          </div>
                        </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="font-mono text-[9px] font-bold text-gray-400 uppercase">Upload</span>
                    </>
                  )}
                </label>
              ) : (
                <div className="border-2 border-dashed border-black/20 aspect-square w-full max-w-[120px] flex items-center justify-center">
                  <span className="font-mono text-[10px] text-gray-300 uppercase">No logo</span>
                </div>
              )}
            </FieldBlock>
          </div>

          {/* Submit Button */}
          {!isLocked && (
            <div className="pt-2 pb-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading || uploadingScreenshot || uploadingLogo}
                className="flex-1 bg-[#FF4D00] text-white font-display font-black uppercase tracking-widest text-sm md:text-base py-4 border-3 border-black shadow-[6px_6px_0_0_#1a1a1a] hover:shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Submitting..."
                ) : hasExisting ? (
                  <>
                    <Check className="w-4 h-4" /> Update Submission
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Submit Project
                  </>
                )}
              </button>
              {hasExisting && (
                <button
                  onClick={() => { setViewMode(true); setMessage(null); fetchSubmission(); }}
                  disabled={loading || uploadingScreenshot || uploadingLogo}
                  className="sm:w-48 bg-white text-[#0A1128] font-display font-black uppercase tracking-widest text-sm py-4 border-3 border-black shadow-[6px_6px_0_0_#1a1a1a] hover:shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================
//  Field Block Component
// ============================================
function FieldBlock({
  label,
  hint,
  icon,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group mb-2">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-[#FF4D00] border-2 border-black p-0.5 bg-white shadow-[2px_2px_0_0_#1a1a1a]">{icon}</span>}
        <label className="font-display text-[11px] md:text-xs uppercase tracking-widest font-black text-[#0A1128] bg-[#FFB800] px-2.5 py-1 border-2 border-black -rotate-1 group-hover:rotate-0 transition-all shadow-[2px_2px_0_0_#1a1a1a] z-10">
          {label}
        </label>
        {optional && <span className="font-mono text-[9px] text-gray-500 uppercase font-bold bg-white border-2 border-dashed border-gray-300 px-1">(optional)</span>}
      </div>
      {children}
      {hint && <p className="font-mono text-[9px] font-bold text-gray-500 mt-2 bg-white inline-block px-1.5 py-0.5 border border-dashed border-gray-300">{hint}</p>}
    </div>
  );
}
