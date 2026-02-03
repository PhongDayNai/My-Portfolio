"use client";
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';
import { motion } from 'framer-motion';

export default function SkillsCard() {
  const { lang } = useLanguage();
  const t = translations[lang].sections;

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent backdrop-blur-md cursor-none"
    >
      <h4 className="text-xl font-bold mb-4 text-white">{t.skills}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-400 text-sm">
        <div>
          <p className="text-blue-500 font-bold mb-1">Android</p>
          <p>Kotlin, Jetpack Compose, MVVM, CameraX</p>
        </div>
        <div>
          <p className="text-blue-500 font-bold mb-1">Backend</p>
          <p>Node.js, Express, MySQL, Docker</p>
        </div>
        <div>
          <p className="text-blue-500 font-bold mb-1">Infrastructure</p>
          <p>CI/CD GitHub Actions, Cloudflare Tunnel</p>
        </div>
      </div>
    </motion.div>
  );
}