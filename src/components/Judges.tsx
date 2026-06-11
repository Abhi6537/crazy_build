"use client";

import { motion } from "framer-motion";

export default function Judges() {
  
  // Future proof: when judges are announced, replace these empty objects with actual data.
  const judgeSlots = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  return (
    <section id="judges" className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Creative Box Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full relative"
        >
          {/* Creative Box Background/Border Elements */}
          <div className="absolute inset-0 border-4 border-black transform translate-x-2 translate-y-2 bg-[#FFB800]/10 pointer-events-none"></div>
          <div className="absolute inset-0 border-4 border-black transform -rotate-[0.5deg] pointer-events-none"></div>

          <div className="relative border-4 border-black p-6 md:p-12 shadow-[8px_8px_0_0_#1a1a1a] z-10 flex flex-col items-center">
            
            {/* Tape Doodle */}
            <div className="absolute -top-4 right-1/4 transform w-24 h-8 bg-[#FF4D00]/80 rotate-2 mix-blend-multiply border border-black/10 z-20"></div>

            {/* Section Header */}
            <div className="flex flex-col items-center mb-10 w-full border-b-4 border-black pb-6 relative">
              <h2 className="font-display font-black text-xl md:text-5xl uppercase tracking-widest text-[#0A1128]  relative z-10">
                The Judges Panel
              </h2>
              {/* Decorative Scribble */}
              <svg className="absolute top-0 right-10 md:right-32 w-12 h-12 text-black/10 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M10,50 Q50,10 90,50 T10,90" />
              </svg>
            </div>

            {/* Suspect Lineup Layout */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 w-full relative z-10">
              {judgeSlots.map((slot, idx) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -5, zIndex: 20 }}
                  className="w-[45%] sm:w-[180px] md:w-[200px] bg-white p-3 md:p-4 border-[3px] border-black shadow-[4px_4px_0_0_#1a1a1a] flex flex-col items-center relative group transition-transform duration-300"
                >
                  {/* ID Badge Clip / Hole */}
                  <div className="w-8 md:w-10 h-2 md:h-2.5 bg-gray-200 border border-gray-300 rounded-full mb-3 shadow-inner"></div>

                  {/* Silhouette Picture Box - NOW SQUARE */}
                  <div className="w-full aspect-square border-2 border-black bg-gray-100 relative overflow-hidden flex items-end justify-center mb-4">
                    
                    {/* Sketchy Silhouette SVG */}
                    <svg className="w-[85%] h-[95%] text-black/40" viewBox="0 0 100 120" fill="currentColor">
                      {/* Head */}
                      <path d="M50 50 C35 50 25 35 25 20 C25 5 35 -5 50 -5 C65 -5 75 5 75 20 C75 35 65 50 50 50 Z" />
                      {/* Body/Shoulders */}
                      <path d="M10 120 C10 80 25 60 50 60 C75 60 90 80 90 120 Z" />
                    </svg>

                    {/* Animated Scanning Laser */}
                    <motion.div 
                      animate={{ y: ["-10%", "300%", "-10%"] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-transparent via-[#0055FF]/30 to-[#0055FF]/60 border-b-2 border-[#0055FF] z-10"
                    ></motion.div>
                  </div>

                  {/* ID Details (Redacted/Revealing Soon) */}
                  <div className="w-full flex flex-col gap-2 font-mono text-black relative">
                    
                    {/* Field: Name */}
                    <div className="flex flex-col gap-0.5 relative">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400">Name</span>
                      {/* Thick Marker Stroke Effect */}
                      <div className="relative h-5 md:h-6 w-full bg-black flex items-center justify-center transform -skew-x-6 hover:skew-x-0 transition-transform">
                        <span className="text-white font-bold tracking-widest uppercase text-[9px] md:text-[10px] whitespace-nowrap">Revealing Soon</span>
                        {/* Scribble texture over the marker */}
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDIgMloiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]"></div>
                      </div>
                    </div>

                    {/* Field: Company/Role */}
                    <div className="flex flex-col gap-0.5 relative mt-1">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400">Clearance</span>
                      <div className="relative h-4 w-2/3 bg-black flex items-center justify-center transform skew-x-3">
                        <span className="text-[#FFB800] font-bold tracking-widest uppercase text-[8px] md:text-[9px]">Classified</span>
                      </div>
                    </div>

                  </div>
                  
                  {/* Corner Screws / Tacks */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-gray-300 rounded-full border border-black shadow-inner"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gray-300 rounded-full border border-black shadow-inner"></div>

                </motion.div>
              ))}
            </div>

            {/* Bottom Descriptive Text */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 md:mt-16 text-center max-w-2xl mx-auto relative group cursor-default"
            >
              <div className="absolute -inset-4 bg-[#FFB800]/10 transform -skew-x-6 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none rounded-xl"></div>
              <p className="font-mono font-medium text-sm sm:text-base md:text-lg text-gray-600 lowercase tracking-wide leading-relaxed relative z-10 border-y-2 border-dashed border-gray-300 py-4 md:py-5 px-4 bg-white/50 backdrop-blur-sm shadow-sm">
                <span className="text-2xl text-gray-300 font-serif leading-none mr-1 absolute -top-2 -left-2">"</span>
                your ideas, your code, your prototype will be <span className="text-[#FF4D00] font-bold px-1.5 py-0.5 "> evaluated by experts</span> from the tech industry
                <span className="text-2xl text-gray-300 font-serif leading-none ml-1 absolute -bottom-4 -right-2">"</span>
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
