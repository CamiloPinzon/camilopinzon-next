'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="admin-logout-btn">
      Logout
    </button>
  );
}
