// src/app/LogoutButton.tsx
'use client';

import { createClient } from '../lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh the page to trigger the redirect
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}
