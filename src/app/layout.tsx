import "./globals.css";
import SpotlightLayout from "@/components/SpotlightLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <SpotlightLayout>
          {children}
        </SpotlightLayout>
      </body>
    </html>
  );
}