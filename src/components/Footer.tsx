"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#f9f8f6] py-6 md:py-8 overflow-hidden border-t-4 border-black" style={{ backgroundImage: 'var(--paper-grain)' }}>
      {/* Notebook holes */}
      <div className="absolute left-2 md:left-6 top-0 bottom-0 w-8 flex flex-col justify-between py-6 border-r-2 border-[#1a1a1a]/10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black bg-white shadow-[inset_2px_2px_0_0_rgba(0,0,0,0.2)] ml-1 md:ml-0.5"></div>
        ))}
      </div>

      <div className="w-full px-6 pl-14 md:pl-24 pr-8 md:pr-16 relative z-10 flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start">
          
          {/* Left Side: Branding & Location */}
          <div className="flex flex-col w-full md:w-[45%] gap-2 md:gap-3">
            
            {/* Crazy Build + Logo */}
            <div className="flex items-center gap-3">
              <h2 className="font-['Gerbil'] font-bold text-xl md:text-xl text-[#0A1128] leading-none tracking-wider">
                Crazy Build
              </h2>
              {/* Crazy Build Logo Placeholder */}
              <Image src="/logo.png" alt="Crazy Build Logo" width={80} height={32} className="h-6 md:h-8 w-auto object-contain" />
            </div>

            {/* Powered By */}
            <div className="flex flex-row items-center gap-2 mt-1">
              <span className="font-sans font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500">Powered By</span>
              <a href="https://rabbitt.ai/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image src="/rabbit.svg" alt="Rabbitt AI" width={100} height={20} className="h-4 md:h-5 w-auto object-contain" />
              </a>
            </div>

            {/* Organised By */}
            <div className="flex flex-row items-center gap-2 mt-1">
              <span className="font-sans font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500">Organised by</span>
              <Image src="/codingclub.png" alt="Coding Club" width={30} height={24} className="h-5 md:h-6 w-auto object-contain" />
            </div>

            {/* Location */}
            <div className="font-sans font-bold text-xs md:text-sm mt-2 text-gray-700 leading-snug">
              Hosted in JISCE Campus<br/>
              Kalyani, Nadia
            </div>
          </div>

          {/* Vertical Divider (Hidden on mobile) */}
          <div className="hidden md:block w-[2px] self-stretch bg-black/10 mx-auto"></div>

          {/* Right Side: Links & Contact */}
          <div className="flex flex-col sm:flex-row gap-8 md:gap-16 w-full md:w-[45%] md:justify-end mt-8 md:mt-0">
            
            {/* STALK US */}
            <div className="flex flex-col">
              <h3 className="font-display font-black text-sm md:text-base uppercase border-b-2 border-black pb-1 mb-3 inline-block w-max">
                Stalk Us
              </h3>
              <ul className="flex flex-col gap-3 font-sans font-bold text-xs md:text-sm uppercase tracking-wider text-gray-700">
                <li>
                  <a href="https://x.com/codingclubjisce" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#0055FF] transition-colors group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.035z" />
                    </svg>
                    <span className="relative inline-block">Twitter<span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0055FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/codingclub.jisce/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#0055FF] transition-colors group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="relative inline-block">Instagram<span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0055FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/jisce-coding-club/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#0055FF] transition-colors group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="relative inline-block">LinkedIn<span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0055FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></span>
                  </a>
                </li>
              </ul>
            </div>

            {/* HOLLER */}
            <div className="flex flex-col">
              <h3 className="font-display font-black text-sm md:text-base uppercase border-b-2 border-black pb-1 mb-3 inline-block w-max">
                Holler
              </h3>
              <div className="flex flex-col font-sans font-bold text-xs md:text-sm tracking-wider">
                <a href="mailto:crazybuild2026@gmail.com" className="flex items-center gap-2 hover:text-[#FF0033] transition-colors text-gray-700 group">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-[#FF0033] transition-colors">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  crazybuild2026@gmail.com
                </a>
              </div>
            </div>

            {/* ADMIN HQ BUTTON */}
            <div className="flex flex-col">
              <a href="/admin" className="mt-2 md:mt-0 font-display font-black text-xs uppercase tracking-widest bg-[#FFB800] text-[#0A1128] border-2 border-black px-4 py-2 shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Admin HQ
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Centered Signature & Copyright */}
        <div className="flex flex-col items-center justify-center mt-8 pt-4 text-center w-full">
          <div className="font-handwriting text-lg md:text-xl text-[#0055FF] mb-2">
            See You at Crazy Build....
          </div>
          <div className="font-sans font-bold text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500">
            2026 CRAZY BUILD. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
}
