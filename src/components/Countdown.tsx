"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to July 8th, 2026
    const targetDate = new Date("2026-07-08T09:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 mb-2 md:mb-8 w-full justify-center md:justify-start transform -translate-y-8 md:-translate-y-8 lg:-translate-y-12 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring", bounce: 0.4 }}
        className="bg-white border-2 border-black shadow-[2px_2px_0_0_#1a1a1a] md:shadow-[6px_6px_0_0_#FF4D00] p-1.5 sm:p-2 md:p-4 w-[95%] max-w-sm md:max-w-md group relative overflow-hidden"
      >
        {/* Decorative Corner Element */}
        <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 bg-[#FFB800] transform translate-x-4 -translate-y-4 rotate-45 border-l-2 border-b-2 border-black hidden md:block"></div>
        
        <div className="flex flex-col relative z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 md:gap-2 mb-1.5 md:mb-3">
            <div className="bg-[#FF4D00] text-white px-1.5 py-0.5 border border-black transform -rotate-1 font-display font-black text-[7px] sm:text-[9px] md:text-xs uppercase tracking-wider shadow-[1px_1px_0_0_#1a1a1a]">
              Incoming Chaos
            </div>
            <span className="font-sans font-bold text-[7px] sm:text-[9px] md:text-xs text-[#0A1128] bg-gray-100 px-1.5 py-0.5 border border-black shadow-[1px_1px_0_0_#1a1a1a]">
              July 8, 2026
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-1 md:gap-3">
            {timeBlocks.map((block, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center bg-gray-50 border-[1.5px] border-black py-1 px-0.5 md:py-2 md:px-2 shadow-[1px_1px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#FF4D00] hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-display font-black text-lg sm:text-xl md:text-3xl text-[#0A1128] tabular-nums tracking-tighter leading-none">
                  {block.value.toString().padStart(2, '0')}
                </span>
                <span className="font-sans font-bold text-[6px] md:text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
