"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Team Composition",
      description: (
        <ul className="list-disc pl-4 space-y-0.5 font-sans text-[10px] md:text-xs text-white/80">
          <li>Each team must consist of 3–4 members</li>
          <li>Teams should maintain a balance of:
            <ul className="list-[circle] pl-5 mt-0.5 space-y-0.5 text-white/70">
              <li>AI/Technical Skills</li>
              <li>Design/UI Skills</li>
              <li>Business & Strategy Thinking</li>
            </ul>
          </li>
        </ul>
      ),
      color: "bg-[#0055FF]"
    },
    {
      title: "Deliverables",
      description: (
        <div className="font-sans text-[10px] md:text-xs text-white/80">
          <p className="mb-1">Each team is required to submit:</p>
          <ol className="list-decimal pl-4 space-y-0.5">
            <li>Working Prototype / Functional Demo</li>
            <li>Project Documentation</li>
            <li>AI Workflow & System Architecture</li>
            <li>Pitch Deck (10–12 Slides)</li>
            <li>Final Startup-Style Presentation</li>
          </ol>
        </div>
      ),
      color: "bg-[#FF0033]"
    },
    {
      title: "Evaluation Criteria",
      description: (
        <div className="font-sans text-[8px] md:text-[10px] text-white/80 leading-tight">
          <div className="grid grid-cols-4 gap-1 border-b border-white/20 pb-0.5 mb-0.5 font-bold text-white">
            <div className="col-span-3">Parameter</div>
            <div className="text-right">Weightage</div>
          </div>
          <div className="grid grid-cols-4 gap-1 py-0"><div className="col-span-3 truncate">Innovation & Idea Clarity</div><div className="text-right">20%</div></div>
          <div className="grid grid-cols-4 gap-1 py-0"><div className="col-span-3 truncate">Technical Implementation</div><div className="text-right">25%</div></div>
          <div className="grid grid-cols-4 gap-1 py-0"><div className="col-span-3 truncate">AI & Agentic Workflow</div><div className="text-right">20%</div></div>
          <div className="grid grid-cols-4 gap-1 py-0"><div className="col-span-3 truncate">UI/UX & Product Design</div><div className="text-right">15%</div></div>
          <div className="grid grid-cols-4 gap-1 py-0"><div className="col-span-3 truncate">Scalability & Business</div><div className="text-right">10%</div></div>
          <div className="grid grid-cols-4 gap-1 py-0"><div className="col-span-3 truncate">Presentation & Comms</div><div className="text-right">10%</div></div>
        </div>
      ),
      color: "bg-[#8A2BE2]"
    },
    {
      title: "Industry-Backed",
      description: <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed max-w-sm">Co-created with <a href="https://rabbitt.ai/" target="_blank" rel="noopener noreferrer" className="text-[#FF4D00] hover:underline font-bold">Rabbitt AI</a>, bringing real-world problem statements, expert mentorship and industry-grade evaluation.</p>,
      color: "bg-[#FF4D00]"
    }
  ];

  const stats = [
    { value: "3-4", label: "Members", sub: "in each Team", color: "text-[#0055FF]", bg: "bg-white" },
    { value: "8 hrs.", label: "", sub: "Internal Hackathon", color: "text-[#FF0033]", bg: "bg-[#f9f8f6]" },
    { value: "1:1", label: "Collab", sub: <>Powered by <a href="https://rabbitt.ai/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-black">Rabbitt AI</a></>, color: "text-[#8A2BE2]", bg: "bg-white" },
    { value: "Multi", label: "Challenges", sub: "Themed problem tracks", color: "text-[#FF4D00]", bg: "bg-[#f9f8f6]" },
  ];

  // Auto-slide removed per user request

  return (
    <section id="about" className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row gap-6 relative">
        
        {/* Main Content Area (Left 90%) */}
        <div className="w-full lg:w-11/12 flex flex-col gap-6">
          
          {/* Top Intro Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl"
          >
            <div className="mb-4 md:mb-6 lg:hidden">
              <h2 className="font-display font-black text-2xl md:text-4xl uppercase tracking-widest text-[#0A1128] inline-block border-b-4 border-[#FF4D00] pb-1">
                About
              </h2>
            </div>
            <p className="text-sm md:text-xl lg:text-2xl font-sans font-medium leading-snug md:leading-relaxed text-[#0A1128]">
              <span className="font-display font-black text-white text-base md:text-2xl lg:text-3xl uppercase bg-[#FF4D00] border-[2px] md:border-[3px] border-black px-2 py-0.5 md:px-3 md:py-1 mr-2 md:mr-3 inline-block shadow-[2px_2px_0_0_#1a1a1a] md:shadow-[3px_3px_0_0_#1a1a1a]">CRAZY-BUILD</span>
              is an innovation-driven 8-hour internal hackathon organized by the Coding Club JISCE, hosted at JIS College of Engineering in collaboration with <a href="https://rabbitt.ai/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0055FF] font-bold">Rabbitt AI</a>. Bringing together builders, designers, developers, and innovators, the event challenges student teams to transform bold ideas into working prototypes by solving real-world problems through technology, AI, design, and product thinking all within a single day.
            </p>
          </motion.div>

          {/* Bottom Split: 4 Stacked Boxes (Left) + 1 Big Box (Right) */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            
            {/* 4 Stats Boxes */}
            <div className="w-full md:w-5/12 grid grid-cols-2 md:flex md:flex-col justify-between gap-3">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 md:p-3 border-[3px] border-black shadow-[3px_3px_0_0_#1a1a1a] cursor-pointer ${stat.bg} transition-all duration-200 z-10 hover:z-20`}
                >
                  <div className={`font-display font-black text-xl md:text-2xl lg:text-3xl tracking-tighter ${stat.color} w-full md:w-1/2 mb-1 md:mb-0`}>
                    {stat.value}
                  </div>
                  <div className="w-full md:w-1/2 text-left md:text-right">
                    <div className="font-display font-bold text-[11px] md:text-sm lg:text-base uppercase text-black leading-tight">
                      {stat.label}
                    </div>
                    <div className="font-sans text-[9px] md:text-[10px] font-medium text-black/60 mt-0.5 leading-tight">
                      {stat.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 1 Large Feature Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-7/12 h-full relative bg-[#0A1128] border-[3px] border-black shadow-[6px_6px_0_0_#FF4D00] p-3 md:p-6 flex flex-col justify-between overflow-hidden transition-transform duration-300"
            >
              {/* Terminal/Window Header dots */}
              <div className="flex gap-1.5 mb-2 md:mb-4 relative z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF0033] border border-black"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800] border border-black"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E0FF] border border-black"></div>
              </div>

              {/* Animated Feature Content */}
              <div className="flex-grow relative z-20 flex flex-col justify-center min-h-[140px] md:min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`inline-block px-2 py-0.5 text-white font-bold uppercase tracking-widest text-[10px] mb-3 border border-white/20 shadow-[1px_1px_0_0_#fff] ${features[activeFeature].color}`}>
                      General Instructions
                    </div>
                    <h3 className="font-display font-black text-xl md:text-3xl text-white mb-1.5 md:mb-2 leading-tight">
                      {features[activeFeature].title}
                    </h3>
                    <div className="w-full max-w-sm">
                      {features[activeFeature].description}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-4 relative z-20">
                {/* Interactive Progress Indicators */}
                <div className="flex gap-2">
                  {features.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeature(idx)}
                      className={`h-1.5 transition-all duration-300 border border-black ${idx === activeFeature ? 'w-10 bg-[#00E0FF] shadow-[1px_1px_0_0_#fff]' : 'w-2.5 bg-white/20 hover:bg-white/50'}`}
                      aria-label={`View feature ${idx + 1}`}
                    />
                  ))}
                </div>
                
                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveFeature((prev) => (prev - 1 + features.length) % features.length)}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#00E0FF] hover:text-black border border-white/20 hover:border-black text-white transition-colors font-bold shadow-[2px_2px_0_0_transparent] hover:shadow-[2px_2px_0_0_#fff]"
                    aria-label="Previous feature"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setActiveFeature((prev) => (prev + 1) % features.length)}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#00E0FF] hover:text-black border border-white/20 hover:border-black text-white transition-colors font-bold shadow-[2px_2px_0_0_transparent] hover:shadow-[2px_2px_0_0_#fff]"
                    aria-label="Next feature"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Background abstract shape */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none z-0"></div>
            </motion.div>

          </div>
        </div>

        {/* Vertical ABOUT (Right 10%) - Mobile hidden */}
        <div className="hidden lg:flex w-1/12 items-stretch justify-end relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center border-[3px] border-black bg-[#EAE6FF] py-6 px-2 shadow-[4px_4px_0_0_#1a1a1a] h-full"
          >
            {['A', 'B', 'O', 'U', 'T'].map((letter, i) => (
              <span key={i} className="font-display font-black text-3xl text-[#0A1128] my-1.5 transform hover:scale-125 hover:-translate-x-1 hover:text-[#FF4D00] transition-all cursor-default">
                {letter}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
