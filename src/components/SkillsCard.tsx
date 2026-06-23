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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400 text-sm">
        <div>
          <p className="text-blue-500 font-bold mb-1">Android / Mobile</p>
          <p>Kotlin, Jetpack Compose, Hilt, Room, Retrofit, Coroutines, WorkManager, CameraX, Glance, ML Kit, MVVM & Clean Architecture</p>
        </div>
        <div>
          <p className="text-blue-500 font-bold mb-1">Web / Frontend</p>
          <p>React, Next.js, TypeScript, TailwindCSS, Vite, Framer Motion, Recharts</p>
        </div>
        <div>
          <p className="text-blue-500 font-bold mb-1">Backend</p>
          <p>Node.js, Express, MySQL, ORM (Sequelize), Socket.io, SSE, JWT & Zod, AI/LLM Integration (Function Calling)</p>
        </div>
        <div>
          <p className="text-blue-500 font-bold mb-1">DevOps & Infrastructure</p>
          <p>Docker, GitHub Actions, Cloudflare Tunnel, Linux & Home-Lab Setup</p>
        </div>
      </div>
    </motion.div>
  );
}