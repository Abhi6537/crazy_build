"use client";

import { motion } from "framer-motion";

export default function Roadmap() {
  // FUTURE-PROOF DATA STRUCTURE
  // Just update this array when the timeline is decided! The layout will automatically adapt.
  const timelineData = [
    { id: 1, time: "08:30 AM", title: "Check-in", desc: "Arrival & Setup", color: "#00E0FF" },
    { id: 2, time: "09:00 AM", title: "Opening Ceremony", desc: "Welcome & Guidelines", color: "#FFB800" },
    { id: 3, time: "09:30 AM", title: "Hacking Begins", desc: "Start building!", color: "#FF4D00" },
    { id: 4, time: "01:00 PM - 02:00 PM", title: "Lunch", desc: "Fuel up & network", color: "#0055FF" },
    { id: 5, time: "04:00 PM", title: "Hacking Ends", desc: "Keyboards down", color: "#FF0033" },
    { id: 6, time: "04:00 PM - 05:00 PM", title: "Judging Process", desc: "Project evaluations", color: "#FFB800" },
    { id: 7, time: "05:00 PM - 05:30 PM", title: "Closing Ceremony", desc: "Prize Distribution", color: "#00E0FF" },
    { id: 8, time: "05:30 PM", title: "Wrap-Up & Photo", desc: "Farewells", color: "#0055FF" }
  ];

  return (
    <section id="roadmap" className="py-8 md:py-12 relative overflow-hidden">
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
          <h2 className="font-display font-black text-lg md:text-2xl uppercase text-white border-[3px] border-black inline-block px-3 py-1.5 bg-[#0A1128] shadow-[3px_3px_0_0_#1a1a1a]">
            The Roadmap
          </h2>
        </div>

        {/* The Timeline */}
        <div className="w-full lg:w-11/12 relative py-2 md:py-8">
          
          {/* Mobile Snake Timeline (below md) */}
          <div className="md:hidden relative z-10 grid grid-rows-8 w-full mb-8">
            
            {/* Vertical Wavy Snake Line */}
            <svg className="absolute top-[6.25%] left-0 w-12 h-[87.5%] pointer-events-none z-0 overflow-visible" viewBox="0 0 100 700" preserveAspectRatio="none">
              <path 
                d="M50,0 Q0,50 50,100 T50,200 T50,300 T50,400 T50,500 T50,600 T50,700" 
                fill="none" 
                stroke="black" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {timelineData.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex flex-row items-center relative w-full"
              >
                {/* Node / Dot */}
                <div className="w-4 h-4 min-w-[16px] ml-4 border-[3px] border-black bg-white shadow-[2px_2px_0_0_#1a1a1a] z-20" style={{ backgroundColor: item.color }}></div>
                
                {/* Content Card */}
                <div className="flex-1 pl-4 pr-2 py-2">
                  <div className="bg-white border-[3px] border-black p-2.5 shadow-[4px_4px_0_0_#1a1a1a] w-full relative">
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-2 border-black shadow-[2px_2px_0_0_#1a1a1a] z-10 rotate-6" style={{ backgroundColor: item.color }}></div>
                    <div className="font-mono font-bold text-[9px] mb-0.5 px-1 py-0.5 border-2 border-black inline-block" style={{ backgroundColor: item.color }}>{item.time}</div>
                    <h3 className="font-display font-black text-[12px] uppercase text-[#0A1128] mt-0.5 mb-0.5 leading-tight">{item.title}</h3>
                    <p className="font-sans text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Central Spine Timeline (md and up) */}
          <div className="hidden md:flex relative w-full items-center mt-12 mb-12 min-h-[400px]">
            
            {/* The Wavy Snake Line */}
            <svg className="absolute top-1/2 left-[6.25%] right-[6.25%] w-[87.5%] h-[120px] -translate-y-1/2 z-0 overflow-visible pointer-events-none" viewBox="0 0 700 200" preserveAspectRatio="none">
              <path 
                d="M0,100 Q50,0 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100" 
                fill="none" 
                stroke="black" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="flex w-full justify-between items-center relative z-10">
              {timelineData.map((item, idx) => {
                const isTop = idx % 2 === 0;
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: isTop ? -50 : 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center relative flex-1 group"
                  >
                    
                    {isTop ? (
                      // Card Above
                      <div className="absolute bottom-[10px] flex flex-col items-center pb-2 w-full">
                        <div className="bg-white border-[3px] border-black p-2 shadow-[4px_4px_0_0_#1a1a1a] transform transition-transform hover:-translate-y-2 hover:shadow-[6px_6px_0_0_#1a1a1a] w-[90%] max-w-[160px] relative z-20 mb-2">
                          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-2 border-black shadow-[2px_2px_0_0_#1a1a1a] z-10 rotate-6" style={{ backgroundColor: item.color }}></div>
                          <div className="font-mono font-bold text-[9px] lg:text-[10px] mb-1 px-1.5 py-0.5 border-2 border-black inline-block" style={{ backgroundColor: item.color }}>{item.time}</div>
                          <h3 className="font-display font-black text-[11px] lg:text-xs uppercase text-[#0A1128] mt-1 mb-0.5 leading-tight">{item.title}</h3>
                          <p className="font-sans text-[8px] lg:text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{item.desc}</p>
                        </div>
                        {/* Connecting Stem */}
                        <div className="w-1 h-6 bg-black z-0"></div>
                      </div>
                    ) : (
                      // Card Below
                      <div className="absolute top-[10px] flex flex-col items-center pt-2 w-full">
                        {/* Connecting Stem */}
                        <div className="w-1 h-6 bg-black z-0"></div>
                        <div className="bg-white border-[3px] border-black p-2 shadow-[4px_4px_0_0_#1a1a1a] transform transition-transform hover:translate-y-2 hover:shadow-[6px_6px_0_0_#1a1a1a] w-[90%] max-w-[160px] relative z-20 mt-2">
                          <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-2 border-black shadow-[2px_2px_0_0_#1a1a1a] z-10 -rotate-6" style={{ backgroundColor: item.color }}></div>
                          <div className="font-mono font-bold text-[9px] lg:text-[10px] mb-1 px-1.5 py-0.5 border-2 border-black inline-block" style={{ backgroundColor: item.color }}>{item.time}</div>
                          <h3 className="font-display font-black text-[11px] lg:text-xs uppercase text-[#0A1128] mt-1 mb-0.5 leading-tight">{item.title}</h3>
                          <p className="font-sans text-[8px] lg:text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    )}

                    {/* Node on the central line */}
                    <div className="w-5 h-5 border-[3px] border-black bg-white shadow-[2px_2px_0_0_#1a1a1a] z-10 hover:scale-150 transition-transform cursor-pointer relative" style={{ backgroundColor: item.color }}></div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
