"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Countdown from "./Countdown";

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden pt-8 pb-16">
      {/* Floating SVGs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gear */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: 360 }}
          transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 20, ease: "linear" } }}
          className="absolute top-[15%] left-[10%] text-black opacity-10"
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </motion.div>
        
        {/* Code Brackets */}
        <motion.div 
          animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] text-[#0055FF] opacity-20"
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </motion.div>

        {/* Squiggly line */}
        <motion.div 
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[20%] text-[#FF0033] opacity-20"
        >
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 10 20 Q 25 5 40 20 T 70 20 T 100 20" />
          </svg>
        </motion.div>

        {/* Geometric Shape */}
        <motion.div 
          animate={{ y: [0, -25, 0], rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[10%] text-[#FF4D00] opacity-20"
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
          </svg>
        </motion.div>
        
        {/* Star */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-[40%] left-[5%] text-yellow-500 opacity-20 hidden md:block"
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </motion.div>
        
        {/* Triangle */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute top-[60%] right-[5%] text-[#1a1a1a] opacity-10 hidden md:block"
        >
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 mt-16 md:mt-24">
        
        {/* Left Column: Partnership Row & Big Logo */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          
          {/* Partnership Row */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mt-0 md:mt-8 mb-2 md:mb-4 w-full md:ml-12 lg:ml-20"
          >
            <Image src="/jis.png" alt="JIS College" width={64} height={64} className="w-8 h-8 md:w-16 md:h-16 rounded-full object-cover shadow-[2px_2px_0_0_#1a1a1a] border-2 border-black bg-white" />
            <span className="font-display font-black text-sm md:text-2xl text-black">×</span>
            <Image src="/codingclub.png" alt="Coding Club" width={64} height={64} className="w-8 h-8 md:w-16 md:h-16 rounded-full object-cover shadow-[2px_2px_0_0_#1a1a1a] border-2 border-black bg-black" />
            <span className="font-display font-black text-sm md:text-2xl text-black">×</span>
            <div className="flex flex-col items-center">
              <span className="font-sans font-bold text-[5px] md:text-[8px] uppercase tracking-widest text-gray-500 mb-0.5 md:mb-0.5">Powered By</span>
              <a href="https://rabbitt.ai/" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform">
                <Image src="/rabbit.svg" alt="Rabbit Sponsor" width={160} height={56} className="h-6 md:h-14 w-auto object-contain shadow-[2px_2px_0_0_#1a1a1a] border-[1px] md:border-2 border-black rounded-md md:rounded-lg" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image 
              src="/logo.png" 
              alt="CRAZY BUILD"
              draggable={false}
              priority
              width={500}
              height={500}
              onContextMenu={(e) => e.preventDefault()}
              className="w-auto h-auto max-h-[30vh] md:max-h-none md:w-full max-w-[500px] object-contain mix-blend-multiply select-none pointer-events-none transform md:-translate-y-10"
            />
          </motion.div>
        </div>

        {/* Right Column: Text, Buttons, "Join the chaos" */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
          <Countdown />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-2xl font-sans max-w-xl font-medium leading-snug md:leading-relaxed mt-2 md:-mt-8 relative z-10"
          >
            <div className="mb-2 md:mb-4">
              <span className="sketch-underline pb-1 md:pb-4">From whiteboard to working Demo</span>
            </div>
            <div>
              <span className="bg-[#FF4D00] text-white px-1.5 md:px-2 py-0.5 font-bold transform -rotate-1 inline-block shadow-sm">
                CRAZY-BUILD
              </span>
              {" "}compresses the full product cycle into one electric build sprint.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 md:mt-10 flex flex-col items-center md:items-start transform rotate-3 md:ml-6"
          >
            <div className="font-handwriting text-2xl md:text-4xl text-[#FF0033] whitespace-nowrap">Join the chaos!</div>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FF0033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-[90deg] -mt-2 ml-12 md:w-10 md:h-10 hidden md:block">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-2 flex flex-col sm:flex-row gap-4 md:gap-8 w-full md:w-auto px-4 md:px-0"
          >
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowPopup(true);
              }}
              className="w-full sm:w-[350px] md:w-[400px] px-4 md:px-8 py-3 md:py-4 bg-[#FF4D00] text-white font-display font-bold text-base md:text-lg uppercase tracking-wider hover:scale-105 transition-all shadow-[4px_4px_0_0_#1a1a1a] md:shadow-[6px_6px_0_0_#1a1a1a] border-2 border-black z-10 text-center block"
            >
              Register Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Brutalist Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFB800] border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_0_#1a1a1a] max-w-lg w-full relative"
              style={{ backgroundImage: 'var(--paper-grain)' }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-[#FF0033] border-2 border-black flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0_0_#1a1a1a] transition-all z-10"
              >
                ×
              </button>
              
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-[#0055FF]/80 -rotate-2 mix-blend-multiply border border-black/10 z-0"></div>

              <div className="text-center relative z-10 pt-4">
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-widest text-[#0A1128] mb-4 leading-none">
                  Too Late!
                </h2>
                <div className="font-sans font-bold text-lg md:text-xl mb-6 bg-white border-2 border-black p-3 transform -rotate-2 inline-block shadow-[4px_4px_0_0_#1a1a1a]">
                  Registration is Closed.
                </div>
                <p className="font-sans text-sm md:text-base font-medium text-black/80 max-w-sm mx-auto">
                  The arena is fully packed and the chaos has already begun! We can't accept any more registrations this time. Catch you in the next sprint.
                </p>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="mt-8 px-8 py-3 bg-white border-2 border-black font-display font-bold uppercase tracking-wider shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0_0_#1a1a1a] transition-all"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
