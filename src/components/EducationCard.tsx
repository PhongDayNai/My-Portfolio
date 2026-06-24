"use client";
import { GraduationCap } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioDataContext";
import { motion } from "framer-motion";

export default function EducationCard() {
  const { translations } = usePortfolio();
  const edu = translations.education;
  const sect = translations.sections;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      className="p-8 rounded-3xl border border-white/5 bg-[#1e293b]/30 flex items-center justify-between cursor-none"
    >
      <div>
        <div className="flex items-center gap-2 text-blue-500 mb-2">
          <GraduationCap size={20} />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">
            {sect.education}
          </span>
        </div>
        <h4 className="text-xl font-bold mb-1 text-white">{edu.university}</h4>
        <p className="text-slate-500 text-sm">
          {edu.degree} ({edu.duration})
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
          {sect.gpa}
        </p>
        <div className="text-4xl font-black text-blue-500 tracking-tighter">
          {edu.gpaValue}
        </div>
      </div>
    </motion.div>
  );
}
