"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform, useVelocity, AnimatePresence } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsMobile";

export default function SpotlightLayout({ children }: { children: React.ReactNode }) {
  const isTouchDevice = useIsTouchDevice();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (
        e.clientY <= 0 || 
        e.clientX <= 0 || 
        e.clientX >= window.innerWidth || 
        e.clientY >= window.innerHeight
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

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

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e.relatedTarget as Node).nodeName === "HTML") {
        setIsVisible(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) {
    return (
      <div className="relative min-h-screen bg-[#101622]">
        {children}
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
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

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed top-0 left-0 pointer-events-none z-[9999] bg-white mix-blend-difference rounded-full"
              style={{
                left: cursorX,
                top: cursorY,
                x: "-50%",
                y: "-50%",
                width: isHovered ? 40 : 10,
                height: isHovered ? 40 : 10,
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed top-0 left-0 pointer-events-none z-[9998] border border-white/20 rounded-full"
              style={{
                left: cursorX,
                top: cursorY,
                x: "-50%",
                y: "-50%",
                width: isHovered ? 0 : 40,
                height: isHovered ? 0 : 40,
              }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </>
  );
}