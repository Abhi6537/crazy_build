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
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.95, rotate: 2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white border-4 border-black p-2 sm:p-4 md:p-6 shadow-[8px_8px_0_0_#FF4D00] md:shadow-[16px_16px_0_0_#FF4D00] max-w-5xl w-full max-h-[90vh] flex flex-col"
              style={{ backgroundImage: "var(--paper-grain)" }}
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-[#FF0033] border-4 border-black flex items-center justify-center text-white hover:bg-black transition-colors z-50"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="relative w-full flex-1 min-h-[300px] border-4 border-black bg-gray-100">
                <Image 
                  src={selectedPhoto} 
                  alt="Event Memory Popup" 
                  fill 
                  className="object-contain" 
                  unoptimized
                />
              </div>
              <div className="text-center mt-3 md:mt-6 shrink-0">
                <p className="font-display font-black text-lg md:text-2xl uppercase tracking-widest text-[#0A1128]">
                  Crazy Build Memories
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
