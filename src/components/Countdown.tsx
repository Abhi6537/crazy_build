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
    <div className="flex gap-2 mb-4 md:mb-10 w-full justify-center md:justify-start transform md:-translate-y-4 lg:-translate-y-8 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring", bounce: 0.4 }}
        className="bg-white border-2 border-black shadow-[4px_4px_0_0_#FF4D00] p-2 md:p-6 transform hover:-translate-y-1 transition-transform w-full md:max-w-md"
      >
        <div className="flex items-center md:items-start gap-2 md:gap-4">
          <div className="text-xl md:text-3xl hidden sm:block"></div>
          <div className="flex flex-col text-center sm:text-left w-full">
            <h3 className="font-display font-black text-xs sm:text-sm md:text-xl text-[#0A1128] uppercase tracking-wider mb-0 md:mb-1">
              Date & Time will announce soon
            </h3>
            <p className="font-sans font-bold text-[10px] sm:text-xs md:text-sm text-gray-600 leading-tight md:leading-relaxed">
              All the things will be held after semester exams.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
