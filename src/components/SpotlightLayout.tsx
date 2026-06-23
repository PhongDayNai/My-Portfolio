"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform, useVelocity } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsMobile";

export default function SpotlightLayout({ children }: { children: React.ReactNode }) {
  const isTouchDevice = useIsTouchDevice();

  const spotlightRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Restore original spring configuration to keep the visible trailing/chasing animation
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cursorX = useSpring(mouseX, { damping: 40, stiffness: 800 });
  const cursorY = useSpring(mouseY, { damping: 40, stiffness: 800 });

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const scaleX = useTransform(velocityX, (v) => 1 + Math.abs(v) / 1500);
  const scaleY = useTransform(velocityY, (v) => 1 + Math.abs(v) / 1500);

  // Storing states locally to prevent duplicate DOM write operations
  const state = useRef({
    isVisible: false,
    isHovered: false,
  });

  useEffect(() => {
    if (isTouchDevice) return;

    const spotlight = spotlightRef.current;
    const innerCursor = innerCursorRef.current;
    const outerCursor = outerCursorRef.current;

    if (!spotlight || !innerCursor || !outerCursor) return;

    const setVisible = (visible: boolean) => {
      if (state.current.isVisible === visible) return;
      state.current.isVisible = visible;

      spotlight.style.opacity = visible ? "1" : "0";
      innerCursor.style.backgroundColor = visible ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
      outerCursor.style.borderColor = visible ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0)";
    };

    const setHovered = (hovered: boolean) => {
      if (state.current.isHovered === hovered) return;
      state.current.isHovered = hovered;

      innerCursor.style.width = hovered ? "40px" : "10px";
      innerCursor.style.height = hovered ? "40px" : "10px";
      innerCursor.style.marginLeft = hovered ? "-20px" : "-5px";
      innerCursor.style.marginTop = hovered ? "-20px" : "-5px";

      outerCursor.style.width = hovered ? "0px" : "40px";
      outerCursor.style.height = hovered ? "0px" : "40px";
      outerCursor.style.marginLeft = hovered ? "0px" : "-20px";
      outerCursor.style.marginTop = hovered ? "0px" : "-20px";
    };

    // Tracking variables for event throttling & target caching
    const latestMouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      target: null as HTMLElement | null,
      isVisible: false,
    };

    let updateScheduled = false;
    let lastTarget: HTMLElement | null = null;
    let rafId: number | null = null;

    const checkHover = (target: HTMLElement) => {
      if (target === lastTarget) return;
      lastTarget = target;

      // Combined single query to prevent multiple DOM tree traversals
      const isSelectable = !!target.closest("button, a, [role='button']");
      setHovered(isSelectable);
    };

    const updateMousePosition = () => {
      updateScheduled = false;
      rafId = null;

      const { x, y, target, isVisible } = latestMouse;

      setVisible(isVisible);

      if (isVisible) {
        mouseX.set(x);
        mouseY.set(y);

        if (target) {
          checkHover(target);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const isVisible = !(y <= 0 || x <= 0 || x >= window.innerWidth || y >= window.innerHeight);

      latestMouse.x = x;
      latestMouse.y = y;
      latestMouse.target = e.target as HTMLElement;
      latestMouse.isVisible = isVisible;

      if (!updateScheduled) {
        updateScheduled = true;
        rafId = requestAnimationFrame(updateMousePosition);
      }
    };

    const handleMouseLeave = () => {
      latestMouse.isVisible = false;
      latestMouse.target = null;

      if (!updateScheduled) {
        updateScheduled = true;
        rafId = requestAnimationFrame(updateMousePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial positions at center of screen to prevent jumps
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isTouchDevice, mouseX, mouseY]);

  if (isTouchDevice) {
    return (
      <div className="relative min-h-screen bg-[#101622]">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Spotlight layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          ref={spotlightRef}
          className="absolute hidden md:block transition-opacity duration-200 ease-out opacity-0"
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
            willChange: "transform",
          }}
        />
      </div>

      {/* Inner solid cursor with mix-blend-difference */}
      <motion.div
        ref={innerCursorRef}
        className="fixed top-0 left-0 rounded-full bg-black mix-blend-difference pointer-events-none transition-[width,height,margin,background-color] duration-150 ease-out z-[9999]"
        style={{
          left: cursorX,
          top: cursorY,
          width: "10px",
          height: "10px",
          marginLeft: "-5px",
          marginTop: "-5px",
          willChange: "transform",
        }}
      />
      {/* Outer border cursor */}
      <motion.div
        ref={outerCursorRef}
        className="fixed top-0 left-0 rounded-full border border-transparent pointer-events-none transition-[width,height,margin,border-color] duration-150 ease-out z-[9998]"
        style={{
          left: cursorX,
          top: cursorY,
          width: "40px",
          height: "40px",
          marginLeft: "-20px",
          marginTop: "-20px",
          willChange: "transform",
        }}
      />

      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </>
  );
}