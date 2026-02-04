"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/me-1.JPG",
  "/images/me-2.JPG",
  "/images/me-3.JPG",
  "/images/me-4.JPG",
  "/images/me-5.JPG",
];

export default function PhotoStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const promises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });
    Promise.all(promises).then(() => setIsReady(true));
  }, []);

  const handleNext = useCallback(() => {
    if (isMoving) return;
    setIsMoving(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsMoving(false), 400);
  }, [isMoving]);

  const handlePrev = useCallback(() => {
    if (isMoving) return;
    setIsMoving(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsMoving(false), 400);
  }, [isMoving]);

  const getVariant = (index: number) => {
    const total = images.length;
    const diff = (index - currentIndex + total) % total;
    if (diff === 0) return "center";
    if (diff === 1 || (diff === total - 1 && total === 2)) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  const variants = {
    center: {
      x: 0,
      scale: 1,
      zIndex: 5,
      opacity: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    left: {
      x: "-60%",
      scale: 0.8,
      zIndex: 3,
      opacity: 0.4,
      rotateY: 25,
      filter: "blur(2px)",
    },
    right: {
      x: "60%",
      scale: 0.8,
      zIndex: 3,
      opacity: 0.4,
      rotateY: -25,
      filter: "blur(2px)",
    },
    hidden: {
      x: 0,
      scale: 0.5,
      zIndex: 0,
      opacity: 0,
      filter: "blur(5px)",
    },
  };

  if (!isReady) return <div className="h-[500px] flex items-center justify-center text-blue-500 font-mono">Loading...</div>;

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center overflow-hidden perspective-1000">
      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
        {images.map((img, index) => {
          const status = getVariant(index);
          const isSideImage = status === "left" || status === "right";

          return (
            <motion.div
              key={img}
              style={{ 
                willChange: "transform, opacity",
                backfaceVisibility: "hidden"
              }}
              className={`absolute w-[280px] md:w-[350px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl ${
                isSideImage ? "hidden md:block" : "block"
              }`}
              variants={variants}
              animate={status}
              transition={{
                type: "spring",
                ease: "easeOut",
                duration: 0.4
              }}
            >
              <img
                src={img}
                alt="Profile"
                className="w-full h-full object-cover pointer-events-none"
              />
              {status !== "center" && (
                <div className="absolute inset-0 bg-[#0f172a]/40 transition-opacity duration-300" />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-6 z-[20] pointer-events-auto">
        <button
          onClick={handlePrev}
          disabled={isMoving}
          className={`p-3 rounded-full bg-white/5 border border-white/10 text-white transition-all shadow-lg backdrop-blur-md ${isMoving ? 'opacity-50' : 'hover:bg-blue-500'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={isMoving}
          className={`p-3 rounded-full bg-white/5 border border-white/10 text-white transition-all shadow-lg backdrop-blur-md ${isMoving ? 'opacity-50' : 'hover:bg-blue-500'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}