"use client";

import { motion } from "framer-motion";

const mentors = [
  { name: "Alice Jenkins", role: "Design Lead", img: "https://i.pravatar.cc/300?img=1", fact: "Hates Comic Sans" },
  { name: "Bob Martin", role: "System Architect", img: "https://i.pravatar.cc/300?img=11", fact: "Sleeps in vim" },
  { name: "Charlie Day", role: "Chaos Engineer", img: "https://i.pravatar.cc/300?img=33", fact: "Deploys on Fridays" },
  { name: "Diana Prince", role: "Frontend Wizard", img: "https://i.pravatar.cc/300?img=5", fact: "Centers divs easily" },
];

export default function Team() {
  return (
    <section id="mentors" className="py-24 md:py-32 relative bg-[#f9f8f6]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <h2 className="font-display font-black text-6xl md:text-8xl uppercase leading-[0.85]">
            The <br /> Mentors
          </h2>
          <div className="font-handwriting text-2xl md:text-3xl text-[#0055FF] max-w-xs mt-6 md:mt-0 transform -rotate-3 bg-white p-3 border-2 border-black shadow-[4px_4px_0_0_#1a1a1a]">
            People who might actually know what they're doing.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Polaroid Frame */}
              <div className={`bg-white p-4 pb-20 border-2 border-black shadow-[8px_8px_0_0_#1a1a1a] transform transition-transform duration-300 ${i % 2 === 0 ? 'rotate-2 group-hover:-rotate-1' : '-rotate-3 group-hover:rotate-1'}`}>
                <div className="aspect-square bg-gray-200 border-2 border-black overflow-hidden relative">
                  <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" />
                  
                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-orange-200/80 rotate-2 mix-blend-multiply z-10"></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display font-bold text-xl uppercase leading-tight">{mentor.name}</h3>
                  <p className="font-sans text-sm font-medium text-gray-600">{mentor.role}</p>
                </div>
              </div>

              {/* Handwritten Fact (appears on hover) */}
              <div className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 font-handwriting text-xl md:text-2xl text-[#FF0033] bg-[#f9f8f6] px-3 py-1 border border-black transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-sm pointer-events-none whitespace-nowrap">
                "{mentor.fact}"
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
