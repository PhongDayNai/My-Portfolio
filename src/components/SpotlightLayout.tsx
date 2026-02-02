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
      const isSelectable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isSelectable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-[#101622] overflow-hidden">
      <motion.div
        className="fixed pointer-events-none z-0"
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

      <motion.div
        className="fixed pointer-events-none z-[9999] bg-white mix-blend-difference rounded-full"
        animate={{
          width: isHovered ? 40 : 8,
          height: isHovered ? 40 : 8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />

      <motion.div
        className="fixed pointer-events-none z-[9998] border border-white/30 rounded-full"
        animate={{
          width: isHovered ? 0 : 32,
          height: isHovered ? 0 : 32,
          opacity: isHovered ? 0 : 1
        }}
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}