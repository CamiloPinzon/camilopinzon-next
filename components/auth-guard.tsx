'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out
        if (pathname !== '/admin/login') {
          router.replace('/admin/login');
        }
      } else {
        // User is signed in
        if (pathname === '/admin/login') {
          router.replace('/admin');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7fe' }}>
        <p style={{ color: '#2b3674', fontWeight: 600 }}>Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
