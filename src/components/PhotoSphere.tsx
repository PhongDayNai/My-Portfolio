"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/me-1.JPG",
  "/images/me-2.JPG",
  "/images/me-3.JPG",
  "/images/me-4.JPG",
  "/images/me-5.JPG",
];

export default function PhotoSphere() {
  const [rotation, setRotation] = useState(0);
  const angleStep = 360 / images.length;

  const handleNext = () => setRotation((prev) => prev - angleStep);
  const handlePrev = () => setRotation((prev) => prev + angleStep);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[600px] flex flex-col items-center justify-center perspective-container overflow-hidden">
      
      <div className="relative w-full h-full flex items-center justify-center pt-20">
        <motion.div
          animate={{ rotateY: rotation }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative w-[280px] h-[400px] preserve-3d"
        >
          {images.map((img, index) => {
            const angle = index * angleStep;
            return (
              <div
                key={index}
                className="absolute inset-0 rounded-2xl border border-white/20 overflow-hidden shadow-2xl bg-slate-900"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(400px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={img}
                  alt={`Profile ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex gap-10 z-50">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 transition-all backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 transition-all backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]" />
    </div>
  );
}