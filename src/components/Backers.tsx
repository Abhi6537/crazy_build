"use client";

import { motion } from "framer-motion";

export default function Backers() {
  
  // FUTURE-PROOF DATA STRUCTURE
  // 6 empty slots right now. Just replace `isRedacted: true` with your logo data later!
  const sponsorSlots = [
    { id: 1, isRedacted: true },
    { id: 2, isRedacted: true },
    { id: 3, isRedacted: true },
    { id: 4, isRedacted: true },
    { id: 5, isRedacted: true },
    { id: 6, isRedacted: true },
  ];

  return (
    <section id="backers" className="py-12 md:py-16 relative overflow-hidden bg-[#f9f8f6]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10 flex flex-col items-center">
        
        {/* Sketch-style Container Box */}
        <div className="w-full border-[3px] md:border-4 border-black bg-white p-6 md:p-10 shadow-[6px_6px_0_0_#1a1a1a] relative">
          
          {/* Section Header */}
          <div className="flex justify-center mb-8 md:mb-12 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border-[3px] md:border-4 border-black px-6 py-2 md:py-3 shadow-[4px_4px_0_0_#FF4D00] bg-white relative z-10 transform -rotate-1 hover:rotate-1 transition-transform cursor-default"
            >
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-[#0A1128] tracking-wider text-center">
                The Backers
              </h2>
            </motion.div>
            
            {/* Hand-drawn squiggle behind title */}
            <svg className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 md:w-64 h-8 text-[#FFB800] z-0" viewBox="0 0 200 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5,15 Q30,5 50,15 T100,10 T150,15 T195,5" />
            </svg>
          </div>

          {/* Simple Grid Layout (3 cols desktop, 2 cols mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            {sponsorSlots.map((slot, idx) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[4/3] w-full border-[3px] border-black bg-[#f9f8f6] overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Sketchy overlapping border effect */}
                <div className="absolute inset-0 border-2 border-black transform rotate-1 scale-[0.98] pointer-events-none group-hover:rotate-2 transition-transform"></div>
                <div className="absolute inset-0 border-2 border-black transform -rotate-1 scale-[0.98] pointer-events-none group-hover:-rotate-2 transition-transform"></div>

                {/* Content (Revealing Soon State) */}
                <div className="flex flex-col items-center justify-center z-10 w-full h-full relative p-4">
                  
                  {/* Huge Question Mark */}
                  <span className="font-display font-black text-6xl md:text-8xl text-black/10 group-hover:text-black/20 transition-colors transform -rotate-6">
                    ?
                  </span>

                  {/* Redacted Tape */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] rotate-[-4deg] group-hover:rotate-0 transition-all duration-300">
                    <div className="bg-[#FF0033] border-y-2 border-black py-1 md:py-2 text-center shadow-[2px_2px_0_0_#1a1a1a]">
                      <span className="font-display font-black text-white text-lg md:text-xl uppercase tracking-widest">
                        Revealing Soon
                      </span>
                    </div>
                  </div>

                </div>

                {/* Decorative dots in corners */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative scribble */}
          <div className="absolute -bottom-6 md:-bottom-8 -right-4 md:-right-8 w-16 h-16 md:w-24 md:h-24 opacity-50 transform rotate-12">
            <svg viewBox="0 0 100 100" fill="none" stroke="#FF4D00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10,50 Q30,10 50,50 T90,50 M30,30 L30,70 M70,30 L70,70 M10,10 L90,90" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
