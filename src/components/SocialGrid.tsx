"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SOCIALS } from "@/constants";

export default function SocialGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {SOCIALS.map((social, idx) => (
        <motion.a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={`p-6 rounded-3xl border border-white/5 bg-[#1e293b]/10 backdrop-blur-xl flex flex-col justify-between group transition-all cursor-none ${social.color}`}
        >
          <div className="flex justify-between items-start">
            <social.icon size={24} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
            <ExternalLink size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-4">
            <span className="block text-sm font-bold text-white uppercase tracking-tighter">{social.name}</span>
            <span className="text-[10px] text-slate-500 font-mono">{social.desc}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}