"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Innovation First",
      description: "Open-ended challenge tracks reward original thinking, not just polished slides. Judging prioritises novelty, feasibility and impact.",
      color: "bg-[#0055FF]"
    },
    {
      title: "Rapid Prototyping",
      description: "Teams ship functional solutions and live demos under time pressure — the same build velocity startups and product teams value.",
      color: "bg-[#FF0033]"
    },
    {
      title: "Team-Based Competition",
      description: "Squads of developers, designers and problem-solvers compete across structured rounds, mentor check-ins and final demos.",
      color: "bg-[#8A2BE2]"
    },
    {
      title: "Industry-Backed",
      description: "Co-created with Rabbitt AI, bringing real-world problem statements, expert mentorship and industry-grade evaluation.",
      color: "bg-[#FF4D00]"
    }
  ];

  const stats = [
    { value: "120-150", label: "Participants", sub: "Curated student builders", color: "text-[#0055FF]", bg: "bg-white" },
    { value: "30-40", label: "Teams", sub: "Cross-disciplinary squads", color: "text-[#FF0033]", bg: "bg-[#f9f8f6]" },
    { value: "1:1", label: "Collab", sub: "Powered by Rabbitt AI", color: "text-[#8A2BE2]", bg: "bg-white" },
    { value: "Multi", label: "Challenges", sub: "Themed problem tracks", color: "text-[#FF4D00]", bg: "bg-[#f9f8f6]" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <section id="about" className="py-8 relative overflow-hidden bg-[#f9f8f6]">
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
            <p className="text-lg md:text-xl lg:text-2xl font-sans font-medium leading-relaxed text-[#0A1128]">
              <span className="font-display font-black text-white text-xl md:text-2xl lg:text-3xl uppercase bg-[#FF4D00] border-[3px] border-black px-3 py-1 mr-3 inline-block shadow-[3px_3px_0_0_#1a1a1a]">CRAZY-BUILD</span>
              is an innovation-driven 8-hour internal hackathon organized by the Coding Club JISCE, hosted at JIS College of Engineering in collaboration with Rabbitt AI. Bringing together builders, designers, developers, and innovators, the event challenges student teams to transform bold ideas into working prototypes by solving real-world problems through technology, AI, design, and product thinking all within a single day.
            </p>
          </motion.div>

          {/* Bottom Split: 4 Stacked Boxes (Left) + 1 Big Box (Right) */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            
            {/* 4 Stacked Stats Boxes */}
            <div className="w-full md:w-5/12 flex flex-col justify-between gap-3">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center justify-between p-2 md:p-3 border-[3px] border-black shadow-[3px_3px_0_0_#1a1a1a] cursor-pointer ${stat.bg} transition-all duration-200 z-10 hover:z-20`}
                >
                  <div className={`font-display font-black text-2xl lg:text-3xl tracking-tighter ${stat.color} w-1/2`}>
                    {stat.value}
                  </div>
                  <div className="w-1/2 text-right">
                    <div className="font-display font-bold text-sm lg:text-base uppercase text-black leading-tight">
                      {stat.label}
                    </div>
                    <div className="font-sans text-[10px] font-medium text-black/60 mt-0.5">
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
              className="w-full md:w-7/12 h-full relative bg-[#0A1128] border-[3px] border-black shadow-[6px_6px_0_0_#FF4D00] p-4 md:p-6 flex flex-col justify-between overflow-hidden transition-transform duration-300"
            >
              {/* Terminal/Window Header dots */}
              <div className="flex gap-1.5 mb-4 relative z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF0033] border border-black"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800] border border-black"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E0FF] border border-black"></div>
              </div>

              {/* Animated Feature Content */}
              <div className="flex-grow relative z-20 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`inline-block px-2 py-0.5 text-white font-bold uppercase tracking-widest text-[10px] mb-3 border border-white/20 shadow-[1px_1px_0_0_#fff] ${features[activeFeature].color}`}>
                      Feature {activeFeature + 1} // 4
                    </div>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-2 leading-tight">
                      {features[activeFeature].title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed max-w-sm">
                      {features[activeFeature].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Progress Indicators */}
              <div className="flex gap-2 mt-4 relative z-20">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`h-1.5 transition-all duration-300 border border-black ${idx === activeFeature ? 'w-10 bg-[#00E0FF] shadow-[1px_1px_0_0_#fff]' : 'w-2.5 bg-white/20 hover:bg-white/50'}`}
                    aria-label={`View feature ${idx + 1}`}
                  />
                ))}
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
