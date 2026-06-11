"use client";

import { motion } from "framer-motion";

const milestones = [
  { id: 1, date: "Friday, 6:00 PM", title: "The Pitch", desc: "Teams form. Ideas clash. The chaos begins." },
  { id: 2, date: "Saturday, 2:00 AM", title: "The Crisis", desc: "First major bugs. Coffee reserves low." },
  { id: 3, date: "Saturday, 3:00 PM", title: "The Pivot", desc: "Realizing the original idea is impossible. Changing everything." },
  { id: 4, date: "Sunday, 9:00 AM", title: "The Polish", desc: "Desperately making it look like it works." },
  { id: 5, date: "Sunday, 2:00 PM", title: "The Demo", desc: "Showtime. May the demo gods have mercy." }
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 relative border-y-2 border-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24 md:mb-32">
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase inline-block relative">
            The Roadmap
            <svg className="absolute -top-6 -right-10 w-20 h-20 transform rotate-12" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#FF0033" strokeWidth="4" fill="none" strokeDasharray="10 10" />
            </svg>
          </h2>
          <p className="font-handwriting text-3xl text-[#0055FF] mt-6 transform -rotate-2">A completely unrealistic schedule.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop Horizontal, Mobile Vertical) */}
          <div className="absolute left-6 md:left-0 md:top-1/2 w-1 h-full md:w-full md:h-1 bg-transparent border-l-4 md:border-l-0 md:border-t-4 border-black border-dashed opacity-30 transform -translate-x-1/2 md:-translate-y-1/2 md:translate-x-0 z-0"></div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-12 md:gap-6">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col md:items-center relative pl-16 md:pl-0 w-full md:w-1/5"
              >
                {/* Node */}
                <div className="absolute left-0 top-0 md:static md:mb-8 w-12 h-12 bg-[#F9F8F6] border-4 border-black rounded-full flex items-center justify-center font-display font-bold text-xl shadow-[4px_4px_0_0_#FF4D00] transform -translate-x-1/2 md:translate-x-0 z-10 hover:scale-110 transition-transform">
                  {m.id}
                </div>

                {/* Content Card */}
                <div className={`bg-[#f9f8f6] border-2 border-black p-6 w-full shadow-[6px_6px_0_0_#1a1a1a] ${i % 2 === 0 ? 'md:mt-8 transform rotate-2' : 'md:-mt-56 transform -rotate-2'} hover:rotate-0 transition-transform relative`}>
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-300 border-2 border-black rounded-sm shadow-sm rotate-12"></div>
                  <div className="font-handwriting text-xl text-[#FF4D00] mb-2">{m.date}</div>
                  <h3 className="font-display font-bold text-2xl uppercase mb-3 leading-none">{m.title}</h3>
                  <p className="font-sans text-base leading-relaxed">{m.desc}</p>
                </div>
                
                {/* Doodles for specific items */}
                {i === 2 && (
                  <svg className="absolute -top-12 -right-4 w-16 h-16 md:block hidden text-[#0055FF] rotate-12 z-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                    <path d="M16 21v-5h5"></path>
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
