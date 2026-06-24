"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioDataContext';
import { Loader2 } from 'lucide-react';

export default function HeroCard() {
  const { translations, documents, personalInfo, lang } = usePortfolio();
  const text = translations.hero;

  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);

  const handleSingleDocumentClick = () => {
    if (isLoadingPortfolio) return;
    setIsLoadingPortfolio(true);
    setTimeout(() => {
      window.open(documents[0].url, '_blank', 'noopener,noreferrer');
      setIsLoadingPortfolio(false);
    }, 1000);
  };

  const contactOptions = [
    {
      label: lang === "vi" ? "Gọi điện thoại" : "Call Phone",
      href: `tel:${personalInfo.phone}`,
      value: personalInfo.phone,
    },
    {
      label: lang === "vi" ? "Gửi Email" : "Send Email",
      href: `mailto:${personalInfo.email}`,
      value: personalInfo.email,
    }
  ];

  const getPortfolioWidth = () => {
    if (!isPortfolioOpen) return 180;
    if (!documents || documents.length === 0) return 180;
    
    let maxLength = 0;
    documents.forEach((doc: any) => {
      const title = doc.title[lang] || doc.name || "";
      if (title.length > maxLength) {
        maxLength = title.length;
      }
    });

    const calculatedWidth = maxLength * 7.5 + 48;
    return Math.min(Math.max(calculatedWidth, 180), 360);
  };

  return (
    <section className="relative min-h-[600px] flex flex-col justify-center px-8 md:px-20 bg-[#030712] overflow-hidden rounded-[2.5rem] border border-white/5 mx-4 my-8">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30, 41, 59, 0.5) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712] pointer-events-none" />

      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl">
        <h2 className="text-blue-500 font-mono text-sm mb-6 tracking-[0.3em] uppercase">
          {text.hello}
        </h2>

        <h1 className="text-white text-7xl md:text-[6rem] font-black leading-[0.95] tracking-tighter mb-10 uppercase select-none">
          {text.firstName} <br /> {text.lastName}
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          {text.summary}
        </p>

        <div className="flex flex-wrap gap-5 items-start">
          {/* Nút Xem Portfolio */}
          {documents && documents.length > 0 && (
            documents.length === 1 ? (
              <button 
                onClick={handleSingleDocumentClick}
                disabled={isLoadingPortfolio}
                className="bg-[#135bec] hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-center cursor-none select-none flex items-center justify-center gap-2 disabled:opacity-80 min-h-[56px] min-w-[180px]"
              >
                {isLoadingPortfolio && <Loader2 className="animate-spin" size={16} />}
                <span>{text.viewPortfolio}</span>
              </button>
            ) : (
              <div className="relative inline-block z-30">
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    width: getPortfolioWidth(),
                    height: isPortfolioOpen ? (documents.length * 48 + 12) : 56,
                    borderRadius: isPortfolioOpen ? 20 : 16,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative overflow-hidden border border-white/10 bg-[#1e293b]/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center cursor-none min-w-[180px] max-w-[360px] w-auto ${
                    !isPortfolioOpen ? 'bg-[#135bec] hover:bg-blue-700 border-transparent text-white' : 'text-slate-300'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {!isPortfolioOpen ? (
                      <motion.button
                        key="collapsed"
                        onClick={() => setIsPortfolioOpen(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center font-bold text-sm cursor-none select-none py-4 px-6 text-white"
                      >
                        {text.viewPortfolio}
                      </motion.button>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full p-1.5 flex flex-col gap-1"
                      >
                        {documents.map((doc: any) => (
                          <a
                            key={doc.name}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsPortfolioOpen(false)}
                            className="w-full text-left px-4 py-3 rounded-xl text-xs transition-all flex items-center justify-between group cursor-none select-none text-slate-300 hover:text-blue-500 hover:bg-blue-500/10 font-bold"
                          >
                            <span>{doc.title[lang] || doc.name}</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {isPortfolioOpen && (
                  <div 
                    className="fixed inset-0 z-[-1] cursor-none" 
                    onClick={() => setIsPortfolioOpen(false)} 
                  />
                )}
              </div>
            )
          )}

          {/* Nút Liên hệ */}
          <div className="relative inline-block z-20">
            <motion.div
              layout
              initial={false}
              animate={{
                width: isContactOpen ? 240 : 160,
                height: isContactOpen ? 120 : 56,
                borderRadius: isContactOpen ? 20 : 16,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative overflow-hidden border border-white/10 bg-[#1e293b]/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center cursor-none ${
                !isContactOpen ? 'bg-white/5 hover:bg-white/10 text-white' : 'text-slate-300'
              }`}
            >
              <AnimatePresence mode="wait">
                {!isContactOpen ? (
                  <motion.button
                    key="collapsed"
                    onClick={() => setIsContactOpen(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-center font-bold text-sm cursor-none select-none py-4 px-6 text-white"
                  >
                    {text.contactMe}
                  </motion.button>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full p-1.5 flex flex-col gap-1"
                  >
                    {contactOptions.map((opt) => (
                      <a
                        key={opt.href}
                        href={opt.href}
                        onClick={() => setIsContactOpen(false)}
                        className="w-full text-left px-4 py-3 rounded-xl text-xs transition-all flex flex-col justify-center group cursor-none select-none text-slate-300 hover:text-blue-500 hover:bg-blue-500/10 font-bold"
                      >
                        <span>{opt.label}</span>
                        <span className="text-[10px] text-slate-500 group-hover:text-blue-400 font-normal">{opt.value}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {isContactOpen && (
              <div 
                className="fixed inset-0 z-[-1] cursor-none" 
                onClick={() => setIsContactOpen(false)} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}