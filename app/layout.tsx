// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mable Kalawire Foundation - Supporting Children in Need',
  description: 'A foundation dedicated to supporting children through education, nutrition, and healthcare.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-800`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}