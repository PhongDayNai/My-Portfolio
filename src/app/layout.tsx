import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { getPortfolioData } from "@/lib/portfolio";
import { getExperienceText } from "@/lib/experience";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getPortfolioData();
    const expText = getExperienceText(data.personalInfo.experienceStartDate, "en");
    const summary = data.translations.en.hero.summary.replace("{experience}", expText);
    return {
      title: `${data.personalInfo.name} | Portfolio`,
      description: `${data.personalInfo.role} Portfolio - ${summary}`,
      icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Duong Hung Phong | Portfolio",
      description: "Full-Stack Developer Portfolio",
      icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      },
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${beVietnam.className} antialiased bg-[#101622] text-slate-200`} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}