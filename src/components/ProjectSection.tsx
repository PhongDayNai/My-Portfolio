"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/constants/translations";
import { PROJECTS } from "@/constants";

export default function ProjectSection() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const [activeTab, setActiveTab] = useState<"professional" | "personal">(
    "personal",
  );

  const [profPage, setProfPage] = useState(0);
  const [persPage, setPersPage] = useState(0);

  const currentPage = activeTab === "professional" ? profPage : persPage;
  const setCurrentPage =
    activeTab === "professional" ? setProfPage : setPersPage;

  const list = useMemo(() => {
    return PROJECTS.filter((p) =>
      activeTab === "professional"
        ? p.category === "work"
        : p.category === "personal",
    ).reverse();
  }, [activeTab]);

  const pages = useMemo(() => {
    const result: any[][] = [];
    for (let i = 0; i < list.length; i += 5) {
      result.push(list.slice(i, i + 5));
    }
    return result;
  }, [list]);

  const displayProjects = pages[currentPage] || [];

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <motion.div layout className="space-y-10">
      <div className="flex justify-center">
        <div className="flex p-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {(["personal", "professional"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setProfPage(0);
                setPersPage(0);
              }}
              className="relative px-8 py-2.5 text-sm font-bold uppercase tracking-wider transition-all"
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span
                className={`relative z-10 ${activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
              >
                {t.tabs[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${currentPage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row"
          >
            {displayProjects.map((project, idx) => (
              <div key={project.title} className="col-span-1">
                <ProjectCard
                  project={project}
                  idx={idx}
                  size="normal"
                />
              </div>
            ))}
            {currentPage < pages.length - 1 && (
              <div className="col-span-1">
                <div
                  role="button"
                  onClick={handleNext}
                  className="group overflow-hidden rounded-3xl border border-white/5 bg-[#1e293b]/20 hover:bg-[#1e293b]/40 hover:border-blue-500/20 transition-all shadow-xl cursor-none flex flex-col justify-center items-center h-full p-8 text-center min-h-[220px]"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-white/5 rounded-full border border-white/5 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
                      <ArrowRight size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base uppercase tracking-wider mb-1">
                        {lang === "vi" ? "Trang tiếp theo" : "Next Page"}
                      </h4>
                      <p className="text-slate-500 text-xs">
                        {lang === "vi" ? `Xem thêm dự án (Trang ${currentPage + 2}/${pages.length})` : `View more projects (Page ${currentPage + 2}/${pages.length})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`p-2 rounded-full border border-white/10 transition-all ${
              currentPage === 0
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-blue-600/20 hover:border-blue-500/50 text-white"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-3">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === i ? "w-10 bg-blue-600" : "w-2 bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className={`p-2 rounded-full border border-white/10 transition-all ${
              currentPage === pages.length - 1
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-blue-600/20 hover:border-blue-500/50 text-white"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
