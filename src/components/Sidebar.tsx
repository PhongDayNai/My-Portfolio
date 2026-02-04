'use client';
import { Home, FolderCode, User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function Sidebar() {
  const { lang } = useLanguage();
  const text = translations[lang].nav;

  const menu = [
    { name: text.home, icon: Home, href: '#home' },
    { name: text.projects, icon: FolderCode, href: '#projects' },
    { name: text.experience, icon: Briefcase, href: '#experience' },
    { name: text.profile, icon: User, href: '#about' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="relative flex flex-col items-center gap-10">
        
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 z-0" />

        {menu.map((item) => (
          <div key={item.name} className="relative flex items-center group pointer-events-auto">
            
            <div className="absolute left-20 text-slate-400 text-sm font-bold uppercase tracking-[0.2em] 
                          whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 
                          group-hover:translate-x-0 group-hover:text-blue-500 transition-all duration-200 pointer-events-none">
              {item.name}
            </div>

            <motion.a
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              whileHover={{ scale: 1.4 }}
              transition={{ 
                type: "tween",
                duration: 0.15,
                ease: "easeOut" 
              }}
              className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full 
                         border border-white/10 bg-[#101622] text-slate-400 
                         group-hover:text-blue-500 group-hover:border-blue-500/50 
                         transition-colors duration-200 cursor-none shadow-2xl"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <item.icon size={24} className="relative z-10" />
            </motion.a>
          </div>
        ))}
      </div>
    </aside>
  );
}