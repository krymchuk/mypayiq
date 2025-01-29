'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import {
  Bell,
  CreditCard,
  Lock,
  Mail,
  Shield,
  User,
  ChevronRight,
} from 'lucide-react';

const settingsSections = [
  {
    id: 'account',
    title: 'Account Settings',
    description: 'Manage your account information and preferences',
    items: [
      {
        id: 'profile',
        title: 'Profile Information',
        description: 'Update your personal information and email',
        icon: User,
      },
      {
        id: 'security',
        title: 'Security',
        description: 'Manage your password and security settings',
        icon: Lock,
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Choose what notifications you want to receive',
        icon: Bell,
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment Settings',
    description: 'Manage your payment methods and billing',
    items: [
      {
        id: 'payment-methods',
        title: 'Payment Methods',
        description: 'Add and manage your payment methods',
        icon: CreditCard,
      },
      {
        id: 'billing',
        title: 'Billing Information',
        description: 'Update your billing details and address',
        icon: Mail,
      },
      {
        id: 'security',
        title: 'Payment Security',
        description: 'Configure payment security settings',
        icon: Shield,
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-[#8395A7]">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-8">
          {settingsSections.map((section) => (
            <div key={section.id} className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-[#8395A7]">{section.description}</p>
              </div>

              <div className="divide-y divide-[#F1F2F6] rounded-lg border border-[#F1F2F6] bg-white">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full items-center justify-between p-4 text-left hover:bg-[#F1F2F6]/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-[#7C5CFC]/10 p-2 text-[#7C5CFC]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-[#8395A7]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#8395A7]" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
