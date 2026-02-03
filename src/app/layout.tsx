"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { Be_Vietnam_Pro } from "next/font/google";
import SpotlightLayout from "@/components/SpotlightLayout";
import SplashScreen from "@/components/SplashScreen";
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

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
    <html lang="vi" className="scroll-smooth">
      <body className={`${beVietnam.className} antialiased bg-[#101622] text-slate-200`}>
        {isLoading ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <LanguageProvider>
            <SpotlightLayout>
              <LanguageSwitcher />
              {children}
            </SpotlightLayout>
          </LanguageProvider>
        )}
      </body>
    </html>
  );
}