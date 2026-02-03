"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import SpotlightLayout from "@/components/SpotlightLayout";
import SplashScreen from "@/components/SplashScreen";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <html lang="vi">
      <body className="antialiased bg-[#101622]">
        {isLoading ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <SpotlightLayout>
            {children}
          </SpotlightLayout>
        )}
      </body>
    </html>
  );
}