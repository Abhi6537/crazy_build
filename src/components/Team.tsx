"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  { name: "Piyush Mondal", role: "", img: "/piyush.jpg", linkedin: "https://www.linkedin.com/in/piyush-mondal-a6588a277/" },
  { name: "Dhrubojyoti Saha", role: "", img: "/dhrubo.png", linkedin: "https://www.linkedin.com/in/dhrubojyoti-saha-420120327/" },
  { name: "Kaustav Chakraborty", role: "", img: "/kaustav.jpeg", linkedin: "https://www.linkedin.com/in/kaustav-chakraborty-2009292a9/" },
  { name: "Akash Nath", role: "", img: "/akash.png", linkedin: "https://www.linkedin.com/in/akash-nath29/" },
  { name: "Rohit Debnath", role: "", img: "/rohit.png", linkedin: "https://www.linkedin.com/in/rohit-debnath/" },
  { name: "Abhinabha Biswas", role: "", img: "/avianaba.png", linkedin: "https://www.linkedin.com/in/abhinaba-biswas" },
  { name: "Abhinandan Ghosh", role: "", img: "/abhi.jpg", linkedin: "https://www.linkedin.com/in/abhinandan-ghosh-jis/" },
  { name: "Piuli Biswas", role: "", img: "/piuli.png", linkedin: "https://www.linkedin.com/in/piuli-biswas" },
  { name: "Swapna Pal Chowdhury", role: "", img: "/swapna.png", linkedin: "https://www.linkedin.com/in/swapna-pal-chowdhury-b5097732a/" },
  { name: "Anwesha Das", role: "", img: "/anwesha.jpeg", linkedin: "https://www.linkedin.com/in/anwesha-das-0a8361330/" },
  { name: "Rajarshi Mandal", role: "", img: "/Rajarshi.jpeg", linkedin: "https://www.linkedin.com/in/rajarshi-mondal-97742432b/" }
];

const TeamCard = ({ member, delay }: { member: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -5, scale: 1.05 }}
    className="w-full aspect-square bg-gray-200 border-2 md:border-[3px] border-black shadow-[3px_3px_0_0_#1a1a1a] md:shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[4px_4px_0_0_#FF4D00] md:hover:shadow-[6px_6px_0_0_#FF4D00] transition-all relative group overflow-hidden cursor-pointer"
  >
    {/* Full-bleed Photo */}
    <Image 
      src={member.img} 
      alt={member.name} 
      fill
      sizes="(max-width: 768px) 33vw, 20vw"
      className="object-cover transition-transform duration-500 group-hover:scale-110" 
    />

    {/* Dark Gradient Overlay for Text Readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

    {/* Text Overlay (Bottom) */}
    <div className="absolute bottom-0 left-0 right-0 p-1 md:p-3 flex flex-col items-start z-10">
      <h3 className="font-display font-black text-white text-[7px] md:text-xs uppercase leading-tight mb-0.5 md:mb-1 drop-shadow-md">
        {member.name}
      </h3>
      <div className="bg-[#FFB800] text-black px-1 md:px-1.5 py-0.5 border border-black group-hover:bg-[#FF4D00] group-hover:text-white transition-colors">
        <span className="font-sans text-[5px] md:text-[9px] font-bold uppercase tracking-widest leading-none block">{member.role}</span>
      </div>
    </div>

    {/* Floating LinkedIn Icon (Top-Right) */}
    <a 
      href={member.linkedin} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="absolute top-1 md:top-2 right-1 md:right-2 bg-white text-black hover:text-[#0055FF] p-1 md:p-1.5 rounded shadow-[1px_1px_0_0_#1a1a1a] md:shadow-[2px_2px_0_0_#1a1a1a] transition-all duration-300 z-20"
    >
      <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>
  </motion.div>
);

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24 relative overflow-hidden border-b-2 border-black">
      {/* Sketchy background lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 20px)' }}></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block border-2 border-black px-6 py-2 shadow-[4px_4px_0_0_#FF4D00] bg-white transform -rotate-1 hover:rotate-0 transition-transform cursor-default mb-4"
          >
            <h2 className="font-display font-black text-xs md:text-5xl uppercase tracking-widest text-[#0A1128]">
              Organising Team
            </h2>
          </motion.div>
        </div>

        {/* Grid Container for Team Members */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6 w-full max-w-[300px] sm:max-w-none mx-auto">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
