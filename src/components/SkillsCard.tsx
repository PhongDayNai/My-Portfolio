"use client";
import { usePortfolio } from '@/context/PortfolioDataContext';
import { motion } from 'framer-motion';

export default function SkillsCard() {
  const { skills, translations, lang } = usePortfolio();
  const t = translations.sections;
  const visibleSkills = skills.filter(s => s.show !== false);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent backdrop-blur-md cursor-none"
    >
      <h4 className="text-xl font-bold mb-4 text-white">{t.skills}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400 text-sm">
        {visibleSkills.map((skillGroup, idx) => (
          <div key={idx}>
            <p className="text-blue-500 font-bold mb-1">{skillGroup.category[lang]}</p>
            <p>{skillGroup.items}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}