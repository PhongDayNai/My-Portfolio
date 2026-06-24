"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Circle } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioDataContext";

export default function Timeline() {
  const { timeline, lang } = usePortfolio();
  const visibleTimeline = timeline.filter(item => item.show !== false);

  const ongoingItems = visibleTimeline.filter(item => item.status === "active");
  const pastItems = visibleTimeline.filter(item => item.status !== "active");

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">
      {/* 1. ONGOING ACTIVITIES (GRID) */}
      {ongoingItems.length > 0 && (
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {lang === "vi" ? "Hoạt động hiện tại" : "Current Activities"}
            </h3>
            <div className="h-0.5 w-12 bg-emerald-500/30 mt-1.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ongoingItems.map((item, index) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true }}
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 20 },
                    opacity: { duration: 0.4, delay: index * 0.1 }
                  }}
                  className="group cursor-none relative"
                >
                  <div className="h-full p-6 rounded-3xl border border-white/5 bg-[#1e293b]/20 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-[#101622] flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                          <Icon size={18} />
                        </div>
                        <h4 className="text-base font-black text-white uppercase tracking-tight whitespace-pre-line leading-tight flex-1">
                          {item.title[lang]}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-emerald-400 font-bold text-xs">
                          @ {item.organization[lang]}
                        </p>
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase shrink-0">
                          <Calendar size={10} />
                          {item.date[lang]}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {item.description[lang].map((desc: string, i: number) => (
                          <li key={i} className="text-slate-400 text-xs flex gap-2.5 leading-relaxed">
                            <Circle size={5} className="mt-1.5 text-emerald-500/50 fill-emerald-500/50 shrink-0" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PAST JOURNEY (VERTICAL TIMELINE) */}
      {pastItems.length > 0 && (
        <div className="space-y-8 pt-8">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">
              {lang === "vi" ? "Hành trình đã qua" : "Past Journey"}
            </h3>
            <div className="h-0.5 w-12 bg-blue-500/30 mt-1.5 rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-blue-500/0 hidden md:block" />

            <div className="space-y-12">
              {pastItems.map((item, index) => {
                const Icon = item.type === "work" ? Briefcase : GraduationCap;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: true }}
                    transition={{
                      x: { duration: 0.5, delay: index * 0.1 },
                      y: { type: "tween", duration: 0.15, ease: "easeOut" }
                    }}
                    className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                  >
                    <div className="absolute left-[-26px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 bg-[#101622] flex items-center justify-center text-blue-450 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                          <Icon size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-[45%] ml-12 md:ml-0 group cursor-none">
                      <div className="p-6 rounded-3xl border border-white/5 bg-[#1e293b]/20 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 space-y-4">
                          <h4 className="text-base font-black text-white uppercase tracking-tight whitespace-pre-line leading-tight">
                            {item.title[lang]}
                          </h4>

                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-blue-500 font-bold text-xs">
                              @ {item.organization[lang]}
                            </p>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 uppercase shrink-0">
                              <Calendar size={10} />
                              {item.date[lang]}
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {item.description[lang].map((desc: string, i: number) => (
                              <li key={i} className="text-slate-400 text-xs flex gap-2.5 leading-relaxed">
                                <Circle size={5} className="mt-1.5 text-blue-500/50 fill-blue-500/50 shrink-0" />
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
        </div>
      )}
    </div>
  );
}