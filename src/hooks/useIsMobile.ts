import { useState, useEffect } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hoverMedia = window.matchMedia("(hover: hover)");
    
    const checkDevice = () => {
      setIsTouch(!hoverMedia.matches);
    };

    checkDevice();
    hoverMedia.addEventListener("change", checkDevice);
    return () => hoverMedia.removeEventListener("change", checkDevice);
  }, []);

  return isTouch;
}