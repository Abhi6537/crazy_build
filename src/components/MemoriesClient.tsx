"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import Marquee from "react-fast-marquee";

interface Photo {
  id: string;
  url: string;
}

export default function MemoriesClient({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!photos || photos.length === 0) return null;


  return (
    <section className="py-10 md:py-16 relative bg-[#0A1128] overflow-hidden border-t-8 border-black">
      {/* Tape decorations */}
      <div className="absolute top-0 left-10 w-32 h-8 bg-[#FFB800] transform -rotate-3 -translate-y-4 border-2 border-black z-10 hidden md:block"></div>
      <div className="absolute top-0 right-10 w-32 h-8 bg-[#FF4D00] transform rotate-3 -translate-y-4 border-2 border-black z-10 hidden md:block"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-6 md:mb-10 text-center md:text-left">
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-widest text-white mb-3 transform -rotate-1">
            Event <span className="text-[#FFB800]">Memories</span>
          </h2>
          <div className="w-16 md:w-24 h-2 bg-[#FF0033] mx-auto md:mx-0"></div>
        </div>
      </div>

      {/* Infinite Marquee via react-fast-marquee */}
      <div className="relative w-full overflow-hidden py-6 md:py-10" style={{ backgroundImage: "var(--paper-grain)" }}>
        <Marquee speed={60} pauseOnHover={true} autoFill={true}>
          {photos.map((photo, i) => (
            <div 
              key={`${photo.id}-${i}`} 
              onClick={() => setSelectedPhoto(photo.url)}
              className="relative shrink-0 h-48 sm:h-64 md:h-80 border-4 border-black -ml-[4px] cursor-pointer group overflow-hidden bg-gray-100 flex items-center justify-center"
            >
              <img 
                src={photo.url} 
                alt="Event Memory" 
                className="h-full w-auto max-w-none object-contain group-hover:scale-105 group-hover:opacity-80 transition-all duration-500" 
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Popup / Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            >
              <Image 
                src={selectedPhoto} 
                alt="Event Memory Popup" 
                fill 
                className="object-contain" 
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
