"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher1() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' }
  ];

  return (
    <div className="fixed top-8 right-8 z-[100] pointer-events-auto">
      <div className="relative flex flex-col items-end">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full border border-white/10 bg-[#101622]/80 backdrop-blur-md flex items-center justify-center text-xs font-black text-blue-500 shadow-2xl cursor-none uppercase"
        >
          {lang}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="p-2 rounded-2xl border border-white/5 bg-[#1e293b]/90 backdrop-blur-xl shadow-2xl min-w-[140px]"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code as 'en' | 'vi');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all flex items-center justify-between group cursor-none ${
                    lang === l.code ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span className="font-bold">{l.label}</span>
                  {lang === l.code && <div className="w-1 h-1 rounded-full bg-blue-500" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}