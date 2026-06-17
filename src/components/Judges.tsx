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
    },
    { 
      id: 4, 
      name: "Apabrita Sarkar", 
      role: "Software analyst @Capgemini", 
      img: "/apabrita.jpeg",
      linkedin: "https://www.linkedin.com/in/apabritasarkar/"
    },
    { 
      id: 5, 
      name: "Ayush Dhua", 
      role: "SDE-I @AT&T", 
      img: "/ayush.jpeg",
      linkedin: "https://www.linkedin.com/in/ayush-dhua/"
    },
    { 
      id: 6, 
      name: "Revealing Soon", 
      role: "........", 
      img: "",
      linkedin: ""
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

            {/* Trading Card Lineup */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 w-full relative z-10">
              {judges.map((judge, idx) => (
                <motion.div
                  key={judge.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -5, zIndex: 20 }}
                  className="w-[45%] sm:w-[180px] md:w-[200px] lg:w-[220px] bg-[#f4f4f0] p-2 md:p-3 border-[3px] border-black shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[8px_8px_0_0_#FF4D00] flex flex-col items-center relative group transition-all duration-300"
                >
                  {/* Visible LinkedIn Icon */}
                  {judge.linkedin && (
                    <a 
                      href={judge.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute top-1 right-1 bg-white border-2 border-black p-1 z-20 hover:bg-[#0077b5] hover:text-white transition-colors shadow-[2px_2px_0_0_#1a1a1a] group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}

                  {/* Real Image Box - aspect-[4/5] and object-top prevents cropping */}
                  <div className="w-full aspect-[4/5] border-2 md:border-[3px] border-black bg-white relative overflow-hidden flex items-center justify-center mb-3 shadow-[2px_2px_0_0_#1a1a1a]">
                    {judge.img ? (
                      <Image 
                        src={judge.img} 
                        alt={judge.name} 
                        fill
                        sizes="(max-width: 768px) 45vw, 220px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      // Silhouette placeholder for "Revealing Soon"
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                        <span className="font-display font-black text-4xl md:text-6xl text-black/20">?</span>
                      </div>
                    )}
                  </div>

                  {/* Details Block */}
                  <div className="w-full flex flex-col items-center text-center mt-auto">
                    <h3 className="font-display font-black text-[10px] md:text-[13px] uppercase tracking-widest text-[#0A1128] leading-tight mb-1.5 border-b-2 border-black pb-1 w-full">
                      {judge.name}
                    </h3>
                    <div className="bg-[#FFB800] text-black px-1.5 py-1 border-2 border-black w-full shadow-[2px_2px_0_0_#1a1a1a] group-hover:bg-[#FF4D00] group-hover:text-white transition-colors duration-300">
                      <span className="font-sans text-[6px] md:text-[8px] font-bold uppercase tracking-wider leading-none block">
                        {judge.role}
                      </span>
                    </div>
                  </div>
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
