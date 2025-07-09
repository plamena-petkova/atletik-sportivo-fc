import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata:Metadata = {
  title: "ФК Атлетик Спортиво",
  description: "Official site of FK Atletik Sportivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" data-theme="customTheme" className={geistSans.className}>
      <body
      >
        {children}
      </body>
    </html>
  );
}
