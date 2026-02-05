"use client";
import { useState, useEffect } from "react";
import SpotlightLayout from "@/components/SpotlightLayout";
import SplashScreen from "@/components/SplashScreen";
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageSwitcher2 from '@/components/LanguageSwitcher2';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <LanguageProvider>
          <SpotlightLayout>
            <LanguageSwitcher2 />
            {children}
          </SpotlightLayout>
        </LanguageProvider>
      )}
    </>
  );
}