import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SheetIO - Editor de Planilhas Online',
  description: 'Editor de planilhas moderno e poderoso construído com Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}