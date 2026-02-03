"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Circle } from "lucide-react";
import { TIMELINE_DATA } from "@/constants";
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function Timeline() {
  const { lang } = useLanguage();
  const timelineTranslations = translations[lang].timeline;

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 hidden md:block" />

      <div className="space-y-12">
        {TIMELINE_DATA.map((item, index) => {
          const t = timelineTranslations[index];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ 
                x: { duration: 0.6, delay: index * 0.1 },
                y: { type: "tween", duration: 0.15, ease: "easeOut" }
              }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-[-26px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500/50 bg-[#101622] flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {item.type === "work" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                  </div>
                  {item.status === "active" && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </div>
              </div>

              <div className={`w-full md:w-[45%] ml-12 md:ml-0 group cursor-none`}>
                <div className="p-6 rounded-3xl border border-white/5 bg-[#1e293b]/20 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">
                        {t?.title || item.title}
                      </h3>
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase">
                        <Calendar size={12} />
                        {t?.date || item.date}
                      </span>
                    </div>

                    <p className="text-blue-500 font-bold text-sm mb-4">
                      @ {t?.org || item.organization}
                    </p>

                    <ul className="space-y-2">
                      {(t?.desc || item.description).map((desc: string, i: number) => (
                        <li key={i} className="text-slate-400 text-sm flex gap-3 leading-relaxed">
                          <Circle size={6} className="mt-1.5 text-blue-500/50 fill-blue-500/50 shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}