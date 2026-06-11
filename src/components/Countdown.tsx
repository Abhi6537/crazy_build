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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set target date to June 30, 2026
    const targetDate = new Date("2026-06-30T00:00:00");

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

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex gap-3 md:gap-4 mb-10 w-full justify-center md:justify-start transform md:-translate-y-8 lg:-translate-y-12">
      {timeBlocks.map((block, i) => (
        <motion.div 
          key={block.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FF4D00] border-2 border-black shadow-[4px_4px_0_0_#1a1a1a] flex items-center justify-center transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#1a1a1a] transition-all">
            <span className="font-display font-black text-2xl md:text-4xl text-white">
              {block.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 font-display font-bold text-xs md:text-sm tracking-widest uppercase text-[#1a1a1a]">
            {block.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
