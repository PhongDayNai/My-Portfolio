"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Eye, EyeOff, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

const tLogin = {
  vi: {
    title: "PORTFOLIO ADMIN",
    subtitle: "Đăng nhập hệ thống quản trị",
    usernameLabel: "Tên đăng nhập",
    passwordLabel: "Mật khẩu",
    loginBtn: "Đăng Nhập",
    loggingIn: "Đang xác thực...",
    errorEmpty: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.",
    backToHome: "Quay lại Trang chủ",
  },
  en: {
    title: "PORTFOLIO ADMIN",
    subtitle: "Sign in to administration portal",
    usernameLabel: "Username",
    passwordLabel: "Password",
    loginBtn: "Sign In",
    loggingIn: "Authenticating...",
    errorEmpty: "Please enter both username and password.",
    backToHome: "Back to Home",
  },
};

export default function LoginPage() { 
  const { lang } = useLanguage();
  const t = tLogin[lang] || tLogin.vi;
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/settings";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSetup, setIsSetup] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSetupStatus = async () => {
      try {
        const response = await fetch("/api/auth/status");
        if (response.ok) {
          const data = await response.json();
          setIsSetup(data.isSetup);
        } else {
          setIsSetup(true); // Fallback to login mode if API fails
        }
      } catch (err) {
        setIsSetup(true);
      }
    };
    checkSetupStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(redirectPath);
        router.refresh();
      } else {
        setError(data.error || "Đăng nhập thất bại. Vui lòng kiểm tra lại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim() || !confirmPassword.trim()) {
      setError(lang === "vi" ? "Vui lòng nhập mật khẩu và xác nhận mật khẩu." : "Please enter password and confirmation.");
      return;
    }

    if (password.length < 6) {
      setError(lang === "vi" ? "Mật khẩu phải có độ dài ít nhất 6 ký tự." : "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError(lang === "vi" ? "Mật khẩu xác nhận không khớp." : "Password confirmation does not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(redirectPath);
        router.refresh();
      } else {
        setError(data.error || "Thiết lập thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSetup === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#101622]">
        <Loader2 className="animate-spin text-blue-500" size={36} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-[#101622] overflow-hidden select-none">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* Floating Back to Home button */}
      <div className="absolute top-8 left-8 z-20">
        <MotionLink
          href="/"
          data-cursor-color="rgba(255, 255, 255, 0.4)"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md cursor-none"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={18} />
          <span className="text-sm font-semibold">{t.backToHome}</span>
        </MotionLink>
      </div>

      {/* Login/Setup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glow behind card */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-70" />

        <div className="relative border border-white/10 bg-[#141b2b]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col items-center">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-black text-white tracking-widest uppercase mb-2">
              {isSetup ? t.title : (lang === "vi" ? "THIẾT LẬP HỆ THỐNG" : "SYSTEM SETUP")}
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              {isSetup ? t.subtitle : (lang === "vi" ? "Cấu hình mật khẩu quản trị ban đầu" : "Configure initial admin password")}
            </p>
          </div>

          <form onSubmit={isSetup ? handleSubmit : handleSetupSubmit} className="w-full space-y-6">
            {/* Error message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-medium text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {isSetup ? (
              <>
                {/* Username Input */}
                <div className="space-y-2">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                    {t.usernameLabel}
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 text-slate-500" size={18} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      placeholder="admin"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                    {t.passwordLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-500" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-none"
                      data-cursor-color="rgba(255, 255, 255, 0.4)"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Initial Setup Mode */}
                <div className="space-y-2">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                    {lang === "vi" ? "Mật khẩu quản trị mới" : "New Admin Password"}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-500" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-none"
                      data-cursor-color="rgba(255, 255, 255, 0.4)"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                    {lang === "vi" ? "Xác nhận mật khẩu" : "Confirm Password"}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-500" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-none"
                      data-cursor-color="rgba(255, 255, 255, 0.4)"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              data-cursor-color="rgb(59, 130, 246)"
              className="w-full relative flex items-center justify-center py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-lg hover:shadow-blue-500/25 disabled:bg-blue-800 disabled:text-slate-400 cursor-none mt-2"
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  <span>{isSetup ? t.loggingIn : (lang === "vi" ? "Đang thiết lập..." : "Setting up...")}</span>
                </div>
              ) : (
                <span>{isSetup ? t.loginBtn : (lang === "vi" ? "Thiết lập & Đăng nhập" : "Setup & Sign In")}</span>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
