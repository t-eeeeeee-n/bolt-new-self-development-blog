import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProviderWrapper } from '@/components/SessionProviderWrapper';
import { Navbar } from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster";

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(domain),  // ここで.envから取得したドメインを使用
  title: '自己啓発ブログ',
  description: '日々の成長と学びを共有するブログ',
  openGraph: {
    title: '自己啓発ブログ',
    description: '日々の成長と学びを共有するブログ',
    url: `${domain}`,
    siteName: '自己啓発ブログ',
    images: [
      {
        url: `${domain}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '自己啓発ブログ',
    description: '日々の成長と学びを共有するブログ',
    images: [`${domain}/twitter-image.jpg`],
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="ja">
      <body className={inter.className}>
      {/* クライアントコンポーネントでラップ */}
      <SessionProviderWrapper>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
        <Toaster />
      </SessionProviderWrapper>
      </body>
      </html>
  );
}
