'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, User as UserIcon, LogOut, ChevronDown, Settings } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/signin');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#F1F2F6] bg-white px-6">
      <div className="flex flex-1 items-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-[#F1F2F6] bg-white py-2 pl-10 pr-4 text-sm text-[#8395A7] placeholder-[#8395A7] focus:border-[#7C5CFC] focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8395A7]" />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FE0]">
          Transfer money
        </button>
        <button className="rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FE0]">
          Add new
        </button>
        <button className="relative text-[#8395A7] hover:text-[#7C5CFC]">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4757] text-xs text-white">
            3
          </span>
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 rounded-lg border border-[#F1F2F6] bg-white px-3 py-2 text-sm hover:border-[#7C5CFC]"
            >
              <UserIcon className="h-5 w-5 text-[#8395A7]" />
              <span className="max-w-[150px] truncate font-medium">
                {user.email || 'User'}
              </span>
              <ChevronDown className="h-4 w-4 text-[#8395A7]" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[#F1F2F6] bg-white py-1 shadow-lg">
                <button
                  onClick={() => router.push('/profile')}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-[rgb(var(--foreground))] hover:bg-[#F1F2F6]"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => router.push('/settings')}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-[rgb(var(--foreground))] hover:bg-[#F1F2F6]"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-[#FF4757] hover:bg-[#F1F2F6]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push('/auth/signin')}
            className="flex items-center space-x-2 rounded-lg border border-[#F1F2F6] bg-white px-3 py-2 text-sm hover:border-[#7C5CFC]"
          >
            <UserIcon className="h-5 w-5 text-[#8395A7]" />
            <span>Sign in</span>
          </button>
        )}
      </div>
    </header>
  );
}
