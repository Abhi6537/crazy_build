"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#roadmap" },
    { name: "Themes", href: "#themes" },
    { name: "Sponsors", href: "#backers" },
    { name: "Mentors", href: "#mentors" },
    { name: "Team", href: "#team" },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-4 bg-[#f9f8f6]/90 backdrop-blur-md border-b-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-display font-black text-2xl tracking-tighter uppercase relative group flex items-center gap-3 -ml-4 md:-ml-8">
            <img 
              src="/logo.png" 
              alt="Logo" 
              draggable={false}
              className="w-10 h-10 object-contain mix-blend-multiply"
            />
            <span className="relative z-10">CRAZY BUILD</span>
            <span className="absolute -bottom-1 left-12 w-[calc(100%-3rem)] h-3 bg-[#FF4D00]/20 -z-0 group-hover:bg-[#FF4D00]/40 transition-colors transform -skew-x-12"></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center font-display font-bold text-sm uppercase tracking-widest px-8 py-3 bg-[#FF4D00] text-white shadow-[4px_4px_0_0_#1a1a1a] border-2 border-black">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="relative group hover:scale-110 transition-transform"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 bg-[#f9f8f6] flex flex-col justify-center items-center md:hidden"
        style={{ backgroundImage: 'var(--paper-grain)' }}
      >
        <nav className="flex flex-col gap-8 text-center font-display font-bold text-4xl uppercase items-center">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF4D00] transition-colors relative group inline-block"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#FF4D00]/10 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </motion.a>
          ))}
          
        </nav>
      </motion.div>
    </>
  );
}
