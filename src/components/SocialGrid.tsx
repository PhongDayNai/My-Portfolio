"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Magnetic from "./Magnetic";
import { usePortfolio } from '@/context/PortfolioDataContext';
import { useLanguage } from "@/context/LanguageContext";
import { ICON_MAP } from "@/lib/icons";

export default function SocialGrid() {
  const { socialLinks } = usePortfolio();
  const { lang } = useLanguage();
  const visibleSocials = socialLinks.filter(social => social.show !== false);

  return (
    <div className="grid grid-cols-2 gap-4">
      {visibleSocials.map((social, idx) => {
        const IconComponent = ICON_MAP[social.icon] || ICON_MAP.Server;
        const displayDesc = lang === "vi" ? social.desc.vi : social.desc.en;
        return (
          <Magnetic key={`${social.name}-${idx}`}>
            <motion.a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ 
                y: { type: "tween", duration: 0.15, ease: "easeOut" },
                opacity: { delay: idx * 0.1 }
              }}
              className={`p-6 rounded-3xl border border-white/5 bg-[#1e293b]/10 backdrop-blur-xl flex flex-col justify-between group transition-all cursor-none ${social.color} shadow-lg hover:shadow-blue-500/10`}
            >
              <div className="flex justify-between items-start">
                <IconComponent size={24} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                <ExternalLink size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold text-white uppercase tracking-tighter">
                  {social.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {displayDesc}
                </span>
              </div>
            </motion.a>
          </Magnetic>
        );
      })}
    </div>
  );
}