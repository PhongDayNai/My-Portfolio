"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/constants/translations";
import { PROJECTS } from "@/constants";

export default function ProjectSection() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const [activeTab, setActiveTab] = useState<"professional" | "personal">(
    "professional",
  );

  const [profPage, setProfPage] = useState(0);
  const [persPage, setPersPage] = useState(0);

  const currentPage = activeTab === "professional" ? profPage : persPage;
  const setCurrentPage =
    activeTab === "professional" ? setProfPage : setPersPage;

  const pages = useMemo(() => {
    const list = PROJECTS.filter((p) =>
      activeTab === "professional"
        ? p.category === "work"
        : p.category === "personal",
    );

    const result: any[][] = [];
    let currentPageItems: any[] = [];
    let currentSlotsInRow = 0;
    let rowsInPage = 0;

    list.forEach((project) => {
      const isFeature = project.title.includes("ChillingStories");
      const weight = isFeature ? 2 : 1;

      if (currentSlotsInRow + weight > 3) {
        rowsInPage++;
        currentSlotsInRow = 0;
      }

      if (rowsInPage >= 2) {
        result.push(currentPageItems);
        currentPageItems = [project];
        currentSlotsInRow = weight;
        rowsInPage = 0;
      } else {
        currentPageItems.push(project);
        currentSlotsInRow += weight;
      }
    });

    if (currentPageItems.length > 0) result.push(currentPageItems);
    return result;
  }, [activeTab]);

  const displayProjects = pages[currentPage] || [];

  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <div className="flex p-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {(["professional", "personal"] as const).map((tab) => (
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

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${currentPage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            // Sửa class grid ở đây: Đảm bảo grid-flow-row và items-stretch
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row"
          >
            {displayProjects.map((project) => {
              const isFeature = project.title.includes("ChillingStories");

              // TÌM INDEX GỐC TRONG TRANSLATIONS (Quan trọng để lấy đúng dữ liệu dịch)
              const tabKey =
                activeTab === "professional" ? "professional" : "personal";
              const globalIdx = translations[lang].projects[tabKey].findIndex(
                (p) => p.title === project.title,
              );

              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  idx={globalIdx}
                  size={isFeature ? "special" : "normal"}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {pages.length > 1 && (
        <div className="flex justify-center gap-3 mt-6">
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
      )}
    </div>
  );
}
