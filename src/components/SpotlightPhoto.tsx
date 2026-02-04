"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/me-1.JPG",
  "/images/me-2.JPG",
  "/images/me-3.JPG",
  "/images/me-4.JPG",
  "/images/me-5.JPG",
];

export default function SpotlightPhoto() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

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

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!isReady) return <div className="h-[500px] flex items-center justify-center text-blue-500 font-mono">Loading...</div>;

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto h-[600px] flex items-center justify-center overflow-hidden rounded-3xl group"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={images[currentIndex]} 
            className="w-full h-full object-cover blur-3xl saturate-150" 
            alt="background"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-[320px] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle 200px at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.4), transparent 80%)`
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={prev}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-blue-500/50 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={next}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-blue-500/50 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {images.map((_, i) => (
          <div 
            key={i}
            className={`w-1 h-8 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-blue-500 h-12' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}