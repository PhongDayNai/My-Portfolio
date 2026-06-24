"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import { PortfolioData } from "@/lib/schema";
import { getExperienceText } from "@/lib/experience";

interface PortfolioDataContextType {
  lang: "vi" | "en";
  personalInfo: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    experienceStartDate: string;
    summary: string;
  };
  profileImages: string[];
  projects: PortfolioData["projects"];
  timeline: PortfolioData["timeline"];
  socialLinks: PortfolioData["socialLinks"];
  skills: PortfolioData["skills"];
  translations: PortfolioData["translations"]["vi"] | PortfolioData["translations"]["en"];
  rawTranslations: PortfolioData["translations"];
  rawPersonalInfo: PortfolioData["personalInfo"];
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export function PortfolioProvider({
  data,
  children,
}: {
  data: PortfolioData;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  const value = useMemo<PortfolioDataContextType>(() => {
    const experienceText = getExperienceText(data.personalInfo.experienceStartDate, lang);

    // Replace {experience} placeholder in summary text for current language
    const currentTranslations = data.translations[lang];
    const updatedSummary = currentTranslations.hero.summary.replace("{experience}", experienceText);

    return {
      lang,
      personalInfo: {
        ...data.personalInfo,
        summary: updatedSummary,
      },
      profileImages: data.profileImages || [],
      projects: data.projects,
      timeline: data.timeline,
      socialLinks: data.socialLinks,
      skills: data.skills,
      translations: {
        ...currentTranslations,
        hero: {
          ...currentTranslations.hero,
          summary: updatedSummary,
        },
      },
      rawTranslations: data.translations,
      rawPersonalInfo: data.personalInfo,
    };
  }, [data, lang]);

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
