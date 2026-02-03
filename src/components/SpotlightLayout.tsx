"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform, useVelocity } from "framer-motion";

export default function SpotlightLayout({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cursorX = useSpring(mouseX, { damping: 40, stiffness: 800 });
  const cursorY = useSpring(mouseY, { damping: 40, stiffness: 800 });

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const scaleX = useTransform(velocityX, (v) => 1 + Math.abs(v) / 1500);
  const scaleY = useTransform(velocityY, (v) => 1 + Math.abs(v) / 1500);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isSelectable = target.closest('button') || target.closest('a') || target.tagName === 'BUTTON' || target.tagName === 'A';
      setIsHovered(!!isSelectable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Lớp hiệu ứng cố định - Tách biệt hoàn toàn với Content */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute hidden md:block"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
            scaleX,
            scaleY,
            width: 150,
            height: 150,
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, transparent 80%)",
            filter: "blur(15px)",
          }}
        />
      </div>

      {/* Lớp nội dung chính - Để trôi tự nhiên trên trục Y */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

      {/* Lớp con trỏ chuột - Luôn trên cùng */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <motion.div
          className="absolute bg-white mix-blend-difference rounded-full"
          animate={{ width: isHovered ? 40 : 8, height: isHovered ? 40 : 8 }}
          style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
        />
        <motion.div
          className="absolute border border-white/30 rounded-full"
          animate={{ width: isHovered ? 0 : 32, height: isHovered ? 0 : 32, opacity: isHovered ? 0 : 1 }}
          style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
        />
      </div>
    </>
  );
}