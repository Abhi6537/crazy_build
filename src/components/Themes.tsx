"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Reusing the exact text from the user prompt
const themesData = [
  {
    id: 1,
    title: "Talking Rabbitt – AI Powered Business Intelligence Dashboard",
    domain: "Business Intelligence | Enterprise AI | Analytics",
    problemLabel: "Problem Statement",
    problemText: `Modern companies heavily rely on dashboards, Excel sheets, and reports to monitor business performance.
However, most dashboards:
● only display static charts,
● lack intelligent recommendations,
● cannot converse naturally,
● and fail to generate actionable business insights.

Management teams struggle to:
● identify patterns quickly,
● understand why metrics changed,
● and make fast data-driven decisions.`,
    challenge: `Build an AI-powered “Talking Dashboard” capable of:
● analyzing Excel/CSV business data,
● generating intelligent dashboards,
● understanding user queries,
● and responding conversationally using AI.`,
    workflow: [
      { step: "Step 1 – Data Ingestion Agent", desc: "● Upload Excel/CSV datasets\n● Clean and preprocess data\n● Categorize structured/unstructured information" },
      { step: "Step 2 – Analytics Agent", desc: "● Detect trends & anomalies\n● Identify underperforming regions/products\n● Compare growth metrics" },
      { step: "Step 3 – Conversational AI Agent", desc: "User asks:\n● “Why did sales drop?”\n● “Which category performed best?”\n● “Which campaign generated highest ROI?”\n\nThe AI:\n● interprets the query,\n● analyzes relevant data,\n● and generates visual + conversational responses." },
      { step: "Step 4 – Recommendation Agent", desc: "The AI should:\n● suggest new offers,\n● predict future performance,\n● and recommend business improvements." },
      { step: "Step 5 – Visualization Agent", desc: "Generate:\n● graphs,\n● charts,\n● KPI dashboards,\n● heatmaps,\n● and performance summaries dynamically." }
    ],
    features: "● Voice/Text interaction\n● AI-generated insights\n● Real-time dashboards\n● Trend forecasting\n● Recommendation engine\n● Conversational analytics assistant",
    accent: "#FF0033"
  },
  {
    id: 2,
    title: "AI-Powered Personal Brand Marketing Engine",
    domain: "Creator Economy | AI Marketing | Personal Branding",
    problemLabel: "Context",
    problemText: `In today’s creator and professional economy, personal branding has become one of the biggest drivers of:
● career growth,
● networking,
● startup visibility,
● audience building,
● and professional opportunities.

However, most individuals:
● struggle to stay consistent online,
● don’t know what content to post,
● fail to understand audience behavior,
● and cannot optimize their presence across platforms like LinkedIn, Instagram, X, and YouTube.

As a result, talented individuals fail to build visibility and authority online.`,
    challenge: `Build an AI-powered Personal Brand Marketing Engine that:
● automates content planning,
● analyzes audience behavior,
● generates personalized content,
● and manages multi-platform posting intelligently.`,
    workflow: [
      { step: "Step 1 – Profile Analysis Agent", desc: "The AI analyzes:\n● user profile,\n● niche,\n● industry,\n● posting history,\n● audience type,\n● and engagement patterns." },
      { step: "Step 2 – Calendar Intelligence Agent", desc: "The AI connects with:\n● Google Calendar,\n● meeting schedules,\n● events,\n● webinars,\n● launches,\n● and activities.\n\nThe system identifies:\n● what the user is doing,\n● what should be posted,\n● and when engagement opportunities exist.\n\nExample:\n● Meeting with startup founder → generate LinkedIn post idea\n● Speaking at event → suggest Twitter/X thread\n● Product launch → create Instagram content" },
      { step: "Step 3 – Content Generation Agent", desc: "The AI automatically:\n● generates captions,\n● creates post ideas,\n● generates hooks,\n● suggests hashtags,\n● creates multi-platform content versions." },
      { step: "Step 4 – Automation & Publishing Agent", desc: "The system should:\n● schedule posts,\n● automate posting,\n● generate reminders/popups,\n● optimize posting times,\n● and track engagement." },
      { step: "Step 5 – Engagement Intelligence Agent", desc: "The AI:\n● predicts engagement,\n● identifies best-performing content,\n● suggests future strategies,\n● and tracks audience growth." }
    ],
    features: "● AI content generation\n● LinkedIn/Instagram/X integrations\n● Calendar-based automation\n● Smart posting reminders\n● Audience analytics dashboard\n● Multi-platform optimization\n● Automated scheduling system",
    whatToDo: "● Build intelligent automation workflows\n● Focus on creator productivity\n● Use AI for personalization\n● Make the platform scalable\n● Prioritize user experience",
    whatNotToDo: "● Avoid spam automation\n● Avoid fake engagement systems\n● Avoid unethical scraping\n● Avoid purely template-based posting\n● Do not copy existing tools directly",
    accent: "#0055FF"
  },
  {
    id: 3,
    title: "AI Competitor Strategy Analyzer",
    domain: "Marketing Intelligence | D2C | Business Strategy",
    problemLabel: "Problem Statement",
    problemText: `Marketing teams spend huge amounts of time manually analyzing:
● competitor ads,
● campaigns,
● content strategies,
● pricing,
● audience engagement,
● and market positioning.

Most startups lack systems that can automatically:
● track competitors,
● generate strategic insights,
● and recommend business actions.`,
    challenge: `Build an AI-powered Competitor Intelligence System using Agentic AI workflows.`,
    workflow: [
      { step: "Step 1 – Competitor Tracking Agent", desc: "The AI automatically tracks:\n● competitor websites,\n● ads,\n● social media posts,\n● campaigns,\n● and product launches." },
      { step: "Step 2 – Data Intelligence Agent", desc: "Analyze:\n● engagement metrics,\n● ad frequency,\n● content styles,\n● pricing changes,\n● audience reactions,\n● and campaign performance patterns." },
      { step: "Step 3 – Strategic Analysis Agent", desc: "The AI identifies:\n● what is working,\n● why campaigns are succeeding,\n● what trends are emerging,\n● and where opportunities exist." },
      { step: "Step 4 – Recommendation Agent", desc: "The system generates:\n● counter-campaign ideas,\n● positioning strategies,\n● pricing recommendations,\n● and content opportunities." },
      { step: "Step 5 – Market Prediction Agent", desc: "Predict:\n● upcoming trends,\n● viral formats,\n● audience shifts,\n● and competitor growth patterns." }
    ],
    features: "● Competitor tracking dashboard\n● AI campaign analyzer\n● Strategy recommendation engine\n● Trend prediction system\n● Market intelligence assistant\n● Agentic automation workflows",
    accent: "#FF4D00"
  },
  {
    id: 4,
    title: "Signals Harvesting Engine – Agentic AI Workflow System",
    domain: "Lead Intelligence | AI Automation | Sales Intelligence",
    problemLabel: "Problem Statement",
    problemText: `Businesses lose opportunities because they fail to capture and analyze buying signals, hiring signals, creator signals, market shifts, and business intent data in real-time.

Sales and growth teams manually monitor:
● LinkedIn activities,
● funding announcements,
● hiring posts,
● social signals,
● website changes,
● and engagement patterns.

This process is extremely inefficient.`,
    challenge: `Build an AI-powered Signals Harvesting Engine that:
● captures business signals automatically,
● analyzes intent,
● prioritizes opportunities,
● and triggers automated workflows.`,
    workflow: [
      { step: "Step 1 – Signal Collection Agent", desc: "Collect signals from:\n● LinkedIn,\n● Twitter/X,\n● websites,\n● job portals,\n● funding news,\n● and social activity." },
      { step: "Step 2 – Intent Analysis Agent", desc: "The AI identifies:\n● hiring intent,\n● buying intent,\n● partnership opportunities,\n● creator collaborations,\n● and business expansion signals." },
      { step: "Step 3 – Prioritization Agent", desc: "The system scores:\n● lead quality,\n● urgency,\n● engagement level,\n● and conversion potential." },
      { step: "Step 4 – Automation Agent", desc: "Automatically:\n● send outreach emails,\n● generate follow-up reminders,\n● create CRM entries,\n● and trigger workflows." },
      { step: "Step 5 – Intelligence Dashboard", desc: "Generate:\n● lead intelligence dashboards,\n● opportunity heatmaps,\n● and conversion analytics." }
    ],
    features: "● Signal monitoring system\n● AI lead scoring\n● Automated workflows\n● CRM integrations\n● Opportunity intelligence dashboard\n● Agentic automation pipeline",
    accent: "#00CC44"
  },
  {
    id: 5,
    title: "Agentic AI HRMS & Hiring Automation Platform",
    domain: "HRTech | Enterprise Automation | AI Agents",
    problemLabel: "Problem Statement",
    problemText: `Modern HR teams spend massive amounts of time managing repetitive and operational tasks such as:
● resume screening,
● employee onboarding,
● leave approvals,
● payroll processing,
● attendance tracking,
● employee support queries,
● interview scheduling,
● and HR documentation.

Most HR systems still rely heavily on manual workflows, causing:
● delayed hiring,
● payroll inefficiencies,
● poor employee experience,
● operational overhead,
● and lack of intelligent decision-making.

Companies need an AI-first HRMS platform capable of automating the complete employee lifecycle using intelligent agentic workflows.`,
    challenge: `Build an Agentic AI-powered HRMS & Hiring Automation Platform that can:
● automate recruitment workflows,
● conduct first-stage AI interviews,
● manage payroll systems,
● automate leave management,
● handle employee support,
● and provide conversational HR assistance.

The platform should function as a fully automated AI HR ecosystem for modern organizations.`,
    workflow: [
      { step: "Step 1 – Resume Intelligence Agent", desc: "The AI should:\n● parse resumes automatically,\n● extract skills and experience,\n● analyze role compatibility,\n● and rank candidates intelligently." },
      { step: "Step 2 – AI Hiring Agent", desc: "The system should:\n● conduct first-stage AI interviews,\n● ask dynamic role-based questions,\n● evaluate candidate responses,\n● generate interview summaries,\n● and recommend shortlisted candidates.\n\nThe AI interview system may support:\n● voice interaction,\n● conversational AI,\n● video/audio analysis,\n● and communication scoring." },
      { step: "Step 3 – Employee Onboarding Agent", desc: "Once shortlisted:\n● automate onboarding workflows,\n● generate employee documentation,\n● assign onboarding tasks,\n● and guide employees conversationally." },
      { step: "Step 4 – Payroll Management Agent", desc: "The AI should automate:\n● salary calculations,\n● bonus/incentive calculations,\n● attendance-linked payroll,\n● tax deductions,\n● payroll reports,\n● and monthly payroll processing.\n\nThe system should also:\n● identify payroll anomalies,\n● detect attendance mismatches,\n● and generate salary insights." },
      { step: "Step 5 – Leave Management Agent", desc: "The platform should:\n● automate leave requests & approvals,\n● track leave balances,\n● predict leave trends,\n● notify managers automatically,\n● and manage attendance workflows intelligently.\n\nThe AI should also:\n● identify abnormal leave patterns,\n● forecast workforce availability,\n● and generate HR insights." },
      { step: "Step 6 – Employee Support Agent", desc: "The AI assistant should answer:\n● HR policy queries,\n● leave-related questions,\n● payroll queries,\n● onboarding support requests,\n● and company process questions conversationally." },
      { step: "Step 7 – HR Intelligence Dashboard", desc: "Generate:\n● hiring analytics,\n● employee productivity insights,\n● payroll dashboards,\n● leave analytics,\n● attendance trends,\n● and workforce intelligence reports." }
    ],
    features: "● Resume Parsing Engine\n● AI Candidate Ranking\n● AI First-Round Interview System\n● Payroll Automation\n● Leave Management System\n● Attendance Intelligence\n● Conversational HR Assistant\n● Employee Analytics Dashboard\n● Workflow Automation Engine\n● AI-driven HR Insights",
    whatToFocusOn: "● End-to-end HR automation\n● Agentic AI workflows\n● Conversational HR systems\n● Enterprise scalability\n● Smart workflow automation\n● User-friendly dashboard experience",
    finalGoal: "The objective is to build a fully automated AI-powered HR ecosystem capable of managing:\n● hiring,\n● onboarding,\n● payroll,\n● employee support,\n● leave management,\n● and workforce operations\nthrough intelligent agentic AI systems and automation workflows",
    accent: "#8000FF"
  }
];

export default function Themes() {
  const [openTheme, setOpenTheme] = useState<number | null>(null);

  useEffect(() => {
    if (openTheme !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [openTheme]);

  const activeTheme = themesData.find(t => t.id === openTheme);

  return (
    <>
      <section id="themes" className="py-12 md:py-16 relative overflow-hidden border-y-2 border-black">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col md:flex-row gap-8">
          
          {/* Left Side: THEMES Title */}
          <div className="w-full md:w-32 flex flex-col md:flex-row items-center justify-between md:justify-center border-b-2 md:border-b-0 md:border-r-2 border-black pb-4 md:pb-0 pr-0 md:pr-4">
            
            {/* Mobile Title */}
            <div className="md:hidden flex flex-col text-center w-full">
              <h2 className="font-display font-black text-xl uppercase leading-none tracking-widest">Themes</h2>
              <span className="font-sans font-bold uppercase text-sm tracking-widest text-gray-500 mt-1">Problem Statements</span>
            </div>

            {/* Desktop Vertical Layout */}
            <div className="hidden md:flex flex-row items-center justify-center gap-6 h-full">
               {/* T H E M E S stacked vertically */}
               <div className="flex flex-col font-display font-black text-6xl leading-[1.1] text-black uppercase text-center gap-4">
                 <span className="h-12 flex items-center justify-center">T</span>
                 <span className="h-12 flex items-center justify-center">H</span>
                 <span className="h-12 flex items-center justify-center">E</span>
                 <span className="h-12 flex items-center justify-center">M</span>
                 <span className="h-12 flex items-center justify-center">E</span>
                 <span className="h-12 flex items-center justify-center">S</span>
               </div>
               
               {/* PROBLEM STATEMENTS rotated */}
               <div className="font-sans text-sm font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                 PROBLEM STATEMENTS
               </div>
            </div>
          </div>

          {/* Right Side: Pick Your Mission Box & Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            {/* Creative Box Background/Border Elements */}
            <div className="absolute inset-0 border-4 border-black transform translate-x-3 translate-y-3 bg-gray-100/50"></div>
            <div className="absolute inset-0 border-4 border-black transform -rotate-1 pointer-events-none"></div>
            
            <div className="relative border-4 border-black p-5 md:p-10 bg-white z-10">
              
              {/* Tape Doodle */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-yellow-200/80 -rotate-2 mix-blend-multiply border border-black/10"></div>
              
              <div className="border-b-4 border-black pb-4 mb-8 relative flex flex-col md:flex-row md:items-end justify-between gap-4">
                <h3 className="font-display font-black text-xl md:text-3xl uppercase z-10 shrink-0">
                  Pick Your Mission
                </h3>
                
                {/* Creative Animated Text */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mb-1"
                >
                  <span className="hidden md:inline-block w-8 md:w-16 h-[2px] bg-gray-300"></span>
                  <span>Click a card to decrypt intel</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-[#FF0033]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </motion.div>
                </motion.div>
              </div>

            {/* Grid for Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 md:gap-6">
              {themesData.map((theme, i) => {
                let colSpanClass = "col-span-1 md:col-span-2";
                if (i === 3) colSpanClass = "col-span-1 md:col-start-2 md:col-span-2"; // 4th item centered
                if (i === 4) colSpanClass = "col-span-1 md:col-span-2"; // 5th item next to 4th

                return (
                  <motion.button 
                    key={theme.id}
                    onClick={() => setOpenTheme(theme.id)}
                    whileHover={{ scale: 1.03, y: -4, rotate: i % 2 === 0 ? 1 : -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ '--accent-color': theme.accent } as React.CSSProperties}
                    className={`${colSpanClass} p-3 md:p-5 border-2 md:border-[3px] border-black shadow-[3px_3px_0_0_#1a1a1a] md:shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[6px_6px_0_0_var(--accent-color)] md:hover:shadow-[8px_8px_0_0_var(--accent-color)] transition-all group text-left flex flex-col justify-between min-h-[90px] md:min-h-[180px] relative overflow-hidden`}
                  >
                    {/* Default minimal background tint & Hover tint */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: theme.accent }}></div>
                    
                    {/* SVG Doodle Background per card */}
                    <svg className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:rotate-12" style={{ color: theme.accent }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      {i % 3 === 0 && <path d="M20,50 L80,50 M50,20 L50,80 M30,30 L70,70 M30,70 L70,30" />}
                      {i % 3 === 1 && <circle cx="50" cy="50" r="40" strokeDasharray="10 10" />}
                      {i % 3 === 2 && <path d="M10,90 Q50,10 90,90 T10,90" />}
                    </svg>

                    <div className="relative z-10">
                      <span className="font-mono text-[9px] md:text-xs font-bold text-gray-700 group-hover:text-black transition-colors block mb-1.5 md:mb-3 border-b-2 border-black/20 pb-0.5 md:pb-1 w-full flex justify-between">
                        <span>MISSION {theme.id}</span>
                        <span style={{ color: theme.accent }}>■</span>
                      </span>
                      <h4 className="font-display font-black text-sm md:text-2xl uppercase leading-tight group-hover:text-[var(--accent-color)] transition-colors pr-8 md:pr-0 mt-1 md:mt-0">
                        {theme.title}
                      </h4>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal / Dossier */}
      <AnimatePresence>
        {openTheme !== null && activeTheme && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenTheme(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ borderTopColor: activeTheme.accent }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white border-4 border-t-8 border-black shadow-[12px_12px_0_0_#1a1a1a] overflow-y-auto flex flex-col"
            >
              
              <button 
                onClick={() => setOpenTheme(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-white text-black hover:bg-black hover:text-white transition-colors border-2 border-black"
              >
                <X size={24} />
              </button>

              <div className="p-6 md:p-8 border-b-4 border-black bg-gray-50 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 opacity-5" style={{ backgroundColor: activeTheme.accent, borderRadius: '50%' }}></div>
                <span className="font-mono text-sm font-bold tracking-widest uppercase text-gray-500 block mb-2 relative z-10">
                  {activeTheme.domain}
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter leading-tight pr-10 relative z-10" style={{ color: activeTheme.accent }}>
                  {activeTheme.title}
                </h2>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-8 font-sans">
                
                <div>
                  <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">{activeTheme.problemLabel}</h3>
                  <div className="whitespace-pre-line text-sm md:text-base text-gray-800 leading-relaxed border-l-4 border-gray-200 pl-4 py-1">
                    {activeTheme.problemText}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">Challenge</h3>
                  <div className="whitespace-pre-line text-sm md:text-base font-bold text-black leading-relaxed border-l-4 border-black pl-4 py-1 bg-gray-50">
                    {activeTheme.challenge}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">Agentic AI Workflow</h3>
                  <div className="flex flex-col gap-4">
                    {activeTheme.workflow.map((flow, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_#1a1a1a] hover:shadow-[4px_4px_0_0_#1a1a1a] transition-shadow"
                      >
                        <h4 className="font-bold text-sm uppercase mb-2 bg-black text-white inline-block px-2 py-0.5">{flow.step}</h4>
                        <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed mt-2">
                          {flow.desc}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">Expected Features</h3>
                  <div className="whitespace-pre-line text-sm md:text-base text-gray-800 leading-relaxed bg-gray-50 border-2 border-black p-4">
                    {activeTheme.features}
                  </div>
                </div>

                {activeTheme.whatToDo && (
                  <div>
                    <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">What To Do</h3>
                    <div className="whitespace-pre-line text-sm md:text-base text-gray-800 leading-relaxed">
                      {activeTheme.whatToDo}
                    </div>
                  </div>
                )}
                {activeTheme.whatNotToDo && (
                  <div>
                    <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">What NOT To Do</h3>
                    <div className="whitespace-pre-line text-sm md:text-base text-gray-800 leading-relaxed text-red-600">
                      {activeTheme.whatNotToDo}
                    </div>
                  </div>
                )}
                {activeTheme.whatToFocusOn && (
                  <div>
                    <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">What To Focus On</h3>
                    <div className="whitespace-pre-line text-sm md:text-base text-gray-800 leading-relaxed">
                      {activeTheme.whatToFocusOn}
                    </div>
                  </div>
                )}
                {activeTheme.finalGoal && (
                  <div>
                    <h3 className="font-bold text-lg uppercase border-b-2 border-black mb-3 inline-block pr-4">Final Goal</h3>
                    <div className="whitespace-pre-line text-sm md:text-base font-bold text-white bg-black p-4 leading-relaxed shadow-[4px_4px_0_0_var(--accent-color)]" style={{ '--accent-color': activeTheme.accent } as React.CSSProperties}>
                      {activeTheme.finalGoal}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
