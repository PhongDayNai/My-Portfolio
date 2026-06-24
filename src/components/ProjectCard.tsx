"use client";

import { useState, useRef, useEffect } from "react";
import { Github, Layers, X, Play, Globe } from "lucide-react";
import { Project } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioDataContext";

interface ProjectCardProps {
  project: Project;
  size?: "normal" | "special";
  idx: number;
}

export default function ProjectCard({
  project,
  size = "normal",
  idx,
}: ProjectCardProps) {
  const { lang, translations } = usePortfolio();
  const [isExpanded, setIsExpanded] = useState(false);
  const [xOffset, setXOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  const isSpecial = size === "special";
  const t = translations.sections;

  const updateOffset = () => {
    if (!isExpanded || !cardRef.current || !expandedCardRef.current) return;

    const parentRect = cardRef.current.getBoundingClientRect();
    const expandedWidth = expandedCardRef.current.offsetWidth;
    const windowW = window.innerWidth;
    
    const cellCenterX = parentRect.left + parentRect.width / 2;
    const halfW = expandedWidth / 2;
    const leftEdge = cellCenterX - halfW;
    const rightEdge = cellCenterX + halfW;
    
    let offset = 0;
    let safetyMarginLeft = 24;
    let safetyMarginRight = 32;
    if (windowW >= 1024) {
      safetyMarginLeft = 100; // Tránh Sidebar cố định ở bên trái trên màn hình lớn (lg)
    }
    
    if (leftEdge < safetyMarginLeft) {
      offset = safetyMarginLeft - leftEdge;
    } else if (rightEdge > windowW - safetyMarginRight) {
      offset = (windowW - safetyMarginRight) - rightEdge;
    }
    
    setXOffset(offset);
  };

  useEffect(() => {
    if (isExpanded) {
      updateOffset();
      window.addEventListener("resize", updateOffset);
      return () => {
        window.removeEventListener("resize", updateOffset);
      };
    }
  }, [isExpanded]);

  const handleCardClick = () => {
    if (project.repositories) {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cellCenterX = rect.left + rect.width / 2;
        const windowW = window.innerWidth;
        
        let w = 700;
        if (windowW < 640) w = windowW - 32;
        else if (windowW < 768) w = 500;
        else if (windowW < 1024) w = 600;
        
        const halfW = w / 2;
        const leftEdge = cellCenterX - halfW;
        const rightEdge = cellCenterX + halfW;
        
        let offset = 0;
        let safetyMarginLeft = 24;
        let safetyMarginRight = 32;
        if (windowW >= 1024) {
          safetyMarginLeft = 100; // Tránh Sidebar cố định ở bên trái trên màn hình lớn (lg)
        }
        
        if (leftEdge < safetyMarginLeft) {
          offset = safetyMarginLeft - leftEdge;
        } else if (rightEdge > windowW - safetyMarginRight) {
          offset = (windowW - safetyMarginRight) - rightEdge;
        }
        
        setXOffset(offset);
      }
      setIsExpanded(true);
    }
  };

  const baseCardClasses = `group overflow-hidden rounded-3xl border transition-all shadow-xl cursor-none flex flex-col justify-between`;
  
  const collapsedCardClasses = `${baseCardClasses} h-full w-full bg-[#1e293b]/30 p-8 border-white/5 hover:bg-[#1e293b]/50 ${
    isSpecial ? "border-blue-500/30" : ""
  }`;

  const expandedCardClasses = `${baseCardClasses} h-fit absolute z-40 top-0 left-1/2 w-[90vw] sm:w-[500px] md:w-[600px] lg:w-[700px] bg-[#0f172a] border-white/10 p-8`;

  // Content for the collapsed (standard) card
  const collapsedCardContent = (
    <div className="relative z-0 flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            {isSpecial ? t.featuredProject : t.project}
          </span>

          <div className="flex gap-3 items-center relative z-20">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor-color="rgb(6, 182, 212)"
                className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent transition-all duration-200 p-1.5 rounded-full cursor-none shadow-sm"
                title="Website"
              >
                <Globe size={18} />
              </a>
            )}
            {project.repositories ? (
              <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
                <Layers size={18} />
              </span>
            ) : project.category === "work" ? (
              <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
                <Play size={20} className="fill-current text-blue-500/10 group-hover:fill-blue-500/20 transition-all" />
              </span>
            ) : (
              <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
                <Github size={20} />
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold mb-3 text-xl text-white uppercase tracking-tighter">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
          {project.description[lang]}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto max-h-[60px] overflow-hidden">
        {project.tech.slice(0, 6).map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-white/5"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 6 && (
          <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-500 font-mono border border-white/5 border-dashed" title={project.tech.slice(6).join('; ')}>
            +{project.tech.length - 6}
          </span>
        )}
      </div>
    </div>
  );

  // Content for the expanded (overlay) card
  const expandedCardContent = (
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            {isSpecial ? t.featuredProject : t.project}
          </span>

          <div className="flex items-center gap-2">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor-color="rgb(6, 182, 212)"
                className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent transition-all duration-200 p-1.5 rounded-full cursor-none shadow-sm"
                title="Website"
              >
                <Globe size={18} />
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="close-btn text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-none"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <h3 className="font-bold mb-3 text-xl md:text-2xl text-white uppercase tracking-tighter leading-tight">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          {project.description[lang]}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-white/5 rounded-full text-[9px] text-slate-300 font-mono border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Sub-repositories list */}
        {project.repositories && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              {lang === "vi" ? "Các kho mã nguồn (Repositories):" : "Sub-Repositories:"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {project.repositories.map((repo) => (
                <div
                  key={repo.link}
                  role="button"
                  onClick={() => window.open(repo.link, "_blank", "noopener,noreferrer")}
                  className="sub-repo-link relative flex flex-col p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 rounded-2xl transition-all cursor-none group/repo justify-between min-h-[160px]"
                >
                  <div className="relative z-0 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-sm text-white group-hover/repo:text-blue-400 transition-colors line-clamp-2 pr-2">
                          {repo.title}
                        </h5>
                        <div className="flex items-center gap-2 relative z-20 shrink-0">
                          {repo.website && (
                            <a
                              href={repo.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              data-cursor-color="rgb(6, 182, 212)"
                              className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent transition-all duration-200 p-1.5 rounded cursor-none"
                              title="Website"
                            >
                              <Globe size={14} />
                            </a>
                          )}
                          <Github size={16} className="text-slate-400 group-hover/repo:text-white transition-colors" />
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                        {repo.description[lang]}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto relative z-20">
                      {repo.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-white/5 rounded-full text-[9px] text-slate-300 font-mono border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // If the project has sub-repositories, enable standalone absolute overlay expansion
  if (project.repositories) {
    return (
      <div className="w-full h-full relative" ref={cardRef}>
        {/* Backdrop (z-30) to dim the background and allow click-out close */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-[#030712]/50 backdrop-blur-[2px] z-30 cursor-none"
            />
          )}
        </AnimatePresence>

        {/* Collapsed Card (relative w-full h-full) */}
        <motion.div
          role="button"
          onClick={handleCardClick}
          whileHover={{ y: isExpanded ? 0 : -10 }}
          transition={{
            type: "tween",
            duration: 0.15,
            ease: "easeOut",
          }}
          className={`${collapsedCardClasses} select-none cursor-pointer`}
          style={{ opacity: isExpanded ? 0 : 1 }} // Hide standard card while expanded to prevent ghost overlays
        >
          {collapsedCardContent}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />
        </motion.div>

        {/* Expanded Card Overlay (absolute z-40 centered in slot with dynamic offset) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              ref={expandedCardRef}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`${expandedCardClasses} select-none cursor-default`}
              style={{ x: `calc(-50% + ${xOffset}px)`, originX: 0.5, originY: 0 }}
            >
              {expandedCardContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Standard non-expandable project card linking directly to Play Store or GitHub
  return (
    <motion.div
      role="button"
      onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
      whileHover={{ y: -10 }}
      transition={{
        type: "tween",
        duration: 0.15,
        ease: "easeOut",
      }}
      className={`${collapsedCardClasses} relative`}
    >
      {collapsedCardContent}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />
    </motion.div>
  );
}
