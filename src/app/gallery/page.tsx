"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Code2, ExternalLink, Video, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROBLEM_STATEMENTS } from "../submit/page";

interface Project {
  id: string;
  project_title: string;
  problem_statement: string;
  short_description: string;
  our_approach: string;
  challenges: string;
  tech_stack: string;
  github_link: string;
  live_demo_link: string;
  youtube_link: string;
  screenshots: string[];
  logo_url: string;
  team_name: string;
  is_winner?: boolean;
  winner_position?: string;
  winner_message?: string;
}

export default function GalleryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [problemFilter, setProblemFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/gallery", { cache: 'no-store' });
        const data = await res.json();
        if (data.submissions) {
          // First, randomize the order
          let shuffled = [...data.submissions];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }

          // Then stably sort winners to the front
          const sorted = shuffled.sort((a: Project, b: Project) => {
            // Keep relative randomized order for non-winners
            if (!a.is_winner && !b.is_winner) return 0;
            
            // Winners come before non-winners
            if (a.is_winner && !b.is_winner) return -1;
            if (!a.is_winner && b.is_winner) return 1;
            
            // If both are winners, extract the number from position (e.g. "1st" -> 1)
            const aNum = parseInt(a.winner_position || "");
            const bNum = parseInt(b.winner_position || "");
            const aVal = isNaN(aNum) ? 99 : aNum;
            const bVal = isNaN(bNum) ? 99 : bNum;

            if (aVal !== bVal) {
              return aVal - bVal;
            }
            
            // If both don't start with a number (like "Best Boy"), sort alphabetically
            const aStr = (a.winner_position || "").toLowerCase();
            const bStr = (b.winner_position || "").toLowerCase();
            return aStr.localeCompare(bStr);
          });
          setProjects(sorted);
        }
      } catch (err) {
        console.error("Failed to load gallery", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Use the predefined problem statements for the filter
  const problemStatements = ["All", ...PROBLEM_STATEMENTS];

  // Filter projects based on search and problem statement
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.project_title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.team_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProblem = problemFilter === "All" || p.problem_statement === problemFilter;
      return matchesSearch && matchesProblem;
    });
  }, [projects, searchQuery, problemFilter]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ backgroundImage: "var(--paper-grain)" }}>
      {/* Top Navigation */}
      <div className="w-full border-b-2 border-black bg-[#FF4D00] px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display font-black text-white text-sm md:text-base uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Site
          </Link>
          <span className="font-mono text-[10px] md:text-xs text-white/80 font-bold uppercase tracking-widest">
            Project Showcase
          </span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-widest text-[#0A1128] mb-2 transform -rotate-1">
                The <span className="text-[#FF0033]">Gallery</span>
              </h1>
              <p className="font-mono text-sm uppercase tracking-widest font-bold text-gray-500">
                {projects.length} Projects built during the chaos
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative border-2 border-black bg-white flex items-center px-3 py-2 shadow-[4px_4px_0_0_#1a1a1a]">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent font-sans text-sm focus:outline-none w-full sm:w-48"
                />
              </div>
              <div className="relative border-2 border-black bg-white flex items-center px-3 py-2 shadow-[4px_4px_0_0_#1a1a1a]">
                <Filter className="w-4 h-4 text-gray-400 mr-2" />
                <select 
                  value={problemFilter}
                  onChange={(e) => setProblemFilter(e.target.value)}
                  className="bg-transparent font-sans text-sm focus:outline-none w-full sm:w-48 cursor-pointer truncate"
                >
                  {problemStatements.map((ps, i) => (
                    <option key={i} value={ps}>{ps}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 aspect-[4/3] border-4 border-black shadow-[8px_8px_0_0_#1a1a1a]"></div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border-4 border-black border-dashed bg-white/50">
            <h3 className="font-display font-black text-2xl uppercase text-gray-400">No projects found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveScreenshot(project.screenshots?.[0] || null);
                }}
                className={`group relative bg-white flex flex-col h-full cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a] ${project.is_winner ? 'border-4 border-[#00D084]' : 'border-4 border-black'}`}
              >
                {/* Winner Badge */}
                {project.is_winner && (
                  <div className="absolute -top-4 -left-4 z-30 bg-[#00D084] border-2 border-black px-3 py-1 text-black font-display font-black text-sm uppercase tracking-wider transform -rotate-3 shadow-[4px_4px_0_0_#1a1a1a] flex items-center gap-1">
                    <span>🏆 {project.winner_position || 'Winner'}</span>
                  </div>
                )}
                {/* Cover Image */}
                <div className="relative w-full aspect-video border-b-4 border-black bg-gray-100 overflow-hidden">
                  {project.screenshots?.[0] ? (
                    <Image src={project.screenshots[0]} alt={project.project_title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-gray-400 uppercase">No Image</div>
                  )}
                  
                  {/* Logo overlay (Moved to top right to prevent overlapping text, styled to pop) */}
                  {project.logo_url && (
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full border-4 border-black bg-white p-0.5 shadow-[4px_4px_0_0_#FFB800] z-20 flex items-center justify-center">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src={project.logo_url} alt="Logo" fill className="object-cover bg-white" unoptimized />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-black text-xl uppercase text-[#0A1128] line-clamp-1 group-hover:text-[#FF4D00] transition-colors">{project.project_title}</h3>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 line-clamp-1">{project.team_name}</p>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-[#FFB800]/20 border border-[#FFB800] text-[#FF4D00] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 mb-2 line-clamp-1">
                      {project.problem_statement}
                    </span>
                    <p className="font-sans text-sm text-gray-700 line-clamp-2 leading-snug">{project.short_description}</p>
                  </div>

                  <div className="mt-auto pt-4 border-t-2 border-black/10 flex flex-wrap gap-1.5 overflow-hidden">
                    {project.tech_stack.split(',').slice(0, 3).map((tech, i) => tech.trim() && (
                      <span key={i} title={tech.trim()} className="font-mono text-[8px] font-bold uppercase tracking-wider bg-[#0055FF] text-white px-2 py-0.5 border border-black max-w-full truncate inline-block">
                        {tech.trim()}
                      </span>
                    ))}
                    {project.tech_stack.split(',').length > 3 && (
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider bg-gray-200 text-gray-600 px-2 py-0.5 border border-black">
                        +{project.tech_stack.split(',').length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Brutalist Modal Details View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black w-full max-w-5xl my-auto relative shadow-[16px_16px_0_0_#FF4D00]"
              style={{ backgroundImage: 'var(--paper-grain)' }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF0033] border-4 border-black flex items-center justify-center text-white hover:bg-black transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden p-6 md:p-10 custom-scrollbar">
                
                {/* Header section */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                  {selectedProject.logo_url && (
                    <div className="w-24 h-24 shrink-0 border-4 border-black bg-gray-50 relative p-2 shadow-[4px_4px_0_0_#1a1a1a]">
                      <Image src={selectedProject.logo_url} alt="Logo" fill className="object-contain" unoptimized />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="font-display font-black text-4xl md:text-5xl text-[#0A1128] uppercase leading-none mb-2">{selectedProject.project_title}</h2>
                    <p className="font-mono text-sm md:text-base font-bold text-gray-500 uppercase tracking-widest mb-4">By Team {selectedProject.team_name}</p>
                    
                    {selectedProject.is_winner && (
                      <div className="mb-4 inline-flex flex-col gap-1 bg-[#00D084]/10 border-2 border-[#00D084] p-3">
                        <span className="font-display font-black text-[#00D084] text-xl uppercase flex items-center gap-2">
                          <span>🏆</span> {selectedProject.winner_position || 'Winner'}
                        </span>
                        {selectedProject.winner_message && (
                          <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                            "{selectedProject.winner_message}"
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex">
                      <div className="inline-block bg-[#FFB800] border-2 border-black px-4 py-1.5 shadow-[2px_2px_0_0_#1a1a1a]">
                        <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#0A1128]">Problem: {selectedProject.problem_statement}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Main Details */}
                  <div className="lg:col-span-2 space-y-8">
                    {selectedProject.screenshots?.length > 0 && (
                      <div className="space-y-4">
                        {/* Main Screenshot Container */}
                        <div className="border-4 border-black bg-black p-1 shadow-[6px_6px_0_0_#1a1a1a]">
                          <button 
                            onClick={() => setFullScreenImage(activeScreenshot || selectedProject.screenshots[0])}
                            className="relative w-full aspect-video block cursor-zoom-in group"
                          >
                            <Image src={activeScreenshot || selectedProject.screenshots[0]} alt="Preview" fill className="object-contain bg-black" unoptimized />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-mono font-bold uppercase tracking-widest border-2 border-white px-4 py-2">Click to Enlarge</span>
                            </div>
                          </button>
                        </div>
                        
                        {/* Thumbnails on main background */}
                        {selectedProject.screenshots?.length > 1 && (
                          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                            {selectedProject.screenshots.map((url, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveScreenshot(url)}
                                className={`relative w-24 md:w-32 aspect-video shrink-0 border-[3px] shadow-[3px_3px_0_0_#1a1a1a] ${activeScreenshot === url ? 'border-[#FF4D00] shadow-[#FF4D00]' : 'border-black hover:border-gray-600'} bg-white transition-all hover:-translate-y-1`}
                              >
                                <Image src={url} alt={`Screenshot ${i + 1}`} fill className="object-cover p-0.5" unoptimized />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-display font-black text-2xl uppercase tracking-wider text-[#FF4D00] mb-3">Overview</h3>
                      <p className="font-sans text-base leading-relaxed text-gray-800 bg-gray-50 p-6 border-2 border-black">{selectedProject.short_description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-display font-black text-xl uppercase tracking-wider text-[#0055FF] mb-3">Our Approach</h3>
                        <p className="font-sans text-sm text-gray-800 bg-gray-50 p-5 border-2 border-black whitespace-pre-wrap">{selectedProject.our_approach}</p>
                      </div>
                      <div>
                        <h3 className="font-display font-black text-xl uppercase tracking-wider text-[#FF0033] mb-3">Challenges</h3>
                        <p className="font-sans text-sm text-gray-800 bg-gray-50 p-5 border-2 border-black whitespace-pre-wrap">{selectedProject.challenges}</p>
                      </div>
                    </div>
                    
                  </div>

                  {/* Right Column - Tech Stack & Links */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-display font-black text-xl uppercase tracking-wider text-[#0A1128] mb-4">Links</h3>
                      <div className="flex flex-col gap-3">
                        {selectedProject.github_link && (
                          <a href={selectedProject.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider bg-white border-2 border-black p-4 hover:bg-[#0A1128] hover:text-white transition-colors shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                            <Code2 className="w-5 h-5" /> Source Code
                          </a>
                        )}
                        {selectedProject.live_demo_link && (
                          <a href={selectedProject.live_demo_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider bg-[#FFB800] border-2 border-black p-4 hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                            <ExternalLink className="w-5 h-5" /> Live Demo
                          </a>
                        )}
                        {selectedProject.youtube_link && (
                          <a href={selectedProject.youtube_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider bg-white border-2 border-black p-4 hover:bg-[#FF0033] hover:text-white transition-colors shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                            <Video className="w-5 h-5" /> Video Demo
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl uppercase tracking-wider text-[#0A1128] mb-4">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech_stack.split(',').map((tech, i) => tech.trim() && (
                          <span key={i} className="font-mono text-xs font-bold uppercase tracking-wider bg-[#0A1128] text-white px-3 py-1 border-2 border-black">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-xl"
            onClick={() => setFullScreenImage(null)}
          >
            <button 
              onClick={() => setFullScreenImage(null)}
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
                src={fullScreenImage} 
                alt="Project Screenshot" 
                fill 
                className="object-contain" 
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS for custom scrollbar in modal */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f9f8f6; border-left: 2px solid #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF4D00; border-left: 2px solid #000; border-bottom: 2px solid #000; }
      `}} />
    </div>
  );
}
