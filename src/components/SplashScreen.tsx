"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => finishLoading(), 2500);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#101622]"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase"
          >
            PHONG<span className="text-blue-600">.</span>DEV
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            className="h-[2px] bg-blue-600 mt-4 mx-auto"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}