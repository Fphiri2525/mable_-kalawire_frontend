// app/components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import TopBar from './topbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current page is dashboard or any sub-page of dashboard
  const isDashboard = pathname.startsWith('/dashboard');
  
  // If it's the dashboard, don't show the main website's TopBar
  if (isDashboard) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }
  
  // For all other pages, show the TopBar
  return (
    <>
      <TopBar />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </>
  );
}