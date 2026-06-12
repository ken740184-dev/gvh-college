import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoKannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "GVH College - Quality Education for a Successful Future",
  description: "Providing students with the knowledge, skills, and confidence needed to excel in an evolving world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoKannada.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-primary-text bg-background">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ChatbotWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
