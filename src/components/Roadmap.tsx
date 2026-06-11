"use client";

import { motion } from "framer-motion";

export default function Roadmap() {
  // FUTURE-PROOF DATA STRUCTURE
  // Just update this array when the timeline is decided! The layout will automatically adapt.
  const timelineData = [
    { id: 1, time: "", title: "Start", desc: "Revealing Soon" },
    { id: 2, time: "??:??", title: "Check In", desc: "Revealing Soon" },
    { id: 3, time: "??:??", title: "Activity", desc: "Revealing Soon" },
    { id: 4, time: " ", title: "Wrap Up", desc: "Revealing Soon" }
  ];

  return (
    <section id="roadmap" className="py-8 md:py-12 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col lg:flex-row gap-6 relative">
        
        {/* Left Column - Vertical "THE ROADMAP" */}
        <div className="hidden lg:flex w-1/12 items-stretch justify-start relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center border-4 border-black bg-[#0A1128] py-8 px-2 shadow-[6px_6px_0_0_#1a1a1a] h-full"
          >
            {['T','H','E','','R','O','A','D','M','A','P'].map((letter, i) => (
              <span key={i} className={`font-display font-black text-2xl text-white ${letter === '' ? 'my-3' : 'my-1'} transform hover:scale-125 hover:translate-x-1 hover:text-[#00E0FF] transition-all cursor-default`}>
                {letter}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Mobile Title */}
        <div className="lg:hidden w-full mb-4 flex justify-center">
          <h2 className="font-display font-black text-xl md:text-2xl uppercase text-white border-[3px] border-black inline-block px-3 py-1.5 bg-[#0A1128] shadow-[3px_3px_0_0_#1a1a1a]">
            The Roadmap
          </h2>
        </div>

        {/* Right Column - The Timeline */}
        <div className="w-full lg:w-11/12 relative py-2 md:py-4">
          
          {/* Center Vertical Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 transform md:-translate-x-1/2 w-1 md:w-2 bg-black pointer-events-none z-0 rounded-full"></div>

          {/* Timeline Nodes */}
          <div className="relative z-10 flex flex-col gap-6 md:gap-8">
            {timelineData.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 flex flex-col pl-14 pr-2 md:px-8 items-start">
                  <div className={`bg-[#f9f8f6] border-[3px] md:border-4 border-black p-3 md:p-4 shadow-[4px_4px_0_0_#1a1a1a] transform transition-transform hover:-translate-y-1 w-full max-w-xs ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="font-display font-bold text-base md:text-lg text-[#FF0033] mb-1">{item.time}</div>
                    <h3 className="font-display font-black text-lg md:text-xl uppercase text-[#0A1128] mb-1">{item.title}</h3>
                    <p className="font-sans text-xs md:text-sm text-black/70 font-medium">{item.desc}</p>
                  </div>
                </div>

                {/* Center Node / Dot */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 md:w-4 md:h-4 bg-[#00E0FF] border-2 md:border-[3px] border-black rounded-full shadow-[2px_2px_0_0_#1a1a1a] z-20"></div>

              </motion.div>
            ))}
          </div>

          {/* CLASSIFIED / REVEALING SOON OVERLAY */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Blurry backdrop masking the middle events */}
            <div className="absolute top-1/4 bottom-1/4 left-0 right-0 backdrop-blur-[8px] bg-white/40 pointer-events-auto flex items-center justify-center border-y-4 border-dashed border-black/50">
              
              {/* Caution Tapes */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-4xl flex flex-col items-center justify-center pointer-events-auto -mt-6"
              >
                <div className="w-[150%] bg-[#FFB800] border-y-4 border-black py-2 md:py-3 transform -rotate-3 flex overflow-hidden whitespace-nowrap shadow-2xl z-40">
                  <div className="animate-marquee flex font-display font-black text-2xl md:text-3xl uppercase tracking-widest text-black">
                    {[...Array(15)].map((_, i) => (
                      <span key={i} className="mx-2 md:mx-4">⚠️ REVEALING SOON ⚠️ CLASSIFIED </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-[150%] bg-black border-y-4 border-black py-2 md:py-3 transform rotate-2 flex overflow-hidden whitespace-nowrap shadow-2xl -mt-4 md:-mt-6 z-30">
                  <div className="animate-marquee-reverse flex font-display font-black text-2xl md:text-3xl uppercase tracking-widest text-[#FFB800]">
                    {[...Array(15)].map((_, i) => (
                      <span key={i} className="mx-2 md:mx-4">TIMELINE LOCKED // STANDBY // </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Required CSS for Marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: 200%;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 20s linear infinite;
          width: 200%;
        }
      `}} />
    </section>
  );
}
