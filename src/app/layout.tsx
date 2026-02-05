import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hung Phong Duong | Portfolio",
  description: "Full-Stack Developer Portfolio - Multi-disciplinary Developer with 1+ years of experience.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${beVietnam.className} antialiased bg-[#101622] text-slate-200`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}