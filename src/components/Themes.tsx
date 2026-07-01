"use client";

import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

export default function Themes() {
  return (
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

        {/* Right Side: Classified Intel Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          {/* Creative Box Background/Border Elements */}
          <div className="absolute inset-0 border-4 border-black transform translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3 bg-gray-100/50"></div>
          <div className="absolute inset-0 border-4 border-black transform -rotate-1 pointer-events-none"></div>
          
          <div className="relative border-4 border-black p-6 md:p-12 bg-white z-10 flex flex-col items-center justify-center min-h-[350px] md:min-h-[450px]">
            
            {/* Tape Doodle */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-6 md:h-8 bg-[#0055FF]/80 -rotate-2 mix-blend-multiply border border-black/10"></div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center justify-center w-full">
              <div className="relative mb-8 md:mb-10 mt-4 md:mt-0">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-20 h-20 md:w-28 md:h-28 bg-[#FFB800] border-4 border-black shadow-[6px_6px_0_0_#1a1a1a] flex items-center justify-center transform -rotate-3"
                >
                  <Lock className="text-black w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
                </motion.div>
                
                {/* Mail Icon overlapping */}
                <motion.div 
                  initial={{ rotate: 12 }}
                  animate={{ rotate: [12, 18, 12] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-3 -right-4 md:-bottom-4 md:-right-6 w-14 h-14 md:w-16 md:h-16 bg-white border-4 border-black shadow-[4px_4px_0_0_#1a1a1a] flex items-center justify-center text-[#FF0033]"
                >
                  <Mail className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
                </motion.div>
              </div>
              

              
              <div className="w-full max-w-[200px] md:max-w-md h-1.5 bg-black mb-6 md:mb-8 transform rotate-1 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute inset-0 bg-[#0055FF] w-1/3"
                />
              </div>

              <div className="bg-gray-50 border-4 border-black p-4 md:p-8 shadow-[4px_4px_0_0_#1a1a1a] md:shadow-[6px_6px_0_0_#1a1a1a] transform -rotate-1 relative w-full max-w-md md:max-w-none">
                {/* Inner border element */}
                <div className="absolute inset-1 md:inset-2 border-2 border-black/10 border-dashed pointer-events-none"></div>
                
                <p className="font-sans font-black text-sm md:text-lg text-[#FF4D00] leading-relaxed uppercase tracking-widest relative z-10 text-center">
                  The Problem Statements will be securely delivered via email to the selected teams.
                </p>
              </div>

              <div className="mt-8 md:mt-10 flex items-center justify-center gap-2 md:gap-3 font-mono text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500 bg-white border-2 border-black px-3 md:px-4 py-2 shadow-[2px_2px_0_0_#1a1a1a]">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 border border-black"></span>
                <span>Registration is now closed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
