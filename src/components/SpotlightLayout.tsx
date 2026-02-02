"use client";
import { useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, useVelocity } from "framer-motion";

export default function SpotlightLayout({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const scaleX = useTransform(velocityX, (v) => 1 + Math.abs(v) / 1500);
  const scaleY = useTransform(velocityY, (v) => 1 + Math.abs(v) / 1500);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
          filter: "blur(10px)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}