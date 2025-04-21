// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProvider from "@/components/ClientLayout"; // 👈 wagmi provider 포함된 클라이언트 provider

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jae NFT",
  description: "정치와 마법의 경계 NFT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider>
          <div className="min-h-screen bg-[#111] text-white">
            {/* 🔗 헤더 메뉴 */}
            <nav className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#1a1a1a]">
              <h1 className="text-xl font-bold text-blue-400">🔮 JaeNFT</h1>
              <div className="flex gap-4 text-sm">
                <Link href="/" className="hover:text-blue-300">홈</Link>
                <Link href="/explorer" className="hover:text-blue-300">Explorer</Link>
              </div>
            </nav>

            {/* 콘텐츠 */}
            <main>{children}</main>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
