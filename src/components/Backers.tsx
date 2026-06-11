"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function Backers() {
  
  // FUTURE-PROOF DATA STRUCTURE
  const sponsorSlots = [
    { id: 1, isRedacted: true, accent: "#FF0033" },
    { id: 2, isRedacted: true, accent: "#0055FF" },
    { id: 3, isRedacted: true, accent: "#FF4D00" },
    { id: 4, isRedacted: true, accent: "#00CC44" },
    { id: 5, isRedacted: true, accent: "#8000FF" },
    { id: 6, isRedacted: true, accent: "#FFB800" },
  ];

  return (
    <section id="backers" className="py-12 md:py-16 relative overflow-hidden bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10 flex flex-col items-center">
        
        {/* Sketch-style Container Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full relative"
        >
          {/* Creative Box Background/Border Elements */}
          <div className="absolute inset-0 border-4 border-black transform -translate-x-2 -translate-y-2 bg-[#FF4D00]/10 pointer-events-none"></div>
          <div className="absolute inset-0 border-4 border-black transform rotate-1 pointer-events-none"></div>

          <div className="relative border-4 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0_0_#1a1a1a] z-10">
            
            {/* Tape Doodle */}
            <div className="absolute -top-5 right-10 transform w-20 h-8 bg-blue-200/80 rotate-3 mix-blend-multiply border border-black/10 z-20"></div>
          
          {/* Section Header */}
          <div className="flex justify-center mb-10 md:mb-16 relative">
            <motion.div 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block border-4 border-black px-8 py-3 md:py-4 shadow-[6px_6px_0_0_#FF4D00] bg-white relative z-10 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#FF4D00] transition-all cursor-default overflow-hidden group"
            >
              {/* Highlight sweep effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-[#0A1128] tracking-widest text-center relative z-10">
                The Backers
              </h2>
            </motion.div>
          </div>

          {/* Grid Layout (3 cols desktop, 2 cols mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full relative z-10">
            {sponsorSlots.map((slot, idx) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, zIndex: 20, rotate: idx % 2 === 0 ? 2 : -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--hover-accent': slot.accent } as React.CSSProperties}
                className="group relative aspect-[4/3] w-full border-[3px] border-black shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[8px_8px_0_0_var(--hover-accent)] overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
              >
                {/* Default minimal background tint */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundColor: slot.accent }}></div>

                {/* Diagonal stripes background on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" 
                  style={{ 
                    backgroundImage: `repeating-linear-gradient(45deg, ${slot.accent} 0, ${slot.accent} 2px, transparent 2px, transparent 10px)` 
                  }}
                ></div>

                {/* Content (Revealing Soon State) */}
                <div className="flex flex-col items-center justify-center z-10 w-full h-full relative p-4">
                  
                  {/* Huge Lock Icon or Question Mark */}
                  <motion.div 
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <Lock size={48} className="text-black/10 group-hover:text-[var(--hover-accent)] transition-colors mb-2" strokeWidth={1.5} />
                    <span className="font-display font-black text-2xl text-black/10 group-hover:text-[var(--hover-accent)] transition-colors uppercase tracking-widest">
                      Locked
                    </span>
                  </motion.div>

                  {/* Redacted Tape */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] rotate-[-6deg] group-hover:rotate-[2deg] group-hover:scale-110 transition-all duration-300 z-20">
                    <div className="bg-black group-hover:bg-[var(--hover-accent)] transition-colors border-y-4 border-white py-2 md:py-3 text-center shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                      <span className="font-display font-black text-white text-lg md:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
                        Revealing Soon
                      </span>
                    </div>
                  </div>

                </div>

                {/* Decorative brackets in corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-black/20 group-hover:border-[var(--hover-accent)] transition-colors"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-black/20 group-hover:border-[var(--hover-accent)] transition-colors"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-black/20 group-hover:border-[var(--hover-accent)] transition-colors"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-black/20 group-hover:border-[var(--hover-accent)] transition-colors"></div>
              </motion.div>
            ))}
          </div>
          
          </div>
        </motion.div>
      </div>
    </section>
  );
}
