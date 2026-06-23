"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { LogOut, Settings, User, FileText, Key, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

const tSettings = {
  vi: {
    title: "CÀI ĐẶT PORTFOLIO",
    subtitle: "Quản lý thông tin & cấu hình hệ thống",
    welcome: "Xin chào, Admin",
    logoutBtn: "Đăng xuất",
    loggingOut: "Đang đăng xuất...",
    statusActive: "Phiên làm việc hợp lệ",
    sectionGeneral: "Cấu hình chung",
    sectionGeneralDesc: "Thay đổi thông tin cá nhân, mạng xã hội, và kinh nghiệm.",
    sectionUpload: "Quản lý hồ sơ (CV)",
    sectionUploadDesc: "Tải lên các file CV định dạng PDF/Word mới nhất.",
    sectionSecurity: "Bảo mật tài khoản",
    sectionSecurityDesc: "Cập nhật mật khẩu quản trị và mã khóa bảo mật.",
    backToHome: "Trang chủ Portfolio",
  },
  en: {
    title: "PORTFOLIO SETTINGS",
    subtitle: "Manage information & system configurations",
    welcome: "Hello, Admin",
    logoutBtn: "Logout",
    loggingOut: "Logging out...",
    statusActive: "Active Session",
    sectionGeneral: "General Settings",
    sectionGeneralDesc: "Update personal info, social links, and experiences.",
    sectionUpload: "CV Management",
    sectionUploadDesc: "Upload latest CV documents in PDF/Word format.",
    sectionSecurity: "Security Settings",
    sectionSecurityDesc: "Update administration credentials and keys.",
    backToHome: "Portfolio Home",
  },
};

export default function SettingsPage() {
  const { lang } = useLanguage();
  const t = tSettings[lang] || tSettings.vi;
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sections = [
    {
      title: t.sectionGeneral,
      desc: t.sectionGeneralDesc,
      icon: User,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: t.sectionUpload,
      desc: t.sectionUploadDesc,
      icon: FileText,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: t.sectionSecurity,
      desc: t.sectionSecurityDesc,
      icon: Key,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#101622] text-slate-200 p-8 md:p-12 overflow-hidden select-none">
      {/* Decorative background glows */}
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Navigation & Logout Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Settings size={24} className="animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">{t.title}</h1>
              <p className="text-slate-400 text-xs md:text-sm">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MotionLink
              href="/"
              data-cursor-color="rgba(255, 255, 255, 0.4)"
              className="text-slate-400 hover:text-white text-xs md:text-sm font-semibold transition-colors py-2.5 px-4 rounded-xl border border-white/5 bg-white/5 cursor-none"
              whileTap={{ scale: 0.95 }}
            >
              {t.backToHome}
            </MotionLink>

            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-cursor-color="rgb(239, 68, 68)"
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 border border-red-500/20 text-red-400 text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl transition-all disabled:opacity-50 cursor-none"
              whileTap={{ scale: 0.95 }}
            >
              {isLoggingOut ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <LogOut size={16} />
              )}
              <span>{isLoggingOut ? t.loggingOut : t.logoutBtn}</span>
            </motion.button>
          </div>
        </div>

        {/* User Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative border border-white/5 bg-[#141b2b]/60 backdrop-blur-md p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 font-black text-xl">
              A
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t.welcome}</h2>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mt-1">
                <ShieldCheck size={14} />
                <span>{t.statusActive}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Modules List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative border border-white/5 bg-[#141b2b]/40 hover:bg-[#141b2b]/80 hover:border-white/10 transition-all p-6 rounded-2xl shadow-xl"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} p-0.5 mb-5`}>
                <div className="w-full h-full rounded-[10px] bg-[#141b2b] flex items-center justify-center text-slate-200 group-hover:text-white transition-colors">
                  <section.icon size={22} />
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{section.title}</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{section.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
