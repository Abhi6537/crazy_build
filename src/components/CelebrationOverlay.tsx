"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function CelebrationOverlay() {
  const [stage, setStage] = useState<"initial" | "popup" | "torn" | "done">("initial");
  const [isClient, setIsClient] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsClient(true);
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    if (sessionStorage.getItem("hasSeenCelebration")) {
      setStage("done");
      return;
    }

    const t1 = setTimeout(() => setStage("popup"), 500);
    const t2 = setTimeout(() => {
      setStage("torn");
      sessionStorage.setItem("hasSeenCelebration", "true");
    }, 2500);
    
    const t3 = setTimeout(() => {
      setStage("done");
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient || stage === "done") return null;

  const PopupContent = () => (
    <div 
      className="bg-[#F4F4F0] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center w-[90vw] max-w-3xl relative" 
      style={{ 
        backgroundImage: "var(--paper-grain)",
        // Softly irregular outer edges to simulate a physical piece of paper
        clipPath: "polygon(1% 1%, 98% 0%, 100% 99%, 0% 98%)"
      }}
    >
      <h1 className="font-display font-black text-6xl md:text-8xl lg:text-7xl uppercase tracking-tighter text-[#0A1128] leading-[0.9]">
        Mission
        <br />
        <span className="text-[#FF4D00]">Accomplished</span>
      </h1>
      
      <div className="mt-12 flex flex-col items-center">
        <div className="h-1 w-24 bg-black/20 mb-6 rounded-full"></div>
        <span className="font-mono font-bold text-gray-600 uppercase tracking-widest text-sm md:text-lg">
          Hackathon Concluded
        </span>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {(stage === "popup" || stage === "torn") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "popup" ? 1 : 0 }}
            transition={{ duration: stage === "popup" ? 0.3 : 1.5 }}
            className="fixed inset-0 z-[9997] bg-black/80 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none perspective-1000">
        <AnimatePresence>
          {stage === "popup" && (
            <motion.div
              initial={{ scale: 0, rotate: -2 }}
              animate={{ scale: 1, rotate: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="relative drop-shadow-2xl"
            >
              <PopupContent />
            </motion.div>
          )}

          {stage === "torn" && (
            <div className="relative inline-block drop-shadow-2xl">
              {/* Left Half of the Tear */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 1 }}
                animate={{ x: -300, y: 200, rotate: -10, opacity: 0 }}
                transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 z-20"
                style={{
                  // Organic, realistic vertical paper tear
                  clipPath: "polygon(0% 0%, 50% 0%, 48% 4%, 51% 8%, 49% 12%, 52% 16%, 48% 22%, 51% 28%, 47% 34%, 53% 40%, 49% 46%, 51% 52%, 46% 58%, 52% 64%, 48% 70%, 53% 76%, 49% 82%, 51% 88%, 47% 94%, 50% 100%, 0% 100%)"
                }}
              >
                <PopupContent />
              </motion.div>

              {/* Right Half of the Tear */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 1 }}
                animate={{ x: 300, y: 200, rotate: 12, opacity: 0 }}
                transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10"
                style={{
                  // Exact inverse of the organic tear
                  clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 47% 94%, 51% 88%, 49% 82%, 53% 76%, 48% 70%, 52% 64%, 46% 58%, 51% 52%, 49% 46%, 53% 40%, 47% 34%, 51% 28%, 48% 22%, 52% 16%, 49% 12%, 51% 8%, 48% 4%)"
                }}
              >
                <PopupContent />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {stage === "torn" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
          >
            {/* Left Cannon */}
            <Confetti
              width={windowDimensions.width}
              height={windowDimensions.height}
              recycle={false}
              numberOfPieces={windowDimensions.width < 768 ? 150 : 400}
              gravity={0.12}
              initialVelocityY={40}
              initialVelocityX={15}
              confettiSource={{
                x: 0,
                y: windowDimensions.height,
                w: 0,
                h: 0
              }}
              colors={['#FF4D00', '#0055FF', '#0A1128', '#FFB800', '#00D084', '#FF0033']}
            />
            {/* Right Cannon */}
            <Confetti
              width={windowDimensions.width}
              height={windowDimensions.height}
              recycle={false}
              numberOfPieces={windowDimensions.width < 768 ? 150 : 400}
              gravity={0.12}
              initialVelocityY={40}
              initialVelocityX={-15}
              confettiSource={{
                x: windowDimensions.width,
                y: windowDimensions.height,
                w: 0,
                h: 0
              }}
              colors={['#FF4D00', '#0055FF', '#0A1128', '#FFB800', '#00D084', '#FF0033']}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
