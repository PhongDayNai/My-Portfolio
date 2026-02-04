"use client";

import { Github } from "lucide-react";

import { Project } from "@/constants";

import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

import { translations } from "@/constants/translations";

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
  const { lang } = useLanguage();

  const isSpecial = size === "special";

  const t = translations[lang].sections;

  const allProjects = [
    ...translations[lang].projects.professional,

    ...translations[lang].projects.personal,
  ];

  const projectTranslation = allProjects.find((p) => p.title === project.title);

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -10 }}
      transition={{
        type: "tween",

        duration: 0.15,

        ease: "easeOut",
      }}
      className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#1e293b]/30 p-8 hover:bg-[#1e293b]/50 transition-all shadow-xl cursor-none

        ${isSpecial ? "md:col-span-2 md:row-span-1 border-blue-500/30" : "col-span-1"}

      `}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            {isSpecial ? t.featuredProject : t.project}
          </span>

          <div className="flex gap-3">
            <div className="hover:text-blue-400 transition-colors">
              <Github size={20} />
            </div>
          </div>
        </div>

        <h3
          className={`font-bold mb-3 ${isSpecial ? "text-3xl" : "text-xl"} text-white uppercase tracking-tighter`}
        >
          {projectTranslation?.title || project.title}
        </h3>

        <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
          {projectTranslation?.desc || project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
    </motion.a>
  );
}
