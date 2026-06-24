"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Settings, User, FileText, ShieldCheck,
  Loader2, Save, ArrowLeft, CheckCircle, ChevronRight, GitBranch
} from "lucide-react";
import Link from "next/link";
import { PortfolioData } from "@/lib/schema";
import { updatePortfolio } from "@/app/actions";
import { settingsTranslations } from "@/constants";
import PortfolioEditor from "./PortfolioEditor";

interface SettingsClientProps {
  data: PortfolioData;
}

export default function SettingsClient({ data }: SettingsClientProps) {
  const { lang } = useLanguage();
  const t = settingsTranslations[lang] || settingsTranslations.vi;
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<PortfolioData>(data);
  const [activeSection, setActiveSection] = useState<"dashboard" | "portfolio" | "cv_manager" | "security" | "system">("dashboard");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  const handleSave = async () => {
    setIsSaving(true);
    setToast(null);
    try {
      // Validate duplicate social link names with the same URLs
      const socialLinks = portfolio.socialLinks;
      const duplicates = socialLinks.filter((item, index) =>
        socialLinks.findIndex(s => s.name === item.name && s.link.trim() === item.link.trim()) !== index
      );
      if (duplicates.length > 0) {
        setToast({
          type: "error",
          message: `${t.duplicateSocialError}${duplicates[0].name} (${duplicates[0].link})`
        });
        setIsSaving(false);
        setTimeout(() => setToast(null), 4000);
        return;
      }

      const res = await updatePortfolio(portfolio);
      if (res.success) {
        setToast({ type: "success", message: t.saveSuccess });
        router.refresh();
      } else {
        setToast({ type: "error", message: res.error || t.saveError });
      }
    } catch (err: any) {
      setToast({ type: "error", message: err?.message || t.saveError });
    } finally {
      setIsSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#101622] text-slate-200 p-6 md:p-12 overflow-y-auto">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">{t.title}</h1>
              <p className="text-slate-400 text-xs md:text-sm">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeSection === "dashboard" ? (
              <Link
                href="/"
                className="text-slate-400 hover:text-white text-xs md:text-sm font-semibold transition-colors py-2.5 px-4 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>{t.backToHome}</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setActiveSection("dashboard");
                  setToast(null);
                }}
                className="text-slate-400 hover:text-white text-xs md:text-sm font-semibold transition-colors py-2.5 px-4 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>{lang === "vi" ? "Quay lại Dashboard" : "Back to Dashboard"}</span>
              </button>
            )}

            {activeSection === "portfolio" && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                <span>{isSaving ? t.saving : t.saveBtn}</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 border border-red-500/20 text-red-400 text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoggingOut ? <Loader2 className="animate-spin" size={16} /> : <LogOut size={16} />}
              <span>{isLoggingOut ? t.loggingOut : t.logoutBtn}</span>
            </button>
          </div>
        </div>

        {/* Toasts */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-xl border font-bold text-sm text-center flex items-center justify-center gap-2 ${toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
            >
              {toast.type === "success" && <CheckCircle size={16} />}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Section Contents */}
        <AnimatePresence mode="wait">
          {activeSection === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Option 1: Portfolio Editor */}
              <button
                type="button"
                onClick={() => setActiveSection("portfolio")}
                className="bg-[#141b2b]/40 border border-white/5 hover:border-blue-500/30 p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between min-h-[180px] w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 active:scale-[0.98] hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {lang === "vi" ? "Cấu hình Portfolio" : "Portfolio Settings"}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      {lang === "vi" ? "Chỉnh sửa thông tin cá nhân, kỹ năng, dự án, dòng thời gian." : "Edit personal info, skills, projects, and timeline."}
                    </p>
                  </div>
                </div>
                <div className="text-blue-500 text-xs font-bold flex items-center gap-1 self-start mt-4">
                  <span>{lang === "vi" ? "Thiết lập ngay" : "Configure now"}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 2: CV Manager */}
              <button
                type="button"
                onClick={() => setActiveSection("cv_manager")}
                className="bg-[#141b2b]/40 border border-white/5 hover:border-indigo-500/30 p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between min-h-[180px] w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 active:scale-[0.98] hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {lang === "vi" ? "Quản lý CV & Tài liệu" : "CV & Document Manager"}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      {lang === "vi" ? "Tải lên và cập nhật file CV hồ sơ năng lực tiếng Việt/Anh." : "Upload and update Vietnamese/English CV files."}
                    </p>
                  </div>
                </div>
                <div className="text-indigo-400 text-xs font-bold flex items-center gap-1 self-start mt-4">
                  <span>{lang === "vi" ? "Tải lên tài liệu" : "Upload documents"}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 3: Security */}
              <button
                type="button"
                onClick={() => setActiveSection("security")}
                className="bg-[#141b2b]/40 border border-white/5 hover:border-emerald-500/30 p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between min-h-[180px] w-full text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 active:scale-[0.98] hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {lang === "vi" ? "Bảo mật & Tài khoản" : "Security & Account"}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      {lang === "vi" ? "Đổi mật khẩu quản trị và thiết lập các khóa xác thực." : "Change administration password and credentials."}
                    </p>
                  </div>
                </div>
                <div className="text-emerald-400 text-xs font-bold flex items-center gap-1 self-start mt-4">
                  <span>{lang === "vi" ? "Thay đổi cấu hình" : "Update credentials"}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 4: System & Backup */}
              <button
                type="button"
                onClick={() => setActiveSection("system")}
                className="bg-[#141b2b]/40 border border-white/5 hover:border-amber-500/30 p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between min-h-[180px] w-full text-left focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 active:scale-[0.98] hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300">
                    <GitBranch size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {lang === "vi" ? "Hệ thống & Sao lưu" : "System & Backup"}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      {lang === "vi" ? "Xem thông số Docker Volume, Backup dữ liệu cấu hình." : "Check Docker volumes, backup configurations."}
                    </p>
                  </div>
                </div>
                <div className="text-amber-500 text-xs font-bold flex items-center gap-1 self-start mt-4">
                  <span>{lang === "vi" ? "Quản lý hệ thống" : "Manage system"}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>
          )}

          {activeSection === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <PortfolioEditor
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                toast={toast}
                setToast={setToast}
              />
            </motion.div>
          )}

          {activeSection === "cv_manager" && (
            <motion.div
              key="cv_manager"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#141b2b]/40 border border-white/5 p-8 rounded-2xl shadow-xl min-h-[300px] flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === "vi" ? "Quản lý CV & Tài liệu" : "CV & Document Manager"}
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                {lang === "vi"
                  ? "Tính năng này đang trong quá trình phát triển để cho phép upload file CV .pdf/.docx lên thư mục public/uploads."
                  : "This feature is under construction and will allow uploading CV documents to the public/uploads folder."}
              </p>
              <button
                onClick={() => setActiveSection("dashboard")}
                className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-2 px-6 rounded-xl border border-white/5 transition-all text-xs"
              >
                {lang === "vi" ? "Quay lại" : "Go Back"}
              </button>
            </motion.div>
          )}

          {activeSection === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#141b2b]/40 border border-white/5 p-8 rounded-2xl shadow-xl min-h-[300px] flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === "vi" ? "Bảo mật & Tài khoản" : "Security & Account"}
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                {lang === "vi"
                  ? "Tính năng thay đổi mật khẩu và quản lý cấu hình bảo mật sẽ khả dụng trong phiên bản tiếp theo."
                  : "Change password and account security configurations will be available in the next version."}
              </p>
              <button
                onClick={() => setActiveSection("dashboard")}
                className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-2 px-6 rounded-xl border border-white/5 transition-all text-xs"
              >
                {lang === "vi" ? "Quay lại" : "Go Back"}
              </button>
            </motion.div>
          )}

          {activeSection === "system" && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#141b2b]/40 border border-white/5 p-8 rounded-2xl shadow-xl min-h-[300px] flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <GitBranch size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === "vi" ? "Hệ thống & Sao lưu" : "System & Backup"}
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                {lang === "vi"
                  ? "Các tùy chọn backup dữ liệu JSON tự động và theo dõi volume mount Docker đang được xây dựng."
                  : "Automatic JSON backup and Docker volume tracking are currently under development."}
              </p>
              <button
                onClick={() => setActiveSection("dashboard")}
                className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-2 px-6 rounded-xl border border-white/5 transition-all text-xs"
              >
                {lang === "vi" ? "Quay lại" : "Go Back"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
