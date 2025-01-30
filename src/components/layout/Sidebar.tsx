'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  ScrollText,
  Files,
  History,
  Calendar,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Cards', href: '/cards', icon: CreditCard },
  { name: 'Subscriptions', href: '/subscriptions', icon: ScrollText },
  { name: 'Files', href: '/files', icon: Files },
  { name: 'History', href: '/history', icon: History },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-60 flex-col border-r border-[#F1F2F6] bg-white">
      <div className="flex h-16 items-center border-b border-[#F1F2F6] px-4">
        <h1 className="text-xl font-bold text-[#7C5CFC]">mypayIQ</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-[#7C5CFC] text-white hover:text-white'
                  : 'text-[#8395A7] hover:bg-[#F1F2F6]'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-[#8395A7]'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
