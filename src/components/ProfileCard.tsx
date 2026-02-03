"use client";
import { motion } from "framer-motion";
import { User, MapPin, Mail } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function ProfileCard() {
  const { lang } = useLanguage();
  const text = translations[lang].profile;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -10 }}
      transition={{ 
        type: "tween", 
        duration: 0.15,
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      className="p-8 rounded-3xl border border-white/5 bg-[#1e293b]/10 backdrop-blur-xl shadow-2xl cursor-none"
    >
      <div className="flex items-center gap-2 text-blue-500 mb-6">
        <User size={20} />
        <span className="text-xs font-mono font-bold uppercase tracking-widest">{text.tag}</span>
      </div>

      <h3 className="text-3xl font-black text-white mb-6 uppercase leading-tight">
        {text.heading} <br /> <span className="text-blue-500">{text.subHeading}</span>
      </h3>

      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        {text.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/5">
          <MapPin size={18} className="text-blue-500" />
          <span className="text-sm">{text.location}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/5">
          <Mail size={18} className="text-blue-500" />
          <span className="text-sm">dhphong266@gmail.com</span>
        </div>
      </div>
    </motion.div>
  );
}