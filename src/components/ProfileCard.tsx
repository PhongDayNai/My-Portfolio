"use client";
import { motion } from "framer-motion";
import { User, MapPin, Mail } from "lucide-react";

export default function ProfileCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      // XÓA h-full TẠI ĐÂY
      className="p-8 rounded-3xl border border-white/5 bg-[#1e293b]/10 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex items-center gap-2 text-blue-500 mb-6">
        <User size={20} />
        <span className="text-xs font-mono font-bold uppercase tracking-widest">About Me</span>
      </div>

      <h3 className="text-3xl font-black text-white mb-6 uppercase leading-tight">
        Xây dựng giải pháp <br /> <span className="text-blue-500">tối ưu & sáng tạo</span>
      </h3>

      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        Tôi là một nhà phát triển Full-stack đam mê việc tạo ra các ứng dụng di động và hệ thống backend hiệu suất cao. 
        Với nền tảng từ Đại học Thủy Lợi và kinh nghiệm thực chiến tại ChainZ, tôi luôn chú trọng vào trải nghiệm người dùng và tính ổn định của mã nguồn.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/5">
          <MapPin size={18} className="text-blue-500" />
          <span className="text-sm">Hà Nội, Việt Nam</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/5">
          <Mail size={18} className="text-blue-500" />
          <span className="text-sm">dhphong266@gmail.com</span>
        </div>
      </div>
    </motion.div>
  );
}