"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Mentors() {
  
  const mentors = [
    { 
      id: 1, 
      name: "Nirupon Pal", 
      role: "GSoC'26 @FOSSASIA", 
      img: "/nirupan pal.jpeg",
      linkedin: "https://www.linkedin.com/in/nirupon-pal-413a3b345/"
    },
    { 
      id: 2, 
      name: "Milind Kundu", 
      role: "AI Engineer @SKR . Ex-Intern @Tata Steel", 
      img: "/milid kundu.jpeg",
      linkedin: "https://www.linkedin.com/in/milind-kundu-348017286/"
    },
    { 
      id: 3, 
      name: "Dhrubojyoti Saha", 
      role: "Designer @Fastgistics", 
      img: "/dhrubojyoti saha.png",
      linkedin: "https://www.linkedin.com/in/dhrubojyoti-saha-420120327/"
    },
    { 
      id: 4, 
      name: "Somyadip Ghosh", 
      role: "Intern @Quantum Tiger", 
      img: "/soumydip.jpg",
      linkedin: "https://www.linkedin.com/in/somyadipghosh/"
    },
{ 
      id: 5, 
      name: "Abhinaba Biswas", 
      role: "AI Engineer @Heva AI", 
      img: "/avianaba.png",
      linkedin: "https://www.linkedin.com/in/abhinaba-biswas/"
    },
    {
      id: 6, 
      name: "Piyush Mondal", 
      role: "AI Engineer @LanceSoft Inc.", 
      img: "/piyush.jpg",
      linkedin: "https://www.linkedin.com/in/piyush-mondal-a6588a277/"
    },
    {
      id: 7, 
      name: "Paramita Das", 
      role: "Ex-SDE Intern @Zorvyn", 
      img: "/paramita.jpeg",
      linkedin: "https://www.linkedin.com/in/paramita-das-14116b2b4/"
    },
    {
      id: 8, 
      name: "Priyanshu Ghosh", 
      role: "AI INTERN @MOHUR", 
      img: "/priyanshu.jpeg",
      linkedin: "https://www.linkedin.com/in/priyanshugh/"
    },
    {
      id: 9, 
      name: "Arkaprava Das", 
      role: "Backend Engineer @Heva AI", 
      img: "/arkaprava.jpg",
      linkedin: "https://www.linkedin.com/in/arkaprava-das-0524a928b/"
    },


  
  ];


  return (
    <section id="mentors" className="py-12 md:py-16 relative overflow-hidden bg-white">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0055FF] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0A1128] opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center relative"
        >
          <div className="inline-block relative">
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-widest text-[#0A1128] relative z-10 bg-white px-4 py-2 border-4 border-black shadow-[6px_6px_0_0_#0055FF]">
              Mentors
            </h2>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-black rotate-12 z-0"></div>
          </div>
          <p className="mt-6 font-mono text-sm uppercase tracking-widest text-gray-500 font-bold">
            Guidance from the best
          </p>
        </motion.div>

        {/* Mentors Grid / Carousel */}
        <div className="w-full flex md:grid md:grid-cols-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-3 md:gap-x-4 lg:gap-x-5 gap-y-5 lg:gap-y-6 max-w-5xl mx-auto pb-6 md:pb-0 relative z-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 md:px-0">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
              className={`col-span-2 ${idx === 5 ? 'md:col-start-2' : ''} bg-[#f4f4f0] border-2 md:border-[3px] border-black shadow-[3px_3px_0_0_#1a1a1a] md:shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[4px_4px_0_0_#0055FF] md:hover:shadow-[6px_6px_0_0_#0055FF] hover:-translate-y-1 hover:-translate-x-1 transition-all group flex flex-col overflow-hidden relative shrink-0 snap-center w-[140px] md:w-auto`}
            >
              {/* LinkedIn Link Overlay */}
              {mentor.linkedin && (
                <a 
                  href={mentor.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute top-1.5 right-1.5 md:top-2 md:right-2 bg-white border border-black md:border-2 p-1 md:p-1.5 z-20 hover:bg-[#0077b5] hover:text-white transition-colors shadow-[1px_1px_0_0_#1a1a1a] md:shadow-[2px_2px_0_0_#1a1a1a] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}

              {/* Compact Square Image */}
              <div className="w-full aspect-square relative border-b-2 md:border-b-[3px] border-black bg-[#0A1128] overflow-hidden">
                {mentor.img ? (
                  <Image
                    src={mentor.img}
                    alt={mentor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 140px, 20vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/30 space-y-1 md:space-y-2">
                    <svg className="w-6 h-6 md:w-8 md:h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span className="font-mono text-[8px] md:text-[10px] uppercase font-bold tracking-widest">Locked</span>
                  </div>
                )}
              </div>

              {/* Text Content - Compact */}
              <div className="p-2 md:p-3 flex flex-col flex-1 bg-white relative">
                {/* Small deco dot */}
                <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 w-1 h-1 md:w-1.5 md:h-1.5 bg-[#0055FF] rounded-full"></div>
                
                <h3 className="font-display font-black text-xs md:text-sm uppercase tracking-wider leading-tight text-[#0A1128] group-hover:text-[#0055FF] transition-colors mt-1 md:mt-1.5">
                  {mentor.name}
                </h3>
                
                <p className="font-sans font-bold text-[8px] md:text-[9px] text-gray-600 uppercase tracking-widest mt-0.5 md:mt-1 leading-snug line-clamp-2">
                  {mentor.role}
                </p>
              </div>
              
              {/* Bottom accent bar */}
              <div className="h-1 md:h-1.5 w-full bg-[#0055FF] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 absolute bottom-0 left-0"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
