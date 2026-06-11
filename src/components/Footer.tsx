"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#f9f8f6] pt-24 pb-16 overflow-hidden border-t-4 border-black" style={{ backgroundImage: 'var(--paper-grain)' }}>
      {/* Notebook holes */}
      <div className="absolute left-2 md:left-6 top-0 bottom-0 w-8 flex flex-col justify-between py-12 border-r-2 border-[#1a1a1a]/10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-black bg-white shadow-[inset_2px_2px_0_0_rgba(0,0,0,0.2)] ml-1 md:ml-0"></div>
        ))}
      </div>

      <div className="container mx-auto px-6 pl-14 md:pl-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          
          <div>
            <h3 className="font-display font-black text-3xl uppercase mb-6 inline-block relative">
              The Details
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF4D00] transform -rotate-1"></div>
            </h3>
            <ul className="space-y-4 font-sans font-medium text-lg">
              <li>Nov 15 - 17, 2026</li>
              <li>The Warehouse, Brooklyn NY</li>
              <li>Bring your own keyboard</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-black text-3xl uppercase mb-6 inline-block relative">
              Stalk Us
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#0055FF] transform rotate-1"></div>
            </h3>
            <ul className="space-y-4 font-sans font-medium text-lg">
              <li><a href="#" className="hover:text-[#0055FF] transition-colors relative group">Twitter <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0055FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></a></li>
              <li><a href="#" className="hover:text-[#0055FF] transition-colors relative group">Instagram <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0055FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></a></li>
              <li><a href="#" className="hover:text-[#0055FF] transition-colors relative group">GitHub <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0055FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-black text-3xl uppercase mb-6 inline-block relative">
              Holler
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF0033] transform -rotate-2"></div>
            </h3>
            <p className="font-sans font-medium text-lg mb-4">
              Questions? Complaints? Ideas?<br/>
              <a href="mailto:hello@crazybuild.com" className="font-bold hover:text-[#FF0033] transition-colors">hello@crazybuild.com</a>
            </p>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t-2 border-black border-dashed mt-12 relative">
          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest mb-8 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} CRAZY BUILD. All rights reserved. (Or not).
          </p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-right"
          >
            <div className="font-handwriting text-4xl md:text-5xl text-[#1a1a1a] transform -rotate-3 leading-tight">
              See you at <br className="md:hidden" /> CRAZY BUILD!
            </div>
            {/* Signature scribble */}
            <svg className="w-32 h-12 inline-block text-[#FF4D00] mt-2 transform -rotate-12" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 20 C 20 10, 30 30, 40 10 C 50 0, 60 25, 70 15 C 80 5, 90 20, 95 10" />
            </svg>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
