"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function Backers() {
  
  const sponsors = [
    { id: 1, isRedacted: false, name: "Corsair", logo: "/corsair-logo.webp", link: "https://corsair.dev/" },
    { id: 2, isRedacted: true, name: "Revealing Soon", logo: "", link: "#" },
    { id: 3, isRedacted: true, name: "Revealing Soon", logo: "", link: "#" },
  ];

  const partners = [
    { id: 1, isRedacted: false, name: "DevDotCom", logo: "/devdotcom_logo.jpg", link: "#" },
    { id: 2, isRedacted: true, name: "Revealing Soon", logo: "", link: "#" },
    { id: 3, isRedacted: true, name: "Revealing Soon", logo: "", link: "#" },
  ];

  return (
    <section id="backers" className="py-12 md:py-16 relative overflow-hidden">
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

          <div className="relative border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#1a1a1a] z-10 bg-white">
            
            {/* Tape Doodle */}
            <div className="absolute -top-5 right-10 transform w-20 h-8 bg-blue-200/80 rotate-3 mix-blend-multiply border border-black/10 z-20"></div>
          
            {/* Section Header */}
            <div className="flex justify-center mb-8 md:mb-12 relative">
              <motion.div 
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-block border-4 border-black px-6 py-2 md:py-3 shadow-[6px_6px_0_0_#FF4D00] bg-white relative z-10 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#FF4D00] transition-all cursor-default overflow-hidden group"
              >
                {/* Highlight sweep effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                
                <h2 className="font-display font-black text-xs md:text-xl uppercase text-[#0A1128] tracking-widest text-center relative z-10">
                  Sponsors & Partners
                </h2>
              </motion.div>
            </div>

            {/* Sponsors Row */}
            <div className="mb-12">
              <h3 className="font-mono text-base md:text-xl font-bold uppercase mb-8 text-center border-b-4 border-black inline-block pb-1.5">Sponsors</h3>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full relative z-10">
                {sponsors.map((item) => (
                  <a 
                    key={item.id} 
                    href={item.link} 
                    target={item.isRedacted ? "_self" : "_blank"} 
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center group transition-all w-24 md:w-40 ${item.isRedacted ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={(e) => item.isRedacted && e.preventDefault()}
                  >
                    <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
                      {item.isRedacted ? (
                        <div className="flex flex-col items-center justify-center text-black/10 group-hover:text-black/30 transition-colors w-full h-full">
                          <Lock className="w-10 h-10 md:w-16 md:h-16" />
                        </div>
                      ) : item.logo ? (
                        <Image src={item.logo} alt={item.name} fill className="object-contain transition-all duration-500" />
                      ) : (
                        <span className="font-display font-black text-xl uppercase tracking-widest text-center">{item.name}</span>
                      )}
                    </div>
                    <span className={`font-sans font-black text-[10px] md:text-sm uppercase tracking-wider text-center transition-colors ${item.isRedacted ? 'text-black/20' : 'text-gray-800 group-hover:text-[#FFB800]'}`}>
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Community Partners Row */}
            <div>
              <h3 className="font-mono text-base md:text-xl font-bold uppercase mb-8 text-center border-b-4 border-black inline-block pb-1.5">Community Partners</h3>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full relative z-10">
                {partners.map((item) => (
                  <a 
                    key={item.id} 
                    href={item.link} 
                    target={item.isRedacted ? "_self" : "_blank"} 
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center group transition-all w-24 md:w-32 ${item.isRedacted ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={(e) => item.isRedacted && e.preventDefault()}
                  >
                    <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
                      {item.isRedacted ? (
                        <div className="flex flex-col items-center justify-center text-black/10 group-hover:text-black/30 transition-colors w-full h-full">
                          <Lock className="w-8 h-8 md:w-12 md:h-12" />
                        </div>
                      ) : item.logo ? (
                        <Image src={item.logo} alt={item.name} fill className="object-contain transition-all duration-500" />
                      ) : (
                        <span className="font-display font-black text-lg uppercase tracking-widest text-center">{item.name}</span>
                      )}
                    </div>
                    <span className={`font-sans font-black text-[9px] md:text-xs uppercase tracking-wider text-center transition-colors ${item.isRedacted ? 'text-black/20' : 'text-gray-800 group-hover:text-[#0055FF]'}`}>
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
