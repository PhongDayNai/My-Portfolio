"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher2() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' }
  ];

  return (
    <div className="fixed top-8 right-8 z-[100] pointer-events-auto">
      <motion.div
        layout
        initial={false}
        animate={{
          width: isOpen ? 160 : 48,
          height: isOpen ? 100 : 48,
          borderRadius: isOpen ? 20 : 24,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative overflow-hidden border border-white/10 bg-[#1e293b]/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center cursor-none"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="collapsed"
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center text-xs font-black text-blue-500 uppercase cursor-none"
            >
              {lang}
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full p-1.5 flex flex-col gap-1"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code as 'en' | 'vi');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-xl text-xs transition-all flex items-center justify-between group cursor-none ${
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
      </motion.div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1] cursor-none" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
}