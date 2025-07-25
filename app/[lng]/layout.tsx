import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import I18nProvider from "./components/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ФК Атлетик Спортиво",
  description: "Official site of FK Atletik Sportivo",
};


export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lng: string }> }) {
  const resolvedParams = await params; 
  const lng = resolvedParams.lng;

  return (
    <html lang={lng} data-theme="customTheme" className={geistSans.className}>
      <body>
        <I18nProvider lng={lng}>
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
