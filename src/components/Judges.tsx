"use client";

import { motion } from "framer-motion";

import Image from "next/image";

export default function Judges() {
  
  const judges = [
    { 
      id: 1, 
      name: "Avik Agarwala", 
      role: "AI Engineer @TCS", 
      img: "/avik.png",
      linkedin: "https://www.linkedin.com/in/avikagarwala/"
    },
    { 
      id: 2, 
      name: "Devesh Tulshyan", 
      role: "FullStack Engineer @TCS Prime", 
      img: "/devesh.jpeg",
      linkedin: "https://www.linkedin.com/in/devesh-tulshyan/"
    },
    { 
      id: 3, 
      name: "Arindam Majumder", 
      role: "Co-Founder @Studio1", 
      img: "/arindam.png",
      linkedin: "https://www.linkedin.com/in/arindam2004/"
    }
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

          <div className="relative border-4 border-black p-6 md:p-12 shadow-[8px_8px_0_0_#1a1a1a] z-10 flex flex-col items-center bg-white/50 backdrop-blur-sm">
            
            {/* Tape Doodle */}
            <div className="absolute -top-4 right-1/4 transform w-24 h-8 bg-[#FF4D00]/80 rotate-2 mix-blend-multiply border border-black/10 z-20"></div>

            {/* Section Header */}
            <div className="flex flex-col items-center mb-10 w-full border-b-4 border-black pb-6 relative">
              <h2 className="font-display font-black text-xl md:text-5xl uppercase tracking-widest text-[#0A1128] relative z-10">
                The Judges Panel
              </h2>
              {/* Decorative Scribble */}
              <svg className="absolute top-0 right-10 md:right-32 w-12 h-12 text-black/10 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M10,50 Q50,10 90,50 T10,90" />
              </svg>
            </div>

            {/* Suspect Lineup Layout -> Real Judges */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 w-full relative z-10">
              {judges.map((judge, idx) => (
                <motion.div
                  key={judge.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -5, zIndex: 20 }}
                  className="w-[45%] sm:w-[200px] md:w-[240px] bg-white p-3 md:p-4 border-[3px] border-black shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[6px_6px_0_0_#FF4D00] flex flex-col items-center relative group transition-all duration-300"
                >
                  {/* ID Badge Clip / Hole */}
                  <div className="w-8 md:w-10 h-2 md:h-2.5 bg-gray-200 border border-gray-300 rounded-full mb-3 shadow-inner"></div>

                  {/* Real Image Box */}
                  <div className="w-full aspect-square border-2 border-black bg-gray-100 relative overflow-hidden flex items-end justify-center mb-4 shadow-[2px_2px_0_0_#1a1a1a]">
                    <Image 
                      src={judge.img} 
                      alt={judge.name} 
                      fill
                      sizes="(max-width: 768px) 45vw, 240px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    
                    {/* Hover Overlay for LinkedIn */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#FFB800] border-2 border-black hover:bg-[#FF4D00] hover:text-white transition-colors transform hover:scale-110">
                        <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* ID Details */}
                  <div className="w-full flex flex-col gap-2 font-mono text-black text-center">
                    <h3 className="font-display font-black text-xs md:text-base uppercase tracking-wider text-[#0A1128] leading-tight">
                      {judge.name}
                    </h3>
                    <div className="bg-[#FFB800] text-black px-2 py-1 border border-black inline-block self-center group-hover:bg-[#FF4D00] group-hover:text-white transition-colors">
                      <span className="font-sans text-[7px] md:text-[10px] font-bold uppercase tracking-widest leading-none block">
                        {judge.role}
                      </span>
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
