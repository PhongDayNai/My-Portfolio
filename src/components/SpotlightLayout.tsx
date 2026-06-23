"use client";
import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/hooks/useIsMobile";

export default function SpotlightLayout({ children }: { children: React.ReactNode }) {
  const isTouchDevice = useIsTouchDevice();

  const spotlightRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);

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

      outerCursor.style.width = hovered ? "0px" : "40px";
      outerCursor.style.height = hovered ? "0px" : "40px";
    };

    // Tracking variables for position, velocity, and angle (using Spring Physics)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    // Spotlight Spring State (stiffness = 200, damping = 30 - matching original springConfig)
    let spotX = targetX;
    let spotY = targetY;
    let spotVx = 0;
    let spotVy = 0;

    // Cursor Spring State (stiffness = 800, damping = 40 - matching original cursor spring)
    let curX = targetX;
    let curY = targetY;
    let curVx = 0;
    let curVy = 0;

    let currentAngle = 0;
    let active = false;
    let rafId: number | null = null;
    let lastTarget: HTMLElement | null = null;
    let lastTime = performance.now();

    const checkHover = (target: HTMLElement) => {
      if (target === lastTarget) return;
      lastTarget = target;

      const isSelectable = !!target.closest("button, a, [role='button']");
      setHovered(isSelectable);
    };

    const tick = () => {
      if (!active) return;

      // Always use performance.now() to calculate delta time to prevent time-origin mismatch on high-end systems
      const now = performance.now();
      let dt = (now - lastTime) / 1000;
      lastTime = now;

      // Cap delta time to prevent large jumps (e.g. after tab switching)
      if (dt > 0.05) dt = 0.05;
      if (dt <= 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // 1. Cursor Spring Simulation (stiffness = 800, damping = 40)
      const curAx = -800 * (curX - targetX) - 40 * curVx;
      const curAy = -800 * (curY - targetY) - 40 * curVy;
      curVx += curAx * dt;
      curVy += curAy * dt;
      curX += curVx * dt;
      curY += curVy * dt;

      innerCursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      outerCursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;

      // 2. Spotlight Spring Simulation (stiffness = 200, damping = 30)
      const spotAx = -200 * (spotX - targetX) - 30 * spotVx;
      const spotAy = -200 * (spotY - targetY) - 30 * spotVy;
      spotVx += spotAx * dt;
      spotVy += spotAy * dt;
      spotX += spotVx * dt;
      spotY += spotVy * dt;

      // Calculate speed from spring physical velocity (pixels/second)
      const speed = Math.sqrt(spotVx * spotVx + spotVy * spotVy);

      // Calculate direction angle
      let targetAngle = currentAngle;
      if (speed > 5) {
        targetAngle = Math.atan2(spotVy, spotVx) * (180 / Math.PI);
      }

      // Smooth the angle transition using the shortest angular path (prevents 360 deg spin glitches)
      let angleDiff = targetAngle - currentAngle;
      while (angleDiff < -180) angleDiff += 360;
      while (angleDiff > 180) angleDiff -= 360;
      currentAngle += angleDiff * (1 - Math.exp(-15 * dt));

      // Compute scales based on actual spring velocity (reduced by another 15% for a tighter effect)
      const scaleX = Math.min(2.7, 1 + speed / 1400); // Max stretch reduced from 3.0 to 2.7
      const scaleY = Math.min(1.4, 1 + speed / 3500); // Max thickness reduced from 1.5 to 1.4

      // Shift the spotlight anchor backward along the motion path
      const shiftX = Math.min(42, speed / 40);

      spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg) translate(${-shiftX}px, 0px) scale(${scaleX}, ${scaleY})`;

      // Check if both cursor and spotlight have settled to destination to turn off the RAF loop
      const distToTarget = Math.sqrt((targetX - spotX) ** 2 + (targetY - spotY) ** 2);
      const distCursorToTarget = Math.sqrt((targetX - curX) ** 2 + (targetY - curY) ** 2);

      if (distToTarget < 0.5 && distCursorToTarget < 0.5 && speed < 1) {
        active = false;
        rafId = null;
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const isVisible = !(y <= 0 || x <= 0 || x >= window.innerWidth || y >= window.innerHeight);

      targetX = x;
      targetY = y;

      setVisible(isVisible);

      if (isVisible) {
        const target = e.target as HTMLElement;
        if (target) {
          checkHover(target);
        }

        // Start the animation loop if it's not already running
        if (!active) {
          active = true;
          lastTime = performance.now(); // Reset time anchor when restarting loop
          rafId = requestAnimationFrame(tick);
        }
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial positions at center of screen to prevent jumps
    innerCursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    outerCursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    spotlight.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) rotate(0deg) translate(0px, 0px) scale(1, 1)`;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isTouchDevice]);

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
        <div
          ref={spotlightRef}
          className="absolute left-0 top-0 hidden md:block transition-opacity duration-200 ease-out opacity-0"
          style={{
            width: 150,
            height: 150,
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, transparent 80%)",
            filter: "blur(15px)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Inner solid cursor with mix-blend-difference */}
      <div
        ref={innerCursorRef}
        className="fixed top-0 left-0 rounded-full bg-black mix-blend-difference pointer-events-none transition-[width,height,background-color] duration-150 ease-out z-[9999]"
        style={{
          width: "10px",
          height: "10px",
          willChange: "transform",
        }}
      />
      {/* Outer border cursor */}
      <div
        ref={outerCursorRef}
        className="fixed top-0 left-0 rounded-full border border-transparent pointer-events-none transition-[width,height,border-color] duration-150 ease-out z-[9998]"
        style={{
          width: "40px",
          height: "40px",
          willChange: "transform",
        }}
      />

      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </>
  );
}